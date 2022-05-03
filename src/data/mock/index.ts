import * as uuid from 'uuid'
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { flexGatewayRoot, isOpplaering, sykmeldingerBackendProxyRoot } from '../../utils/environment'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { delvisUtfyltReisetilskudd, gradertReisetilskudd, nyttReisetilskudd } from './data/reisetilskudd'
import {
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering, arbeidstakerTilKorrigering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    brukertestSoknad,
    foranArbeidstakerMedOppholdKvittering,
    sok6,
    soknaderIntegration,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    soknadSomTriggerSporsmalFinnesIkkeISoknad
} from './data/soknader-integration'
import { arbeidstaker, arbeidstakerGradert, soknaderOpplaering } from './data/soknader-opplaering'
import { sykmeldinger } from './data/sykmeldinger'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

const finnSoknader = (): RSSoknad[] => {
    if (window.location.search.includes('brukertest')) {
        return [ jsonDeepCopy(brukertestSoknad) ]
    }
    if (window.location.search.includes('korrigering')) {
        return [ jsonDeepCopy(arbeidstakerTilKorrigering) ]
    }
    const soknader = [ ...jsonDeepCopy(soknaderOpplaering), nyttReisetilskudd, gradertReisetilskudd, delvisUtfyltReisetilskudd ]
    if (!isOpplaering() || window.location.href.includes('alle-mock-data')) {
        soknader.push(...jsonDeepCopy(soknaderIntegration))
    }
    return soknader
}

const soknader = finnSoknader()

mock.put(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/sporsmal/:sporsmal`,
    (req) => {

        if (req.pathParams.soknad === soknadSomTriggerSporsmalFinnesIkkeISoknad.id) {
            return Promise.resolve({
                status: 400,
                body: JSON.stringify({ reason: 'SPORSMAL_FINNES_IKKE_I_SOKNAD' })
            })
        }
        if (req.pathParams.soknad === soknadSomTriggerFeilStatusForOppdaterSporsmal.id) {
            return Promise.resolve({
                status: 400,
                body: JSON.stringify({ reason: 'FEIL_STATUS_FOR_OPPDATER_SPORSMAL' })
            })
        }
        return Promise.resolve({
            status: 200,
            body: JSON.stringify({ oppdatertSporsmal: req.body })
        })
    })


mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/korriger`,
    (req, res, ctx) => {
        const original = soknader.find((sok: RSSoknad) =>
            sok.id === req.pathParams.soknad
        )
        if (!original) {
            window.alert('Du kan ikke endre en endret søknad i labs versjonen')
            return res( ctx.status(500))
        }
        const soknad = jsonDeepCopy(original)
        soknad.id = uuid.v4()
        soknad.korrigerer = original.id
        soknad.status = RSSoknadstatus.UTKAST_TIL_KORRIGERING
        return res(ctx.json(soknad))
    })

mock.post(`${flexGatewayRoot()}/syfosoknad/api/opprettSoknadUtland`,
    (req, res, ctx) => {
        const soknad = soknader.find((sok: RSSoknad) =>
            sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY
        )
        if (soknad) {
            return res(ctx.json(soknad))
        }
        const soknadOriginal = jsonDeepCopy(soknaderOpplaering.find((sok: RSSoknad) =>
            sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY
        )!)
        soknadOriginal.id = uuid.v4()
        soknadOriginal.status = RSSoknadstatus.NY
        return res(ctx.json(soknadOriginal))
    })

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/finnMottaker`,
    (req, res, ctx) => {
        const soknadId = req.pathParams.soknad

        if (soknadId === arbeidstaker.id ||
            soknadId === arbeidstakerUtenforArbeidsgiverperiodeKvittering.id ||
            soknadId === arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id ||
            soknadId === arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id ||
            soknadId === foranArbeidstakerMedOppholdKvittering.id ||
            soknadId === arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id) {
            return res(ctx.json({ mottaker: RSMottaker.ARBEIDSGIVER_OG_NAV }))
        }
        if (soknadId === arbeidstakerGradert.id ||
            soknadId === arbeidstakerInnenforArbeidsgiverperiodeKvittering.id ||
            soknadId === sok6.id) {
            return res(ctx.json({ mottaker: RSMottaker.ARBEIDSGIVER }))
        }

        return res(ctx.json({ mottaker: RSMottaker.NAV }))
    })


mock.get(`${flexGatewayRoot()}/syfosoknad/api/soknader`,
    (req, res, ctx) => res(ctx.json(soknader)))

mock.get(`${sykmeldingerBackendProxyRoot()}/api/v1/sykmeldinger`,
    (req, res, ctx) => res(ctx.json(sykmeldinger)))

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/send`,
    () => Promise.resolve({ status: 200 }))

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/ettersendTilNav`,
    () => Promise.resolve({ status: 200 }))

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/ettersendTilArbeidsgiver`,
    () => Promise.resolve({ status: 200 }))

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/avbryt`,
    () => Promise.resolve({ status: 200 }))

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/gjenapne`,
    () => Promise.resolve({ status: 200 }))

mock.delete(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/sporsmal/:spmid/svar/:svarid`,
    () => Promise.resolve({ status: 204 }))

mock.post(`${flexGatewayRoot()}/flex-bucket-uploader/opplasting`,
    (req, res, ctx) =>
        res(ctx.json({
            id: uuid.v4(),
            melding: 'opprettet'
        })))

mock.post(`${flexGatewayRoot()}/syfosoknad/api/soknader/:soknad/sporsmal/:spmid/svar`,
    (req) => {
        const r = soknader.find((r) => r.id === req.pathParams.soknad)
        const spm = jsonDeepCopy(
            r!.sporsmal.find((spm) => spm.id === req.pathParams.spmid)
        )
        spm!.svar.push(req.body)
        return Promise.resolve({
            status: 201,
            body: JSON.stringify({ oppdatertSporsmal: spm })
        })
    }
)

mock.get(`${flexGatewayRoot()}/flex-bucket-uploader/kvittering/:blob`,
    () => fetch('/syk/sykepengesok/static/kvittering.jpg')
)

