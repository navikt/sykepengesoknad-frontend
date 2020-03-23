import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from '../../../test-provider';
import 'mutationobserver-shim';
import userEvent from '@testing-library/user-event';
import tekster from '../../../pages/soknad/soknaden-tekster';

describe('<Oppsummering />', () => {
    test('Oppsummering laster alle spørsmål', async() => {
        const path = '/soknader/test-NY-med-svar/11';
        const tilSluttTekst = tekster['sykepengesoknad.til-slutt.tittel'];
        const oppsummeringListe = tekster['sykepengesoknad.oppsummering.tittel'];
        const feilISkjemaet = 'Det er 1 feil i skjemaet';
        const godkjenn = 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.';

        render(<TestProvider path={path} />);

        screen.getByText(tilSluttTekst);
        userEvent.click(screen.getByText(oppsummeringListe));

        const utland = screen.getByText('Har du arbeidet i utlandet i løpet av de siste 12 månedene?');
        utland.closest('Nei');

        userEvent.click(screen.getByText('Send søknaden'));

        await waitForElement(() => {
            return screen.getByText(feilISkjemaet)
        });

        userEvent.click(screen.getByText(godkjenn));

        const sendKnapp = await waitForElement(() => {
            return screen.getByText('Send søknaden');
        });

        expect(screen.queryByText(feilISkjemaet)).toBeFalsy();
        userEvent.click(sendKnapp);

        await waitForElement(() => {
            return screen.getAllByText('Kvittering');
        });
    });
});
