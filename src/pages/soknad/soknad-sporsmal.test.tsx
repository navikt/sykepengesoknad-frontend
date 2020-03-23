import React from 'react';
import { render, fireEvent, act, waitForElement } from '@testing-library/react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from '../../test-provider';
import 'mutationobserver-shim';

describe('<Soknaden /> ansvarserklæring', () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;
    const soknadsId = '977ce8fc-a83a-4454-ab81-893ff0284437';
    const stegId = '1';
    const path = `/soknader/${soknadsId}/${stegId}`;

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

    test('Viser ansvarserklæringsspørsmal', () => {
        const { container } = render(<TestProvider path={path} />);
        const label = container.querySelector('.skjemaelement__label[for="631386"]');
        expect(label).toBeInTheDocument();
        expect(label.textContent.startsWith('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg'));
    });

    test('Sykmeldingsinfo er ekspandert', () => {
        const { container } = render(<TestProvider path={path} />);
        const apen = container.querySelector('.utvidbar.ekspander.apen');
        expect(apen).toBeInTheDocument();
        const bjorn = apen.querySelector('.hjelpeboble__boble.hjelpeboble__boble--horisontal p.typo-normal');
        expect(bjorn.textContent.startsWith('Sykmeldingen din er lang, derfor er den delt opp i flere søknader om sykepenger'));
    });

    test('Ansvarserklæringen må aksepteres', async() => {
        const { container } = render(<TestProvider path={path} />);
        const knapp = container.querySelector('.knapperad .knapp--hoved');
        expect(knapp).toBeInTheDocument();
        await act(async() => {
            fireEvent.click(knapp);
        });
        const node = await waitForElement(() => {
            return container.querySelector('.skjemaelement__feilmelding');
        });
        console.log('node', node.innerHTML); // eslint-disable-line
        expect(node).toBeInTheDocument();
    });
});
