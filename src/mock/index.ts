import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { ledetekster } from './data/ledetekster';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get('/syfotekster/api/tekster', ledetekster);
