import * as uuid from 'uuid'
import FetchMock, { HandlerArgument, MiddlewareUtils } from 'yet-another-fetch-mock'

import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import env from '../../utils/environment'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { soknaderIntegration } from './data/soknader-integration'
import { soknaderOpplaering } from './data/soknader-opplaering'
import { sykmeldinger } from './data/sykmeldinger'
import { unleashToggles } from './data/toggles'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(300),
        MiddlewareUtils.loggingMiddleware()
    )
})

const soknader = [ ...jsonDeepCopy(soknaderOpplaering) ]
if (!env.isOpplaering) {
    soknader.push(...jsonDeepCopy(soknaderIntegration))
}

mock.put(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/sporsmal/:sporsmal`, (args: HandlerArgument) => {
    return { 'oppdatertSporsmal': args.body }
})
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/korriger`, (args: HandlerArgument) => {
    const soknad = jsonDeepCopy(soknader.find((sok: RSSoknad) => {
        return sok.id === args.pathParams.soknad
    }))!
    soknad.id = uuid.v4()
    soknad.status = RSSoknadstatus.UTKAST_TIL_KORRIGERING
    return soknad as any
})
mock.post(`${env.syfoapiRoot}/syfosoknad/api/opprettSoknadUtland`, () => {
    const soknad = soknader.find((sok: RSSoknad) => {
        return sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY
    })
    if (soknad) {
        return soknad
    }
    const soknadOriginal = jsonDeepCopy(soknaderOpplaering.find((sok: RSSoknad) => {
        return sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY
    })!)
    soknadOriginal.id = uuid.v4()
    soknadOriginal.status = RSSoknadstatus.NY
    return soknadOriginal as any
})
mock.get('/login', '/nysykepengesoknad')
mock.post(env.unleashUrl, unleashToggles)
mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`, soknader as any)
mock.get(`${env.syforestRoot}/sykmeldinger`, sykmeldinger)
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/finnMottaker`, { 'mottaker': 'NAV' })
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/send`, {})
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/ettersendTilNav`, {})
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/ettersendTilArbeidsgiver`, {})
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/avbryt`, {})
