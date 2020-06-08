/* eslint-disable no-undef */

import { soknaderOpplaering as soknader } from '../../src/data/mock/data/soknader-opplaering';
import { Soknad } from '../../src/types/types';

describe('Tester arbeidsledigsøknad', () => {
    //-----
    // Sykmelding: 470c9e25-e112-4060-be61-7a24af530889, arbeidsledig - 100%
    // Søknad: 934f39f4-cb47-459f-8209-0dbef6d36059, fom: 1.4.20, tom: 24.4.20
    //-----

    const soknad = soknader.find((sok: Soknad) => sok.id === '934f39f4-cb47-459f-8209-0dbef6d36059');

    before(() => {
        cy.visit('http://localhost:8080');
    });

    it('Laster startside', () => {
        cy.get('.soknadtopp__tittel').should('be.visible').and('have.text', 'Søknad om sykepenger');
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click();
    });

    it('Søknad ANSVARSERKLARING - steg 1', () => {
        cy.url().should('include', `${soknad.id}/1`);

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager');
        cy.contains('LOMMEN BARNEHAVE');
        cy.contains('Opplysninger fra sykmeldingen').click();

        // Godkjenne ANSVARSERKLARING
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
            .click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad PERMITTERT_NAA - steg 2', () => {
        cy.url().should('include', `${soknad.id}/2`);

        // Sjekk at sykmelding er minimert
        cy.get('.sykmelding-perioder').should('not.be.visible');

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Velg første dag i permitteringen');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('20').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad PERMITTERT_PERIODE - steg 3', () => {
        cy.url().should('include', `${soknad.id}/3`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('17').click({ force: true });
        cy.get('.flatpickr-calendar').contains('24').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad FRISKMELDT - steg 4', () => {
        cy.url().should('include', `${soknad.id}/4`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true });
        cy.contains('Fra hvilken dato har du ikke lenger behov for sykmelding?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('20').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad ANDRE_INNTEKTSKILDER - steg 5', () => {
        cy.url().should('include', `${soknad.id}/5`);

        // Test spørsmål
        cy.contains('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020? Du trenger ikke oppgi penger fra NAV.');
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke inntektskilder har du hatt?');
        cy.get('.undersporsmal .checkboxgruppe label[for=687404]').should('include.text', 'andre arbeidsforhold');
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687404').click({ force: true });
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687405_0').click({ force: true });
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.');

        cy.contains('Gå videre').click();
    });

    it('Søknad UTDANNING - steg 6', () => {
        cy.url().should('include', `${soknad.id}/6`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('10').click({ force: true });

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?');
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687421_0').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad ARBEIDSLEDIG_UTLAND - steg 7', () => {
        cy.url().should('include', `${soknad.id}/7`);

        // Test spørsmål
        cy.contains('Var du på reise utenfor EØS mens du var sykmeldt 1. - 24. april 2020?');
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Når var du utenfor EØS?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('17').click({ force: true });
        cy.get('.flatpickr-calendar').contains('24').click({ force: true });

        // Underspørsmål 2
        cy.contains('Har du søkt om å beholde sykepengene for disse dagene?');
        cy.get('.skjemaelement__label[for=687424_0]').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad VAER_KLAR_OVER_AT - steg 8', () => {
        cy.url().should('include', `${soknad.id}/8`);
        cy.get('.skjemaelement__label').click({ force: true });
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.');

        cy.contains('Send søknaden').click();
    });

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`);
        // TODO: Fix bug der denne ikke vises
        // cy.contains('Søknaden er sendt til NAV');

        // Kvittering
        cy.contains('Hva skjer videre?')
        cy.contains('NAV behandler søknaden din').should('be.visible')
        cy.contains('Når blir pengene utbetalt?').should('be.visible')
        cy.contains('Viktig for arbeidstaker').should('be.visible')
        cy.contains('Viktig for selvstendige næringsdrivende og frilansere').should('be.visible')

        // Kvittering minimert
        cy.contains('Hva skjer videre?').click({ force: true });
        cy.contains('NAV behandler søknaden din').should('not.be.visible')

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager').should('not.be.visible')
        cy.contains('Opplysninger fra sykmeldingen').click({ force: true });
        cy.contains('1. april - 24. april 2020 • 24 dager').should('be.visible')

        // Oppsummering
        cy.contains('Oppsummering').click({ force: true });
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.')
    });
});
