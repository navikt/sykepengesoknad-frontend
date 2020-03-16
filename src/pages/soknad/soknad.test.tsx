import React from 'react';
import { render } from '@testing-library/react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import Soknaden from './soknaden';
import { TestProvider } from '../../test-provider';
import '@testing-library/jest-dom/extend-expect';

describe('<Soknaden />', () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    beforeEach(() => {
        spy = new SpyMiddleware();
        mock = FetchMock.configure({
            middleware: spy.middleware
        });
        expect(spy.size()).toBe(0);
    });

    afterEach(() => {
        mock.restore();
    });

    test('Rendrer side', () => {
        const { container } = render(
            <TestProvider path="/soknader/2d1b9ab0-fa76-4738-9e07-3a684d141628/1">
                <Soknaden />
            </TestProvider>
        );

        console.log('container', container.outerHTML); // eslint-disable-line
    });
});
