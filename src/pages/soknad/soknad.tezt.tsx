import React from 'react';
import { render, screen } from '@testing-library/react';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { TestProvider } from '../../test-provider';
import '@testing-library/jest-dom/extend-expect';
import tekster from '../../components/soknaden/status/status-panel-tekster';
import env from '../../utils/environment';
import userEvent  from '@testing-library/user-event';

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

    test('Viser alle søknader', async() => {
        const path = '/';
        render(<TestProvider path={path} />);

        expect(screen.getByText('Gjelder perioden 27. februar – 5. mars 2020')).toBeInTheDocument();
    });

    test('Viser søknad sendt', async() => {
        const path = '/soknader/297d453e-46d5-4a52-8451-229f4b20f61c/1';
        render(<TestProvider path={path} />);

        screen.getByText('Endre søknad');
        screen.getByText('Send til NAV');
        screen.getByText('Send til arbeidsgiver');
    });

    test('Kan ettersende til NAV', async() => {
        mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:id/ettersendTilNav`,{});
        const path = '/soknader/297d453e-46d5-4a52-8451-229f4b20f61c/1';
        const ettersendKnapp = tekster[ 'statuspanel.knapp.send-nav' ];
        const bekreftTittel = tekster[ 'statuspanel.tittel.send-til-nav-ettersending' ];
        const bekreftKnapp = tekster[ 'statuspanel.knapp.bekreft.send-til-nav-ettersending' ];

        render(<TestProvider path={path} />);

        userEvent.click(screen.getByText(ettersendKnapp));

        expect(screen.getByText(bekreftTittel)).toBeInTheDocument();

        userEvent.click(screen.getByText(bekreftKnapp));

        const vinduBorte = screen.queryByText(bekreftTittel);
        expect(vinduBorte).toBeFalsy();
    });

    test('Kan ettersende til Arbeidsgiver', async() => {
        mock.post(`${env.syfoapiRoot}/syfosoknad/api/soknader/:id/ettersendTilArbeidsgiver`,{});
        const path = '/soknader/297d453e-46d5-4a52-8451-229f4b20f61c/1';
        const ettersendKnapp = tekster[ 'statuspanel.knapp.send-arbeidsgiver' ];
        const bekreftTittel = tekster[ 'statuspanel.tittel.send-til-arbeidsgiver-ettersending' ];
        const bekreftKnapp = tekster[ 'statuspanel.knapp.bekreft.send-til-arbeidsgiver-ettersending' ];

        render(<TestProvider path={path} />);

        userEvent.click(screen.getByText(ettersendKnapp));

        expect(screen.getByText(bekreftTittel)).toBeInTheDocument();

        userEvent.click(screen.getByText(bekreftKnapp));

        const vinduBorte = screen.queryByText(bekreftTittel);
        expect(vinduBorte).toBeFalsy();
    });

    test('Kan avbryte ettersending', async() => {
        const path = '/soknader/297d453e-46d5-4a52-8451-229f4b20f61c/1';
        const ettersendKnapp = tekster[ 'statuspanel.knapp.send-arbeidsgiver' ];
        const bekreftTittel = tekster[ 'statuspanel.tittel.send-til-arbeidsgiver-ettersending' ];
        const angreKnapp = tekster[ 'statuspanel.knapp.angre' ];

        render(<TestProvider path={path} />);

        userEvent.click(screen.getByText(ettersendKnapp));
        expect(screen.getByText(bekreftTittel)).toBeInTheDocument();

        userEvent.click(screen.getByText(angreKnapp));
        expect(screen.queryByText(bekreftTittel)).toBeFalsy();

        userEvent.click(screen.getByText(ettersendKnapp));
        expect(screen.getByText(bekreftTittel)).toBeInTheDocument();

        userEvent.click(screen.getAllByRole('button').find((button) => button.className.includes('lukkknapp')));
        expect(screen.queryByText(bekreftTittel)).toBeFalsy();
    });
});
