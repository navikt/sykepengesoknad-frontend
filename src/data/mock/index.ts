import FetchMock, {MiddlewareUtils} from 'yet-another-fetch-mock';
import {soknader} from './data/soknader-felles';
import {sykmeldinger} from './data/sykmeldinger-felles';
import {unleashToggles} from './data/toggles';
import {DECORATOR_URL} from '../../utils/constants';
import {DecoratorHtml} from './data/decorator-html';
import environment from "../../environment/environment";

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get(DECORATOR_URL, DecoratorHtml);
mock.get('/login', '/sykepengesoknad');
mock.post(`${environment.unleashRoot}/syfounleash`, unleashToggles);
mock.get(`${environment.syfoapiRoot}/syfosoknad/api/soknader`, soknader);
mock.get(`${environment.syforestRoot}/sykmeldinger`, sykmeldinger);
