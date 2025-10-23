import { Readable } from 'stream'
import fs from 'fs'
import path from 'path'

import { serialize } from 'cookie'
import * as uuid from 'uuid'
import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { stream2buffer } from '@navikt/next-api-proxy/dist/proxyUtils'
import { logger } from '@navikt/next-logger'
import { nextleton } from 'nextleton'

import { cleanPathForMetric } from '../../metrics'
import { RSSporsmal } from '../../types/rs-types/rs-sporsmal'
import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSvar } from '../../types/rs-types/rs-svar'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSOppdaterSporsmalResponse } from '../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'

import { Persona } from './data/personas/personas'
import { testpersoner } from './testperson'
import {
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    foranArbeidstakerMedOppholdKvittering,
    sok6,
    soknadSomTrigger401ForOppdaterSporsmal,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
} from './data/soknad/soknader-integration'
import { feilVedSlettingAvKvittering } from './data/personas/reisetilskuddTestPerson'
import { arbeidstaker, arbeidtakerMedGammelOppsummering } from './data/soknad/arbeidstaker'
import { arbeidstakerGradert } from './data/soknad/arbeidstaker-gradert'
import { oppholdUtland } from './data/soknad/opphold-utland'
import { mockApiValiderSporsmal } from './mockApiValiderSporsmal'
import { soknadInnenforArbeidsgiverperioden } from './data/personas/innenfor-ag-periode'
import { deepcopyMedNyId } from './deepcopyMedNyId'
import { inntektUnderveis, reiseTilUtlandet } from './data/soknad/friskmeldt-til-arbeidsformidling'

type session = {
    expires: dayjs.Dayjs
    testpersoner: { [index: string]: Persona }
}
export const sessionStore = nextleton('sessionStore', () => {
    return {} as Record<string, session>
})

export function getSession(req: NextApiRequest, res: NextApiResponse): session {
    function getSessionId(): string {
        const sessionIdCookie = req.cookies['mock-session']
        if (sessionIdCookie) {
            return sessionIdCookie
        }
        const sessionId = uuidv4()
        const cookie = serialize('mock-session', sessionId, {
            httpOnly: false,
            path: '/',
            expires: new Date(Date.now() + 60 * 60 * 1000),
            sameSite: 'none',
            secure: true,
        })
        res.setHeader('Set-Cookie', cookie)

        return sessionId
    }

    const sessionId = getSessionId()

    if (!sessionStore[sessionId] || sessionStore[sessionId].expires.isBefore(dayjs())) {
        sessionStore[sessionId] = {
            expires: dayjs().add(1, 'hour'),
            testpersoner: testpersoner(),
        }
    }

    return sessionStore[sessionId]
}

function nokkel(req: NextApiRequest): string {
    const query = req.query['testperson']
    if (query) return query.toString()
    return 'arbeidstaker'
}

export function hentTestperson(req: NextApiRequest, res: NextApiResponse): Persona {
    return getSession(req, res).testpersoner[nokkel(req)]
}

export function hentSoknader(req: NextApiRequest, res: NextApiResponse): RSSoknad[] {
    const personer = getSession(req, res).testpersoner
    const soknader = [] as RSSoknad[]

    Object.keys(personer)
        .reverse()
        .forEach((key) => {
            const person = personer[key]
            person.soknader.forEach((soknad) => {
                soknader.push(soknad)
            })
        })

    return soknader
}

async function parseRequest<T>(req: NextApiRequest): Promise<T> {
    const stream = Readable.from(req)
    const buffer = await stream2buffer(stream)
    const jsonString = buffer.toString()
    return JSON.parse(jsonString)
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const flattenSporsmal = (sporsmal: RSSporsmal[]) => {
    let flatArr: RSSporsmal[] = []
    for (let i = 0; i < sporsmal.length; i++) {
        flatArr.push(sporsmal[i])
        flatArr = flatArr.concat(flattenSporsmal(sporsmal[i].undersporsmal))
    }
    return flatArr
}

function maaDokumentereInntektsopplysninger(soknad: RSSoknad): boolean {
    const nyIArbeidslivet =
        flattenSporsmal(soknad.sporsmal).find((spm) => spm.tag === 'NARINGSDRIVENDE_NY_I_ARBEIDSLIVET')?.svar[0]
            ?.verdi === 'JA'
    if (nyIArbeidslivet) return true
    const nyIArbeidslivetJa =
        flattenSporsmal(soknad.sporsmal).find((spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_JA')?.svar[0]
            ?.verdi === 'CHECKED'
    if (nyIArbeidslivetJa) return true
    const nyIArbeidslivetNei =
        flattenSporsmal(soknad.sporsmal).find((spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_NEI')
            ?.svar[0]?.verdi === 'CHECKED'
    const varigEndring25ProsentJa =
        flattenSporsmal(soknad.sporsmal).find((spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT')
            ?.svar[0]?.verdi === 'JA'
    return nyIArbeidslivetNei && varigEndring25ProsentJa
}

function handterNaringsdrivendeOpplysninger(soknaden: RSSoknad) {
    if (soknaden.arbeidssituasjon != RSArbeidssituasjon.NAERINGSDRIVENDE) {
        return
    }
    if (!['SELVSTENDIGE_OG_FRILANSERE', 'GRADERT_REISETILSKUDD'].includes(soknaden.soknadstype)) {
        return
    }
    if (!soknaden.forstegangssoknad) {
        return
    }
    const erNyKvittering = soknaden.sporsmal.some(
        (spm) =>
            spm.tag === 'INNTEKTSOPPLYSNINGER_DRIFT_VIRKSOMHETEN' ||
            spm.tag === 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET' ||
            spm.tag === 'NARINGSDRIVENDE_NY_I_ARBEIDSLIVET',
    )
    const maaDokumentere = maaDokumentereInntektsopplysninger(soknaden)
    soknaden.inntektsopplysningerNyKvittering = erNyKvittering
    soknaden.inntektsopplysningerInnsendingId = maaDokumentere ? uuid.v4() : undefined
    soknaden.inntektsopplysningerInnsendingDokumenter = maaDokumentere
        ? ['Skattemelding/Næringsspesifikasjon hvis den er klar']
        : undefined
}

export async function mockApi(req: NextApiRequest, res: NextApiResponse) {
    const url = `${req.method} ${cleanPathForMetric(req.url!).split('?')[0]}`
    const testperson = hentTestperson(req, res)
    const alleSoknader = hentSoknader(req, res)
    const nokkelKey = nokkel(req)

    const erClsTestperson = nokkelKey === 'cummulative-layout-shift'
    if (erClsTestperson) {
        const ms = Math.floor(Math.random() * 500) + 2000
        await sleep(ms)
    }

    function sendJson(json = {}, status = 200) {
        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(json))
    }

    const ENDPOINTS = {
        HENT_METADATA: 'GET /api/sykepengesoknad-backend/api/v2/soknader/metadata',
        HENT_AKTIV_KONTO: 'GET /api/sokos-kontoregister-person/api/borger/v1/hent-aktiv-konto',
        HENT_SYKMELDINGER: 'GET /api/flex-sykmeldinger-backend/api/v1/sykmeldinger',
        GET_SOKNAD: 'GET /api/sykepengesoknad-backend/api/v2/soknad/[uuid]',
        KORRIGER_SOKNAD: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/korriger',
        ETTERSEND_TIL_ARBEIDSGIVER: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/ettersendTilArbeidsgiver',
        AVBRYT_SOKNAD: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/avbryt',
        GJENAPNE_SOKNAD: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/gjenapne',
        UPDATE_SPORSMAL: 'PUT /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]',
        GET_MOTTAKER: 'GET /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/mottaker',
        OPPRETT_SOKNAD_UTLAND: 'POST /api/sykepengesoknad-backend/api/v2/opprettSoknadUtland',
        SEND_SOKNAD: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/send',
        OPPLASTING: 'POST /api/sykepengesoknad-kvitteringer/api/v2/opplasting',
        SVAR_SPORSMAL: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]/svar',
        SLETT_SVAR: 'DELETE /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]/svar/[uuid]',
        OPPRETT_UNDERSPORSMAL: 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]/undersporsmal',
        SLETT_UNDERSPORSMAL:
            'DELETE /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]/undersporsmal/[uuid]',
        HENT_KVITTERING: 'GET /api/sykepengesoknad-kvitteringer/api/v2/kvittering/[uuid]',
        POST_FLEXJAR: 'POST /api/flexjar-backend/api/v2/feedback',
        PUT_FLEXJAR: 'PUT /api/flexjar-backend/api/v2/feedback/[uuid]',
    }

    function pathNumber(n: number): string | null {
        if (req.query['path'] && req.query['path']![n]) {
            return req.query['path']![n]
        }
        return null
    }

    const soknadId = pathNumber(3)
    const sporsmalId = pathNumber(5)

    function findSoknadById(soknadId: string | null): RSSoknad | undefined {
        return testperson.soknader.find((soknad) => soknad.id === soknadId)
    }

    function findSporsmalById(soknaden: RSSoknad, sporsmalId: string | null): RSSporsmal | undefined {
        return soknaden.sporsmal.find((spm) => spm.id === sporsmalId)
    }

    function getSoknadEllerFeilmld(soknadId: string | null) {
        if (soknadId === '5a7d403b-df78-491e-86f0-bf3f25408765') {
            return sendJson({}, 404)
        }
        if (soknadId === '3fa85f64-5717-4562-b3fc-2c963f67afa3') {
            return sendJson({}, 403)
        }
        const soknad = findSoknadById(soknadId)
        if (!soknad) {
            return sendJson({}, 404)
        }
        return soknad
    }

    const handlers = {
        [ENDPOINTS.HENT_METADATA]: () => sendJson(testperson.soknader),
        [ENDPOINTS.HENT_AKTIV_KONTO]: () => {
            if (testperson && testperson.kontonummer) {
                return sendJson({ kontonummer: testperson.kontonummer })
            }
            return sendJson({}, 404)
        },
        [ENDPOINTS.HENT_SYKMELDINGER]: () => sendJson(testperson.sykmeldinger),
        [ENDPOINTS.GET_SOKNAD]: async () => {
            const soknaden = getSoknadEllerFeilmld(soknadId)
            if (soknaden) return sendJson(soknaden)
        },
        [ENDPOINTS.KORRIGER_SOKNAD]: async () => {
            const original = findSoknadById(soknadId)
            if (!original) {
                return sendJson({}, 404)
            }
            const eksisterendeUtkast = alleSoknader.find((sok: RSSoknad) => sok.korrigerer === original.id)
            if (eksisterendeUtkast) {
                return sendJson(eksisterendeUtkast, 200)
            }
            const soknad = jsonDeepCopy(original)
            const sisteSporsmal = soknad.sporsmal[soknad.sporsmal.length - 1]
            soknad.id = uuid.v4()
            soknad.korrigerer = original.id
            soknad.status = 'UTKAST_TIL_KORRIGERING'
            soknad.sendtTilArbeidsgiverDato = null
            soknad.sendtTilNAVDato = null
            soknad.sporsmal[0].svar = []
            sisteSporsmal.svar = []

            testperson.soknader.push(soknad)

            return sendJson(soknad, 200)
        },
        [ENDPOINTS.ETTERSEND_TIL_ARBEIDSGIVER]: async () => {
            const soknad = getSoknadEllerFeilmld(soknadId)
            if (!soknad) return
            soknad.sendtTilArbeidsgiverDato = dayjs().toJSON()
            return sendJson()
        },
        [ENDPOINTS.AVBRYT_SOKNAD]: async () => {
            const soknad = getSoknadEllerFeilmld(soknadId)
            if (!soknad) return
            if (soknad.status == 'UTKAST_TIL_KORRIGERING') {
                testperson.soknader.splice(testperson.soknader.indexOf(soknad), 1)
                return sendJson()
            }
            soknad.status = 'AVBRUTT'
            soknad.avbruttDato = dayjs().toJSON()
            return sendJson()
        },
        [ENDPOINTS.GJENAPNE_SOKNAD]: async () => {
            const soknad = getSoknadEllerFeilmld(soknadId)
            if (!soknad) return
            soknad.status = 'NY'
            soknad.avbruttDato = null
            return sendJson()
        },
        [ENDPOINTS.UPDATE_SPORSMAL]: async () => {
            const soknaden = getSoknadEllerFeilmld(soknadId)
            if (!soknaden) return
            const spm = findSporsmalById(soknaden, sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const body = await parseRequest<RSSporsmal>(req)

            const validert = mockApiValiderSporsmal(body)
            if (!validert) {
                return sendJson({}, 400)
            }

            if (soknadId === soknadSomTriggerSporsmalFinnesIkkeISoknad.id) {
                return sendJson(
                    {
                        reason: 'SPORSMAL_FINNES_IKKE_I_SOKNAD',
                    },
                    400,
                )
            }
            if (soknadId === soknadSomTriggerFeilStatusForOppdaterSporsmal.id) {
                return sendJson(
                    {
                        reason: 'FEIL_STATUS_FOR_OPPDATER_SPORSMAL',
                    },
                    400,
                )
            }
            if (soknadId === '3fa85f64-5717-4562-b3fc-2c963f66afa6' && sporsmalId === '900') {
                return sendJson({}, 404)
            }
            if (soknadId === soknadSomTrigger401ForOppdaterSporsmal.id) {
                return sendJson({}, 401)
            }

            const spmIdx = soknaden.sporsmal.findIndex((body) => body.id === sporsmalId)
            soknaden.sporsmal.splice(spmIdx, 1, body)

            const json: RSOppdaterSporsmalResponse = { oppdatertSporsmal: body }

            if (body.tag == 'TILBAKE_I_ARBEID') {
                if (body.svar.length == 1 && body.undersporsmal[0].svar.length == 1) {
                    if (
                        body.svar[0].verdi == 'JA' &&
                        body.undersporsmal[0].svar[0].verdi.includes(
                            body.undersporsmal[0].min || Math.random().toString(),
                        )
                    ) {
                        soknaden.sporsmal = soknaden.sporsmal.filter((spm) => {
                            const tagsSomForsvinner = [
                                'FERIE_V2',
                                'PERMISJON_V2',
                                'UTLAND_V2',
                                'OPPHOLD_UTENFOR_EOS',
                                'JOBBET_DU_GRADERT',
                                'JOBBET_DU_100_PROSENT',
                                'ARBEID_UNDERVEIS_100_PROSENT',
                            ]
                            return !tagsSomForsvinner.some((tag) => spm.tag.includes(tag))
                        })
                        json.mutertSoknad = soknaden
                    }
                }
            }

            if (body.tag == 'FTA_JOBBSITUASJONEN_DIN') {
                const underspm = flattenSporsmal(body.undersporsmal)

                const finnBegrensendeDato = (): string | undefined => {
                    function tagHarSvar(tag: string, svar: string) {
                        return underspm.find((spm) => spm.tag === tag)?.svar[0]?.verdi === svar
                    }

                    if (tagHarSvar('FTA_JOBBSITUASJONEN_DIN_JA', 'CHECKED')) {
                        if (tagHarSvar('FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_NY_JOBB', 'NEI')) {
                            return underspm.find((spm) => spm.tag === 'FTA_JOBBSITUASJONEN_DIN_NAR')?.svar[0]?.verdi
                        }
                        return undefined
                    }

                    if (tagHarSvar('FTA_JOBBSITUASJONEN_DIN_NEI', 'CHECKED')) {
                        if (tagHarSvar('FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT', 'NEI')) {
                            return underspm.find(
                                (spm) => spm.tag === 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_AVREGISTRERT_NAR',
                            )?.svar[0]?.verdi
                        }
                        return undefined
                    }
                }
                const begrensendeDato = finnBegrensendeDato()

                if (begrensendeDato) {
                    const dagForBegrensende = dayjs(begrensendeDato).subtract(1, 'day').format('YYYY-MM-DD')

                    soknaden.sporsmal = soknaden.sporsmal.filter((spm) => {
                        const tagsSomForsvinner = ['FTA_INNTEKT_UNDERVEIS', 'FTA_REISE_TIL_UTLANDET']
                        return !tagsSomForsvinner.some((tag) => spm.tag.includes(tag))
                    })
                    if (begrensendeDato !== soknaden.fom) {
                        const inntekt = inntektUnderveis({ fom: soknaden.fom!, tom: dagForBegrensende })
                        const reiste = reiseTilUtlandet({ fom: soknaden.fom!, tom: dagForBegrensende })
                        // Legg til før det siste spørsmålet i sporsmal lista
                        soknaden.sporsmal.splice(soknaden.sporsmal.length - 1, 0, inntekt, reiste)
                    }
                    json.mutertSoknad = soknaden
                }
            }

            if (body.tag == 'NARINGSDRIVENDE_VIRKSOMHETEN_AVVIKLET' && body.svar[0].verdi == 'JA') {
                const tagsSomForsvinner = ['NARINGSDRIVENDE_NY_I_ARBEIDSLIVET', 'NARINGSDRIVENDE_VARIG_ENDRING']
                soknaden.sporsmal = soknaden.sporsmal.filter((spm) => !tagsSomForsvinner.includes(spm.tag))
                json.mutertSoknad = soknaden
            }

            if (body.tag == 'NARINGSDRIVENDE_NY_I_ARBEIDSLIVET' && body.svar[0].verdi == 'JA') {
                const tagsSomForsvinner = ['NARINGSDRIVENDE_VARIG_ENDRING']
                soknaden.sporsmal = soknaden.sporsmal.filter((spm) => !tagsSomForsvinner.includes(spm.tag))
                json.mutertSoknad = soknaden
            }

            return sendJson(json, 200)
        },
        [ENDPOINTS.GET_MOTTAKER]: () => {
            const skalSendesTil = mottaker(soknadId!)
            return sendJson({ mottaker: skalSendesTil })
        },
        [ENDPOINTS.OPPRETT_SOKNAD_UTLAND]: () => {
            const eksisterendeSoknad = testperson.soknader.find(
                (sok: RSSoknad) => sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
            )
            if (eksisterendeSoknad) {
                return sendJson(eksisterendeSoknad)
            }
            const nySoknad = deepcopyMedNyId(oppholdUtland, uuid.v4())
            testperson.soknader.push(nySoknad)

            return sendJson(nySoknad)
        },
        [ENDPOINTS.SEND_SOKNAD]: async () => {
            if (soknadId === '9157b65a-0372-4657-864c-195037349df5') {
                return sendJson({ status: 400 }, 400)
            }
            if (soknadId === '2a9196c7-306f-4b4f-afdc-891d8a564e42') {
                return sendJson({ status: 500 }, 500)
            }
            const soknaden = getSoknadEllerFeilmld(soknadId)
            if (!soknaden) return
            const sendesTil = mottaker(soknadId!)
            const tidspunkt = dayjs().toJSON()
            if ([RSMottaker.ARBEIDSGIVER_OG_NAV, RSMottaker.ARBEIDSGIVER].includes(sendesTil)) {
                soknaden.sendtTilArbeidsgiverDato = tidspunkt
            }
            if ([RSMottaker.ARBEIDSGIVER_OG_NAV, RSMottaker.NAV].includes(sendesTil)) {
                soknaden.sendtTilNAVDato = tidspunkt
            }
            handterNaringsdrivendeOpplysninger(soknaden)
            soknaden.status = 'SENDT'
            return sendJson({ status: 200 }, 200)
        },
        [ENDPOINTS.OPPLASTING]: async () => {
            const stream = Readable.from(req)
            await stream2buffer(stream)
            return sendJson({
                id: uuid.v4(),
                melding: 'opprettet',
            })
        },
        [ENDPOINTS.SVAR_SPORSMAL]: async () => {
            const soknaden = findSoknadById(soknadId)
            if (!soknaden) {
                return sendJson({}, 404)
            }
            const spm = findSporsmalById(soknaden, sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const body = await parseRequest<RSSvar>(req)
            spm.svar.push({
                id: uuid.v4(),
                ...body,
            })
            return sendJson({ oppdatertSporsmal: spm }, 201)
        },
        [ENDPOINTS.POST_FLEXJAR]: async () => {
            return sendJson({ id: uuidv4() }, 201)
        },
        [ENDPOINTS.PUT_FLEXJAR]: async () => {
            return sendJson({}, 204)
        },
        [ENDPOINTS.SLETT_SVAR]: async () => {
            const soknad = getSoknadEllerFeilmld(soknadId)
            if (!soknad) return
            if (soknadId === feilVedSlettingAvKvittering.id) {
                return sendJson({}, 500)
            }
            const spm = findSporsmalById(soknad, sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const svarId = pathNumber(7)
            const svarIdx = spm.svar.findIndex((s) => s.id === svarId)
            if (svarIdx !== -1) {
                spm.svar.splice(svarIdx, 1)
            }
            return sendJson({ status: 204 }, 204)
        },
        [ENDPOINTS.OPPRETT_UNDERSPORSMAL]: async () => {
            const soknaden = getSoknadEllerFeilmld(soknadId)
            if (!soknaden) return
            const spm = findSporsmalById(soknaden, sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const nyttUnderspm = jsonDeepCopy(spm.undersporsmal[0])
            nyttUnderspm.id = uuid.v4()
            nyttUnderspm.svar = []
            nyttUnderspm.undersporsmal.forEach((underspm) => {
                underspm.id = uuid.v4()
                underspm.svar = []
                underspm.undersporsmal.forEach((subUnderspm) => {
                    subUnderspm.id = uuid.v4()
                    subUnderspm.svar = []
                })
            })
            spm.undersporsmal.push(nyttUnderspm)
            return sendJson({ oppdatertSporsmal: spm }, 200)
        },
        [ENDPOINTS.SLETT_UNDERSPORSMAL]: async () => {
            const soknaden = getSoknadEllerFeilmld(soknadId)
            if (!soknaden) return
            const spm = findSporsmalById(soknaden, sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const undersporsmalId = pathNumber(7)
            const undersporsmalIndex = spm.undersporsmal.findIndex((s) => s.id === undersporsmalId)
            if (undersporsmalIndex !== -1) {
                spm.undersporsmal.splice(undersporsmalIndex, 1)
            }

            return sendJson({ oppdatertSporsmal: spm }, 204)
        },
        [ENDPOINTS.HENT_KVITTERING]: () => {
            const filePath = path.join(process.cwd(), 'public', 'static', `kvittering.jpg`)
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    res.status(500).send('Feil ved lesing av filen.')
                } else {
                    res.setHeader('Content-Type', 'image/jpeg')
                    res.end(data)
                }
            })
            return
        },
    }

    const handler = handlers[url]

    if (handler) {
        return handler()
    } else {
        logger.error(`Ukjent api ${url}`)
        res.status(404)
        res.end('Ukjent api')
    }
}

const mottaker = (soknadId: string): RSMottaker => {
    if (
        soknadId === arbeidstaker.id ||
        soknadId === arbeidtakerMedGammelOppsummering().id ||
        soknadId === arbeidstakerUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === foranArbeidstakerMedOppholdKvittering.id ||
        soknadId === arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id
    ) {
        return RSMottaker.ARBEIDSGIVER_OG_NAV
    }
    if (
        soknadId === arbeidstakerGradert.id ||
        soknadId === arbeidstakerInnenforArbeidsgiverperiodeKvittering.id ||
        soknadId === sok6.id ||
        soknadId === soknadInnenforArbeidsgiverperioden.id
    ) {
        return RSMottaker.ARBEIDSGIVER
    }

    return RSMottaker.NAV
}
