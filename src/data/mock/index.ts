import FetchMock, { HandlerArgument, MiddlewareUtils } from 'yet-another-fetch-mock';
import { soknader } from './data/soknader-felles';
import { sykmeldinger } from './data/sykmeldinger-felles';
import { unleashToggles } from './data/toggles';
import env from '../../utils/environment';
import { RSSoknad } from '../../types/rs-types/rs-soknad';

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
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/korriger`, soknader.filter((sok: RSSoknad) => {
    return sok.id === '977ce8fc-a83a-4454-ab81-893ff0284437' })[0]
);
mock.get('/login', '/nysykepengesoknad');
mock.post(env.unleashUrl, unleashToggles);
mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`, soknader);
mock.get(`${env.syforestRoot}/sykmeldinger`, sykmeldinger);
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/finnMottaker`, { 'mottaker': 'NAV' });
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/send`, {});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/ettersendTilNav`, {});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/ettersendTilArbeidsgiver`, {});
mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:soknad/avbryt`, {});
