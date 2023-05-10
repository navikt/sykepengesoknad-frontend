import * as uuid from 'uuid'
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'
import dayjs from 'dayjs'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { TagTyper } from '../../types/enums'

import { arbeidstaker, arbeidstakerGradert } from './data/opplaering'
import { feilVedSlettingAvKvittering } from './data/reisetilskudd'
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
import { opplaering, Persona, soknaderOpplaering } from './personas'
import { personas } from './testperson'
import { kortFomTomArbeidstakerSoknad } from './data/kort-soknad'

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

const setUpMock = (person: Persona) => {
    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: MiddlewareUtils.combine(MiddlewareUtils.loggingMiddleware()),
    })

    mock.put('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/sporsmal/:sporsmal', (req) => {
        const soknadId = req.pathParams.soknad
        const sporsmalId = req.pathParams.sporsmal

        if (soknadId === soknadSomTriggerSporsmalFinnesIkkeISoknad.id) {
            return Promise.resolve({
                status: 400,
                body: JSON.stringify({
                    reason: 'SPORSMAL_FINNES_IKKE_I_SOKNAD',
                }),
            })
        }
        if (soknadId === soknadSomTriggerFeilStatusForOppdaterSporsmal.id) {
            return Promise.resolve({
                status: 400,
                body: JSON.stringify({
                    reason: 'FEIL_STATUS_FOR_OPPDATER_SPORSMAL',
                }),
            })
        }

        const soknad = person.soknader.find((s) => s.id === soknadId)!
        const spmIdx = soknad.sporsmal.findIndex((spm) => spm.id === sporsmalId)
        soknad.sporsmal.splice(spmIdx, 1, req.body)

        return Promise.resolve({
            status: 200,
            body: JSON.stringify({ oppdatertSporsmal: req.body }),
        })
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/korriger', (req, res, ctx) => {
        const original = person.soknader.find((sok: RSSoknad) => sok.id === req.pathParams.soknad)!

        const eksisterendeUtkast = person.soknader.find((sok: RSSoknad) => sok.korrigerer === original.id)
        if (eksisterendeUtkast) {
            return res(ctx.json(eksisterendeUtkast))
        }

        const soknad = jsonDeepCopy(original)
        soknad.id = uuid.v4()
        soknad.korrigerer = original.id
        soknad.status = 'UTKAST_TIL_KORRIGERING'
        soknad.sendtTilArbeidsgiverDato = null
        soknad.sendtTilNAVDato = null
        soknad.sporsmal.map((spm) => {
            if (spm.tag === TagTyper.ANSVARSERKLARING || spm.tag === TagTyper.BEKREFT_OPPLYSNINGER) {
                spm.svar = []
            }
        })

        person.soknader.push(soknad)

        return res(ctx.json(soknad))
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/opprettSoknadUtland', (req, res, ctx) => {
        const soknad = person.soknader.find(
            (sok: RSSoknad) => sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
        )
        if (soknad) {
            return res(ctx.json(soknad))
        }
        const soknadOriginal = jsonDeepCopy(
            soknaderOpplaering.find(
                (sok: RSSoknad) => sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
            )!,
        )
        soknadOriginal.id = uuid.v4()
        soknadOriginal.status = RSSoknadstatus.NY
        person.soknader.push(soknadOriginal)

        return res(ctx.json(soknadOriginal))
    })

    mock.get('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/mottaker', (req, res, ctx) => {
        const soknadId = req.pathParams.soknad
        const skalSendesTil = mottaker(soknadId)
        return res(ctx.json({ mottaker: skalSendesTil }))
    })

    mock.get('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/metadata', (req, res, ctx) =>
        res(ctx.json(person.soknader)),
    )

    mock.get('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/:id', (req, res, ctx) =>
        res(ctx.json(person.soknader.find((s) => s.id === req.pathParams.id))),
    )

    mock.get('/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger', (req, res, ctx) =>
        res(ctx.json(person.sykmeldinger)),
    )

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/send', (req) => {
        const soknadId = req.pathParams.soknad
        if (soknadId == '400-ved-send-soknad') {
            return Promise.resolve({ status: 400 })
        }
        if (soknadId == '500-ved-send-soknad') {
            return Promise.resolve({ status: 500 })
        }

        const soknad = person.soknader.find((s) => s.id === soknadId)!
        const sendesTil = mottaker(soknadId)
        const tidspunkt = dayjs().toJSON()

        if ([RSMottaker.ARBEIDSGIVER_OG_NAV, RSMottaker.ARBEIDSGIVER].includes(sendesTil)) {
            soknad.sendtTilArbeidsgiverDato = tidspunkt
        }
        if ([RSMottaker.ARBEIDSGIVER_OG_NAV, RSMottaker.NAV].includes(sendesTil)) {
            soknad.sendtTilNAVDato = tidspunkt
        }
        soknad.status = 'SENDT'

        return Promise.resolve({ status: 200 })
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/ettersendTilNav', (req) => {
        const soknadId = req.pathParams.soknad
        const soknad = person.soknader.find((s) => s.id === soknadId)!
        soknad.sendtTilNAVDato = dayjs().toJSON()
        return Promise.resolve({ status: 200 })
    })

    mock.post(
        '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/ettersendTilArbeidsgiver',
        (req) => {
            const soknadId = req.pathParams.soknad
            const soknad = person.soknader.find((s) => s.id === soknadId)!
            soknad.sendtTilArbeidsgiverDato = dayjs().toJSON()
            return Promise.resolve({ status: 200 })
        },
    )

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/avbryt', (req) => {
        const soknadId = req.pathParams.soknad
        const soknad = person.soknader.find((s) => s.id === soknadId)!
        soknad.status = 'AVBRUTT'
        soknad.avbruttDato = dayjs().toJSON()
        return Promise.resolve({ status: 200 })
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/gjenapne', (req) => {
        const soknadId = req.pathParams.soknad
        const soknad = person.soknader.find((s) => s.id === soknadId)!
        soknad.status = 'NY'
        soknad.avbruttDato = null
        return Promise.resolve({ status: 200 })
    })

    mock.delete(
        '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/sporsmal/:spmid/svar/:svarid',
        (req) => {
            if (req.pathParams.soknad === feilVedSlettingAvKvittering.id) {
                return Promise.resolve({ status: 500 })
            }
            const sok = person.soknader.find((s) => s.id === req.pathParams.soknad)!
            const spm = sok.sporsmal.find((s) => s.id === req.pathParams.spmid)!
            const svarIdx = spm.svar.findIndex((s) => s.id === req.pathParams.svarid)!
            spm.svar.splice(svarIdx, 1)

            return Promise.resolve({ status: 204 })
        },
    )

    mock.post(
        '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/sporsmal/:spmid/svar',
        (req) => {
            const sok = person.soknader.find((r) => r.id === req.pathParams.soknad)!
            const spm = sok.sporsmal.find((spm) => spm.id === req.pathParams.spmid)
            spm!.svar.push(req.body)

            return Promise.resolve({
                status: 201,
                body: JSON.stringify({ oppdatertSporsmal: spm }),
            })
        },
    )

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/opplasting', (req, res, ctx) =>
        res(
            ctx.json({
                id: uuid.v4(),
                melding: 'opprettet',
            }),
        ),
    )

    mock.get('/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/kvittering/:blob', () =>
        fetch('/syk/sykepengesoknad/static/kvittering.jpg'),
    )
}

const url = new URL(window.location.href)

const testperson = url.searchParams.get('testperson')
if (testperson && Object.prototype.hasOwnProperty.call(personas, testperson)) {
    setUpMock(personas[testperson]())
} else {
    setUpMock(opplaering)
}
