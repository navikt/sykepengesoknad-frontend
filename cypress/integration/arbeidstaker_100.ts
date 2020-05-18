/* eslint-disable no-undef */

import { soknader } from '../../src/data/mock/data/soknader';
import { Soknad } from '../../src/types/types';

describe('Tester arbeidstakersøknad', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = soknader.find((sok: Soknad) => sok.id === 'faba11f5-c4f2-4647-8c8a-58b28ce2f3ef');

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

        // Avbryt dialog vises
        cy.contains('Jeg ønsker ikke å bruke denne søknaden').click();
        cy.get('.avbrytDialog__dialog button.lenke:contains(Angre)').click();
        cy.get('.avbrytDialog__dialog button.lenke:contains(Angre)').should('not.be.visible');

        // Må godkjenne ANSVARSERKLARING først
        cy.contains('Gå videre').click();
        cy.contains('Det er 1 feil i skjemaet');
        cy.contains('Du må bekrefte dette før du går videre');
        cy.get('.skjemaelement__label').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad PERMITTERT_NAA - steg 2', function() {
        cy.url().should('include', `${soknad.id}/2`);

        // Sjekk at sykmelding er minimert
        cy.get('.sykmelding-perioder').should('not.be.visible');

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Velg første dag i permitteringen');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('20').click({ force: true });

        // Gå til neste, så tilbake å svar nei
        cy.contains('Gå videre').click();
        cy.url().should('include', `${soknad.id}/3`);
        cy.contains('Tilbake').click();
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad PERMITTERT_PERIODE - steg 3', function() {
        cy.url().should('include', `${soknad.id}/3`);

        // Må velge ja/nei
        cy.contains('Gå videre').click();
        cy.contains('Du må svare på om du har vært permittert');

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('17').click({ force: true });
        cy.get('.flatpickr-calendar').contains('24').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad TILBAKE_I_ARBEID - steg 4', function() {
        cy.url().should('include', `${soknad.id}/4`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når begynte du å jobbe igjen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('20').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad FERIE_V2 - steg 5', function() {
        cy.url().should('include', `${soknad.id}/5`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når tok du ut ferie?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('16').click({ force: true });
        cy.get('.flatpickr-calendar').contains('23').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad PERMISJON_V2 - steg 6', function() {
        cy.url().should('include', `${soknad.id}/6`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når tok du permisjon?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('14').click({ force: true });
        cy.get('.flatpickr-calendar').contains('22').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad UTLAND_V2 - steg 7', function() {
        cy.url().should('include', `${soknad.id}/7`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når var du utenfor EØS?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('14').click({ force: true });
        cy.get('.flatpickr-calendar').contains('22').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad JOBBET_DU_100_PROSENT - steg 8', function() {
        cy.url().should('include', `${soknad.id}/8`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.');
        cy.get('.undersporsmal .skjemaelement__input#687350').focus().type('12');

        // Underspørsmål 2
        cy.contains('Hvor mye jobbet du totalt 1. - 24. april 2020 hos POSTEN NORGE AS, BÆRUM?');
        // Svarer prosent
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=prosent]').focus().click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input#687353').focus().type('21');
        // Svarer timer
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=timer]').focus().click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input#687355').focus().type('21');

        cy.contains('Gå videre').click();
    });


    it('Søknad ANDRE_INNTEKTSKILDER - steg 9', function() {
        cy.url().should('include', `${soknad.id}/9`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?');
        cy.get('.undersporsmal .checkboxgruppe label[for=687358]').should('include.text', 'andre arbeidsforhold');
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687358').click();
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687359_0').click();
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.');

        // Svarer NEI
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?');
        cy.get('.undersporsmal .checkboxgruppe label[for=687360]').should('include.text', 'selvstendig næringsdrivende');
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687360').click();
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687361_1').click();

        cy.contains('Gå videre').click();
    });

    it('Søknad UTDANNING - steg 10', function() {
        cy.url().should('include', `${soknad.id}/10`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('10').click({ force: true });

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?');
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687371_0').click({ force: true });

        cy.contains('Gå videre').click();
    });


    it('Søknad ANSVARSERKLARING - steg 11', function() {
        cy.url().should('include', `${soknad.id}/11`);
        cy.get('.skjemaelement__label').click({ force: true });
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.');

        cy.contains('Send søknaden').click();
    })

    // TODO: Sett opp test for kvittering når den er fastsatt
});
