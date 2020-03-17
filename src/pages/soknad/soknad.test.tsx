import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
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

    test('Viser alle søknader', async () => {
        const path = '/';
        const { getByText, container } = render(
            <TestProvider path={path} />
        );
        // Feiler hvis de ikke finnes
        getByText('Gjelder perioden 27. februar – 5. mars 2020');
        const tekst = screen.queryByText('Gjelder perioden 27. februar – 5. mars 2020');
        const leftClick = {button: 0};
        fireEvent.click(tekst, leftClick);
        console.log('resultat', container.innerHTML);
        expect(tekst).toBeInTheDocument;
    });
    test('Viser søknad sendt', () => {
        const path = '/soknader/297d453e-46d5-4a52-8451-229f4b20f61c/1';
        const { getByText, container } = render(
            <TestProvider path={path} />
        );
        // Feiler hvis de ikke finnes
        getByText('Endre søknad');
        getByText('Send til NAV');
        getByText('Send til arbeidsgiver');
    });
});
