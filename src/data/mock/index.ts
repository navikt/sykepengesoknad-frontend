import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { soknader } from './data/soknader';
import { sykmeldinger } from './data/sykmeldinger';
import { unleashToggles } from './data/toggles';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get('/login', '/sykepengesoknad');
mock.post('/syfounleash/', unleashToggles);
mock.get('/syfoapi/syfosoknad/api/soknader', soknader);
mock.get('/syforest/sykmeldinger', sykmeldinger);
