import React from 'react';
import { render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import Soknader from './soknader';
import { TestProvider } from '../../test-provider';
import '@testing-library/jest-dom/extend-expect';

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

    test('Rendrer side', () => {
        const { container } = render(
            <TestProvider>
                <Soknader />
            </TestProvider>
        );

        expect(screen.getAllByText('Søknader om sykepenger'));

        const elm: TargetElement = container.querySelector('a.inngangspanel[href*="710acaea-abef-4e6f-be83-bd9e0c3c1e3a"]');
        expect(elm).toBeInTheDocument();
    });
});
