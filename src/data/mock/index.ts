import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { soknader } from './data/soknader-felles';
import { sykmeldinger } from './data/sykmeldinger-felles';
import { unleashToggles } from './data/toggles';
import { SYFO_API_SOKNADER, DECORATOR_URL } from '../../utils/constants';
import { DecoratorHtml } from './data/decorator-html';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get(DECORATOR_URL, DecoratorHtml);
mock.get('/login', '/sykepengesoknad');
mock.post('/syfounleash/', unleashToggles);
mock.get(SYFO_API_SOKNADER, soknader);
mock.get('/syforest/sykmeldinger', sykmeldinger);
