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

import { cleanPathForMetric } from '../../metrics'
import { RSSporsmal } from '../../types/rs-types/rs-sporsmal'
import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSvar } from '../../types/rs-types/rs-svar'

import { arbeidstaker, arbeidstakerGradert } from './data/opplaering'
import { kortFomTomArbeidstakerSoknad } from './data/kort-soknad'
import { Persona, soknaderOpplaering } from './personas'
import { testpersoner } from './testperson'
import {
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    foranArbeidstakerMedOppholdKvittering,
    sok6,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
} from './data/soknader-integration'
import {feilVedSlettingAvKvittering} from "./data/reisetilskudd";

type session = {
    expires: dayjs.Dayjs
    testpersoner: { [index: string]: Persona }
}
const sessionStore = {} as Record<string, session>

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

export function hentTestperson(req: NextApiRequest, res: NextApiResponse): Persona {
    function nokkel(): string {
        const query = req.query['testperson']
        if (query) return query.toString()
        return 'opplaering'
    }

    return getSession(req, res).testpersoner[nokkel()]
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

export async function mockApi(req: NextApiRequest, res: NextApiResponse) {
    const url = `${req.method} ${cleanPathForMetric(req.url!).split('?')[0]}`
    const testperson = hentTestperson(req, res)
    const alleSoknader = hentSoknader(req, res)

    function sendJson(json = {}, status = 200) {
        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(json))
    }

    function pathNumber(n: number): string | null {
        if (req.query['path'] && req.query['path']![n]) {
            return req.query['path']![n]
        }
        return null
    }

    const soknadId = pathNumber(3)
    const sporsmalId = pathNumber(5)

    switch (url) {
        case 'GET /api/sykepengesoknad-backend/api/v2/soknader/metadata':
            return sendJson(testperson.soknader)
        case 'GET /api/sokos-kontoregister-person/api/borger/v1/hent-aktiv-konto': {
            if (testperson && testperson.kontonummer) {
                return sendJson({ kontonummer: testperson.kontonummer })
            }
            return sendJson({}, 404)
        }
        case 'GET /api/sykmeldinger-backend/api/v2/sykmeldinger':
            return sendJson(testperson.sykmeldinger)

        case 'GET /api/sykepengesoknad-backend/api/v2/soknad/[uuid]': {
            const soknaden = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (soknaden) {
                return sendJson(soknaden)
            } else {
                return sendJson({}, 404)
            }
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/korriger': {
            const original = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!original) {
                return sendJson({}, 404)
            }

            const eksisterendeUtkast = alleSoknader.find((sok: RSSoknad) => sok.korrigerer === original.id)
            if (eksisterendeUtkast) {
                return sendJson(eksisterendeUtkast, 200)
            }

            const soknad = jsonDeepCopy(original)
            soknad.id = uuid.v4()
            soknad.korrigerer = original.id
            soknad.status = 'UTKAST_TIL_KORRIGERING'
            soknad.sendtTilArbeidsgiverDato = null
            soknad.sendtTilNAVDato = null
            soknad.sporsmal[0].svar = []

            testperson.soknader.push(soknad)

            return sendJson(soknad, 200)
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/ettersendTilNav': {
            const soknad = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknad) {
                return sendJson({}, 404)
            }
            soknad.sendtTilNAVDato = dayjs().toJSON()

            return sendJson()
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/ettersendTilArbeidsgiver': {
            const soknad = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknad) {
                return sendJson({}, 404)
            }
            soknad.sendtTilArbeidsgiverDato = dayjs().toJSON()

            return sendJson()
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/avbryt': {
            const soknad = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknad) {
                return sendJson({}, 404)
            }
            soknad.status = 'AVBRUTT'
            soknad.avbruttDato = dayjs().toJSON()
            return sendJson()
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/gjenapne': {
            const soknad = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknad) {
                return sendJson({}, 404)
            }
            soknad.status = 'NY'
            soknad.avbruttDato = null
            return sendJson()
        }
        case 'PUT /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]': {
            const soknaden = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknaden) {
                return sendJson({}, 404)
            }
            const spm = soknaden.sporsmal.find((spm) => spm.id === sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
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
            const body = await parseRequest<RSSporsmal>(req)

            const spmIdx = soknaden.sporsmal.findIndex((body) => body.id === sporsmalId)
            soknaden.sporsmal.splice(spmIdx, 1, body)

            return sendJson({ oppdatertSporsmal: body }, 200)
        }
        case 'GET /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/mottaker': {
            const skalSendesTil = mottaker(soknadId!)
            return sendJson({ mottaker: skalSendesTil })
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/opprettSoknadUtland': {
            const soknad = testperson.soknader.find(
                (sok: RSSoknad) => sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
            )
            if (soknad) {
                return sendJson(soknad)
            }
            const soknadOriginal = jsonDeepCopy(
                soknaderOpplaering.find(
                    (sok: RSSoknad) =>
                        sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
                )!,
            )
            soknadOriginal.id = uuid.v4()
            soknadOriginal.status = RSSoknadstatus.NY
            testperson.soknader.push(soknadOriginal)

            return sendJson(soknadOriginal)
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/send': {
            if (soknadId == '9157b65a-0372-4657-864c-195037349df5') {
                return sendJson({ status: 400 }, 400)
            }
            if (soknadId == '2a9196c7-306f-4b4f-afdc-891d8a564e42') {
                return sendJson({ status: 500 }, 500)
            }
            const soknaden = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknaden) {
                return sendJson({}, 404)
            }
            const sendesTil = mottaker(soknadId!)
            const tidspunkt = dayjs().toJSON()

            if ([RSMottaker.ARBEIDSGIVER_OG_NAV, RSMottaker.ARBEIDSGIVER].includes(sendesTil)) {
                soknaden.sendtTilArbeidsgiverDato = tidspunkt
            }
            if ([RSMottaker.ARBEIDSGIVER_OG_NAV, RSMottaker.NAV].includes(sendesTil)) {
                soknaden.sendtTilNAVDato = tidspunkt
            }
            soknaden.status = 'SENDT'

            return sendJson({ status: 200 }, 200)
        }
        case 'POST /api/sykepengesoknad-kvitteringer/api/v2/opplasting': {
            return sendJson({
                id: uuid.v4(),
                melding: 'opprettet',
            })
        }
        case 'POST /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]/svar': {
            const soknaden = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknaden) {
                return sendJson({}, 404)
            }
            const spm = soknaden.sporsmal.find((spm) => spm.id === sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const body = await parseRequest<RSSvar>(req)

            spm.svar.push({
                id: uuid.v4(),
                ...body,
            })

            return sendJson({ oppdatertSporsmal: spm }, 201)
        }
        case 'DELETE /api/sykepengesoknad-backend/api/v2/soknader/[uuid]/sporsmal/[uuid]/svar/[uuid]': {
            const soknaden = alleSoknader.find((soknad) => soknad.id === soknadId)
            if (!soknaden) {
                return sendJson({}, 404)
            }
            if(soknadId === feilVedSlettingAvKvittering.id){
                return sendJson({}, 500)
            }
            const spm = soknaden.sporsmal.find((spm) => spm.id === sporsmalId)
            if (!spm) {
                return sendJson({}, 404)
            }
            const svarId = pathNumber(7)

            const svarIdx = spm.svar.findIndex((s) => s.id === svarId)
            if (svarIdx != -1) {
                spm.svar.splice(svarIdx, 1)
            }

            return sendJson({ status: 204 }, 204)
        }
        case 'GET /api/sykepengesoknad-kvitteringer/api/v2/kvittering/[uuid]': {
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
        }

        default:
            logger.error(`Ukjent api ${url}`)

            res.status(404)
            res.end('Ukjent api')
            break
    }
}

const mottaker = (soknadId: string): RSMottaker => {
    if (
        soknadId === arbeidstaker.id ||
        soknadId === arbeidstakerUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === foranArbeidstakerMedOppholdKvittering.id ||
        soknadId === arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id ||
        soknadId === kortFomTomArbeidstakerSoknad.id
    ) {
        return RSMottaker.ARBEIDSGIVER_OG_NAV
    }
    if (
        soknadId === arbeidstakerGradert.id ||
        soknadId === arbeidstakerInnenforArbeidsgiverperiodeKvittering.id ||
        soknadId === sok6.id
    ) {
        return RSMottaker.ARBEIDSGIVER
    }

    return RSMottaker.NAV
}
