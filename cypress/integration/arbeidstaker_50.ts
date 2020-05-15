/* eslint-disable no-undef */

import { soknader } from '../../src/data/mock/data/soknader';
import { Soknad } from '../../src/types/types';

describe('Tester arbeidstakersøknad - gradert 50%', () => {
    //-----
    // Sykmelding: ee4540e3-eba6-46cb-b90f-05747ddb1537, arbeidstaker - 50%
    // Søknad: 5b769c04-e171-47c9-b79b-23ab8fce331e, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = soknader.find((sok: Soknad) => sok.id === '5b769c04-e171-47c9-b79b-23ab8fce331e');

    it('Laster startside', function() {
        cy.visit('http://localhost:8080/nysykepengesoknad');
        cy.get('.sidetopp__tittel').should('be.visible').and('have.text', 'Søknader om sykepenger');
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click();
    })


    it('Søknad ANSVARSERKLARING - steg 1', function() {
        cy.url().should('include', `${soknad.id}/1`);

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager');
        cy.contains('LOMMEN BARNEHAVE');
        cy.contains('Opplysninger fra sykmeldingen').click();

        // Må godkjenne ANSVARSERKLARING først
        cy.contains('Gå videre').click();
        cy.contains('Det er 1 feil i skjemaet');
        cy.contains('Du må bekrefte dette før du går videre');
        cy.get('.skjemaelement__label').click({ force: true });

        cy.contains('Gå videre').click();
    })


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
    })


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
    })


    it('Søknad EGENMELDINGER - steg 4', function() {
        cy.url().should('include', `${soknad.id}/4`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input#687298').click();

        cy.contains('Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 1. april 2020.');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('11').click({ force: true });
        cy.get('.flatpickr-calendar').contains('22').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad TILBAKE_I_ARBEID - steg 5', function() {
        cy.url().should('include', `${soknad.id}/5`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når begynte du å jobbe igjen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('20').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad FERIE_V2 - steg 6', function() {
        cy.url().should('include', `${soknad.id}/6`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når tok du ut ferie?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('16').click({ force: true });
        cy.get('.flatpickr-calendar').contains('23').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad PERMISJON_V2 - steg 7', function() {
        cy.url().should('include', `${soknad.id}/7`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når tok du permisjon?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('14').click({ force: true });
        cy.get('.flatpickr-calendar').contains('22').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad UTLAND_V2 - steg 8', function() {
        cy.url().should('include', `${soknad.id}/8`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });
        cy.contains('Når var du utenfor EØS?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('14').click({ force: true });
        cy.get('.flatpickr-calendar').contains('22').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad ARBEID_UTENFOR_NORGE - steg 9', function() {
        cy.url().should('include', `${soknad.id}/9`);

        // Test spørsmål
        cy.contains('Har du arbeidet i utlandet i løpet av de siste 12 månedene?');
        cy.get('.skjemaelement__label[for=687310_0]').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad JOBBET_DU_GRADERT - steg 10', function() {
        cy.url().should('include', `${soknad.id}/10`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.');
        cy.get('.undersporsmal .skjemaelement__input#687312').focus().type('12');

        // Underspørsmål 2
        cy.contains('Hvor mye jobbet du totalt 1. - 24. april 2020 hos POSTEN NORGE AS, BÆRUM?');
        // Svarer prosent
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=prosent]').focus().click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input#687315').focus().type('21');
        // Svarer timer
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=timer]').focus().click({ force: true });
        cy.get('.undersporsmal .skjemaelement__input#687317').focus().type('21');

        cy.contains('Gå videre').click();
    })


    it('Søknad ANDRE_INNTEKTSKILDER - steg 11', function() {
        cy.url().should('include', `${soknad.id}/11`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?');
        cy.get('.undersporsmal .checkboxgruppe label[for=687320]').should('include.text', 'andre arbeidsforhold');
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687320').click();
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687321_0').click();
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.')

        // Svarer NEI
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?');
        cy.get('.undersporsmal .checkboxgruppe label[for=687322]').should('include.text', 'selvstendig næringsdrivende');
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687322').click();
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687323_1').click();

        cy.contains('Gå videre').click();
    })

    it('Søknad UTDANNING - steg 12', function() {
        cy.url().should('include', `${soknad.id}/12`);

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true });

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?');
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('10').click({ force: true });

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?');
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687333_0').click({ force: true });

        cy.contains('Gå videre').click();
    })


    it('Søknad ANSVARSERKLARING - steg 13', function() {
        cy.url().should('include', `${soknad.id}/13`);
        cy.get('.skjemaelement__label').click({ force: true });
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.');

        cy.contains('Send søknaden').click();
    })
})
