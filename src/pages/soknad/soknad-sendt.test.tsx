import React from 'react';
import { render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
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

    test('Rendrer side', () => {
        const { container } = render(<TestProvider path="/" />);
        expect(screen.getAllByText('Søknader om sykepenger')).toBeTruthy();

        const inngangspanel = 'a.inngangspanel[href*="977ce8fc-a83a-4454-ab81-893ff0284437"]';
        const elm: TargetElement = container.querySelector(inngangspanel);
        expect(elm).toBeInTheDocument();
    });
});
