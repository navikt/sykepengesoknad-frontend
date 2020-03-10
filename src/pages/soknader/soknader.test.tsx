import React from 'react';
import { render, screen } from '@testing-library/react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import Soknader from './soknader';
import StoreProvider from '../../data/stores/store-provider';
import TestProvider from '../../test-provider';
import { MemoryRouter } from 'react-router-dom';

describe('<Soknader/>', () => {
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

    it('Rendrer app', () => {
        const { container } = render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <StoreProvider>
                    <TestProvider>
                        <Soknader />
                    </TestProvider>
                </StoreProvider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Søknader om sykepenger'));
        container.querySelectorAll('.inngangspanel');

        console.log('container', container.querySelectorAll('.inngangspanel')[0].outerHTML); // eslint-disable-line
    });
});
