import FetchMock, { HandlerArgument, MiddlewareUtils } from 'yet-another-fetch-mock';
import { soknader } from './data/soknader';
import { sykmeldinger } from './data/sykmeldinger';
import { unleashToggles } from './data/toggles';
import env from '../../utils/environment';

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
mock.get('/login', '/sykepengesoknad');
mock.post(env.unleashUrl, unleashToggles);
mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`, soknader);
mock.get(`${env.syforestRoot}/sykmeldinger`, sykmeldinger);
