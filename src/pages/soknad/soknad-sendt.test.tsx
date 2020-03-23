import React from 'react';
import { render } from '@testing-library/react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { TestProvider } from '../../test-provider';
import '@testing-library/jest-dom/extend-expect';

describe('<Soknaden /> som er sendt', () => {
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

    test('Viser søknad sendt', () => {
        const { getByText } = render(
            <TestProvider path={'/soknader/297d453e-46d5-4a52-8451-229f4b20f61c/1'} />
        );
        // Feiler hvis de ikke finnes
        /*
                getByText('Endre søknad');
                getByText('Send til NAV');
                getByText('Send til arbeidsgiver');
        */
    });
});
