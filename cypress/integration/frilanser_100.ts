/* eslint-disable no-undef */

import { soknader } from '../../src/data/mock/data/soknader';
import { Soknad } from '../../src/types/types';

describe('Tester arbeidstakersøknad', () => {
    //-----
    // Sykmelding: baf4a9ab-cc9b-42af-bba3-67cd6ca06388, frilanser - 100%
    // Søknad: a8e40578-682b-4a04-bfda-b7768af2ae13, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = soknader.find((sok: Soknad) => sok.id === 'a8e40578-682b-4a04-bfda-b7768af2ae13');

    it('Laster startside', function() {
        cy.visit('http://localhost:8080/nysykepengesoknad');
        cy.get('.sidetopp__tittel').should('be.visible').and('have.text', 'Søknader om sykepenger');
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click();
    });


    it('Søknad ANSVARSERKLARING - steg 1', function() {
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


    it('Søknad TILBAKE_I_ARBEID - steg 2', function() {
        cy.url().should('include', `${soknad.id}/2`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når begynte du å jobbe igjen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('20').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad JOBBET_DU_100_PROSENT - steg 3', function() {
        cy.url().should('include', `${soknad.id}/3`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.');
        cy.get('.undersporsmal .skjemaelement__input#687432').focus().type('12');

        // Underspørsmål 2
        cy.contains('Hvor mye jobbet du totalt i 1. - 24. april 2020 som frilanser?');
        // Svarer prosent
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=prosent]').focus().click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input#687435').focus().type('21');

        cy.contains('Gå videre').click();
    });

    it('Søknad ANDRE_INNTEKTSKILDER - steg 4', function() {
        cy.url().should('include', `${soknad.id}/4`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke inntektskilder har du?');
        cy.get('.undersporsmal .checkboxgruppe label[for=687440]').should('include.text', 'arbeidsforhold');
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687440').click();
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687441_0').click();
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.');

        cy.contains('Gå videre').click();
    });

    it('Søknad UTLAND - steg 5', function() {
        cy.url().should('include', `${soknad.id}/5`);

        // Test spørsmål
        cy.contains('Har du vært utenfor EØS mens du var sykmeldt 1. - 24. april 2020?');
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Når var du utenfor EØS?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('17').click({ force: true });
        cy.get('.flatpickr-calendar').contains('24').click({ force: true });
        // Underspørsmål 2
        cy.contains('Har du søkt om å beholde sykepengene for disse dagene?');
        cy.get('.undersporsmal .radioContainer .radioknapp#687449_0').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad ARBEID_UTENFOR_NORGE - steg 6', function() {
        cy.url().should('include', `${soknad.id}/6`);

        // Test spørsmål
        cy.contains('Har du arbeidet i utlandet i løpet av de siste 12 månedene?');
        cy.get('.skjemaelement__label[for=687451_0]').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad UTDANNING - steg 7', function() {
        cy.url().should('include', `${soknad.id}/7`);

        // Test spørsmål
        cy.contains('Har du vært under utdanning i løpet av perioden 1. - 24. april 2020?')
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('10').click({ force: true });

        // Underspørsmål 2 - radio
        cy.contains('Er utdanningen et fulltidsstudium?');
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687454_0').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Søknad VAER_KLAR_OVER_AT - steg 8', function() {
        cy.url().should('include', `${soknad.id}/8`);
        cy.get('.skjemaelement__label').click({ force: true });
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.');

        cy.contains('Send søknaden').click();
    });

    // TODO: Sett opp test for kvittering når den er fastsatt
});
