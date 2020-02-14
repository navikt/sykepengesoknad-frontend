import FetchMock, {MiddlewareUtils} from 'yet-another-fetch-mock';
import {soknader} from './data/soknader-felles';
import {sykmeldinger} from './data/sykmeldinger-felles';
import {unleashToggles} from './data/toggles';
import {DECORATOR_URL} from '../../utils/constants';
import {DecoratorHtml} from './data/decorator-html';
import env from '../../utils/environment';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get(DECORATOR_URL, DecoratorHtml);
mock.get('/login', '/sykepengesoknad');
mock.post(env.unleashUrl, unleashToggles);
mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`, soknader);
mock.get(`${env.syforestRoot}/sykmeldinger`, sykmeldinger);
