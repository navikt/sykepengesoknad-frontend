/* eslint-disable no-undef */

import { soknader } from '../../src/data/mock/data/soknader';
import { Soknad } from '../../src/types/types';

describe('Tester søknad om å beholde sykepenger utenfor EØS', () => {

    const soknad = soknader.find((sok: Soknad) => sok.id === 'b9d67b0d-b1f8-44a5-bcbd-6010b60b90ce');

    before(() => {
        cy.visit('http://localhost:8080');
    });

    it('Laster startside', function() {
        cy.get('.soknadtopp__tittel').should('be.visible').and('have.text', 'Søknad om sykepenger');
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).should('include.text', 'Søknad om å beholde sykepenger utenfor EØS');
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click();
    });


    it('PERIODEUTLAND - steg 1', function() {
        cy.url().should('include', `${soknad.id}/1`);


        cy.contains('Opplysninger fra sykmeldingen').should('not.exist');
        cy.contains('Når skal du reise?');

        cy.get('.skjemaelement__input.form-control').focus();
        cy.get('.flatpickr-calendar').contains('17').click({ force: true });
        cy.get('.flatpickr-calendar').contains('24').click({ force: true });


        cy.contains('Gå videre').click();
    });

    it('LAND - steg 2', function() {
        cy.url().should('include', `${soknad.id}/2`);


        cy.contains('Hvilket land skal du reise til?');
        cy.contains('Syden').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('Vi svarer Ja på arbeidsgiverspørsmålet', function() {
        cy.url().should('include', `${soknad.id}/3`);
        cy.contains('Har du arbeidsgiver?');
        cy.get('#3_0').click({ force: true });
        cy.contains('Er du 100 % sykmeldt?');
    });

    it('Sykmeldt sporsmalet forsvinner når vi klikker nei', function() {
        cy.get('#3_1').click({ force: true });
        cy.contains('Er du 100 % sykmeldt?').should('not.exist');
        cy.get('#3_0').click({ force: true });
    });

    it('Gå videre forsvinner når man har avtalt ferie', function() {
        cy.contains('Har du avtalt med arbeidsgiveren din at du skal ha ferie i hele perioden?');
        cy.contains('Gå videre');

        cy.get('#5_0').click({ force: true });
        cy.contains('Gå videre').should('not.exist');
    });
});

