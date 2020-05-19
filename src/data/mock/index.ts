import FetchMock, { HandlerArgument, MiddlewareUtils } from 'yet-another-fetch-mock';
import { soknader } from './data/soknader';
import { sykmeldinger } from './data/sykmeldinger';
import { unleashToggles } from './data/toggles';
import env from '../../utils/environment';
import { RSSoknad } from '../../types/rs-types/rs-soknad';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.put(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/sporsmal/:sporsmal`, (args: HandlerArgument) => {
    return { 'oppdatertSporsmal': args.body };
});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/korriger`, (args: HandlerArgument) => {
    return soknader
        .find((sok: RSSoknad) => {
            return sok.id === args.pathParams.soknad;
        })
        .map((sok: RSSoknad) => {
            sok.id = sok.id + '1';
            sok.status = RSSoknadstatus.UTKAST_TIL_KORRIGERING;
            return sok;
        });
});
mock.get('/login', '/nysykepengesoknad');
mock.post(env.unleashUrl, unleashToggles);
mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`, soknader);
mock.get(`${env.syforestRoot}/sykmeldinger`, sykmeldinger);
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/finnMottaker`, { 'mottaker': 'NAV' });
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/send`, {});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/ettersendTilNav`, {});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/ettersendTilArbeidsgiver`, {});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/avbryt`, {});
