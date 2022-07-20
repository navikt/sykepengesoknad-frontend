import * as uuid from 'uuid'
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { backendApp, flexGatewayRoot } from '../../utils/environment'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
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
import {
    arbeidstaker,
    arbeidstakerGradert,
    soknaderOpplaering,
} from './data/soknader-opplaering'
import { alleData, opplaering, Persona } from './personas'
import { personas } from './testperson'

const soknader = alleData.soknader

const setUpMock = (person: Persona) => {
    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.loggingMiddleware()
        ),
    })

    mock.put(
        `${flexGatewayRoot()}/${backendApp()}/api/soknader/:soknad/sporsmal/:sporsmal`,
        (req) => {
            if (
                req.pathParams.soknad ===
                soknadSomTriggerSporsmalFinnesIkkeISoknad.id
            ) {
                return Promise.resolve({
                    status: 400,
                    body: JSON.stringify({
                        reason: 'SPORSMAL_FINNES_IKKE_I_SOKNAD',
                    }),
                })
            }
            if (
                req.pathParams.soknad ===
                soknadSomTriggerFeilStatusForOppdaterSporsmal.id
            ) {
                return Promise.resolve({
                    status: 400,
                    body: JSON.stringify({
                        reason: 'FEIL_STATUS_FOR_OPPDATER_SPORSMAL',
                    }),
                })
            }
            return Promise.resolve({
                status: 200,
                body: JSON.stringify({ oppdatertSporsmal: req.body }),
            })
        }
    )

    mock.post(
        `${flexGatewayRoot()}/${backendApp()}/api/soknader/:soknad/korriger`,
        (req, res, ctx) => {
            const original = soknader.find(
                (sok: RSSoknad) => sok.id === req.pathParams.soknad
            )
            if (!original) {
                window.alert(
                    'Du kan ikke endre en endret søknad i labs versjonen'
                )
                return res(ctx.status(500))
            }
            const soknad = jsonDeepCopy(original)
            soknad.id = uuid.v4()
            soknad.korrigerer = original.id
            soknad.status = RSSoknadstatus.UTKAST_TIL_KORRIGERING
            return res(ctx.json(soknad))
        }
    )

    mock.post(
        `${flexGatewayRoot()}/${backendApp()}/api/opprettSoknadUtland`,
        (req, res, ctx) => {
            const soknad = person.soknader.find(
                (sok: RSSoknad) =>
                    sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND &&
                    sok.status === RSSoknadstatus.NY
            )
            if (soknad) {
                return res(ctx.json(soknad))
            }
            const soknadOriginal = jsonDeepCopy(
                soknaderOpplaering.find(
                    (sok: RSSoknad) =>
                        sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND &&
                        sok.status === RSSoknadstatus.NY
                )!
            )
            soknadOriginal.id = uuid.v4()
            soknadOriginal.status = RSSoknadstatus.NY
            return res(ctx.json(soknadOriginal))
        }
    )

    mock.post(
        '/syk/sykepengesoknad/api/v1/soknader/:soknad/finnMottaker',
        (req, res, ctx) => {
            const soknadId = req.pathParams.soknad

            if (
                soknadId === arbeidstaker.id ||
                soknadId ===
                    arbeidstakerUtenforArbeidsgiverperiodeKvittering.id ||
                soknadId ===
                    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id ||
                soknadId ===
                    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id ||
                soknadId === foranArbeidstakerMedOppholdKvittering.id ||
                soknadId ===
                    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id
            ) {
                return res(
                    ctx.json({ mottaker: RSMottaker.ARBEIDSGIVER_OG_NAV })
                )
            }
            if (
                soknadId === arbeidstakerGradert.id ||
                soknadId ===
                    arbeidstakerInnenforArbeidsgiverperiodeKvittering.id ||
                soknadId === sok6.id
            ) {
                return res(ctx.json({ mottaker: RSMottaker.ARBEIDSGIVER }))
            }

            return res(ctx.json({ mottaker: RSMottaker.NAV }))
        }
    )

    mock.get('/syk/sykepengesoknad/api/v1/soknader', (req, res, ctx) =>
        res(ctx.json(person.soknader))
    )

    mock.get('/syk/sykepengesoknad/api/v1/sykmeldinger', (req, res, ctx) =>
        res(ctx.json(person.sykmeldinger))
    )

    mock.post('/syk/sykepengesoknad/api/v1/soknader/:soknad/send', () =>
        Promise.resolve({ status: 200 })
    )

    mock.post(
        `${flexGatewayRoot()}/${backendApp()}/api/soknader/:soknad/ettersendTilNav`,
        () => Promise.resolve({ status: 200 })
    )

    mock.post(
        `${flexGatewayRoot()}/${backendApp()}/api/soknader/:soknad/ettersendTilArbeidsgiver`,
        () => Promise.resolve({ status: 200 })
    )

    mock.post('/syk/sykepengesoknad/api/v1/soknader/:soknad/avbryt', () =>
        Promise.resolve({ status: 200 })
    )

    mock.post('/syk/sykepengesoknad/api/v1/soknader/:soknad/gjenapne', () =>
        Promise.resolve({ status: 200 })
    )

    mock.delete(
        `${flexGatewayRoot()}/${backendApp()}/api/soknader/:soknad/sporsmal/:spmid/svar/:svarid`,
        (req) => {
            if (req.pathParams.soknad === feilVedSlettingAvKvittering.id) {
                return Promise.resolve({ status: 500 })
            }
            return Promise.resolve({ status: 204 })
        }
    )

    mock.post(
        `${flexGatewayRoot()}/flex-bucket-uploader/opplasting`,
        (req, res, ctx) =>
            res(
                ctx.json({
                    id: uuid.v4(),
                    melding: 'opprettet',
                })
            )
    )

    mock.post(
        `${flexGatewayRoot()}/${backendApp()}/api/soknader/:soknad/sporsmal/:spmid/svar`,
        (req) => {
            const r = soknader.find((r) => r.id === req.pathParams.soknad)
            const spm = jsonDeepCopy(
                r!.sporsmal.find((spm) => spm.id === req.pathParams.spmid)
            )
            spm!.svar.push(req.body)
            return Promise.resolve({
                status: 201,
                body: JSON.stringify({ oppdatertSporsmal: spm }),
            })
        }
    )

    mock.get(`${flexGatewayRoot()}/flex-bucket-uploader/kvittering/:blob`, () =>
        fetch('/syk/sykepengesok/static/kvittering.jpg')
    )
}

const url = new URL(window.location.href)

const testperson = url.searchParams.get('testperson')
if (testperson && Object.prototype.hasOwnProperty.call(personas, testperson)) {
    setUpMock(personas[testperson]())
} else {
    setUpMock(opplaering)
}
