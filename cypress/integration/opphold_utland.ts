/* eslint-disable no-undef */

import { soknader } from '../../src/data/mock/data/soknader';
import { Soknad } from '../../src/types/types';
import { lyttTilNettverksKall } from './util/util';

describe('Tester søknad om å beholde sykepenger utenfor EØS', () => {

    const soknad = soknader.find((sok: Soknad) => sok.id === 'b9d67b0d-b1f8-44a5-bcbd-6010b60b90ce');

    before(() => {
        cy.visit('http://localhost:8080');
    });

    beforeEach(() => {
        cy.window().then((win) => {
            cy.spy(win, 'fetch').as('winFetch');
        });
    });

    afterEach(() => {
        cy.get('@winFetch').should((a: any) => {
            lyttTilNettverksKall(a);
        })
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

    it('ARBEIDSGIVER', function() {
        cy.url().should('include', `${soknad.id}/3`);


        cy.contains('Har du arbeidsgiver?');
        cy.contains('Nei').click({ force: true });

        cy.contains('Gå videre').click();
    });

    it('BEKRFEFT', function() {
        cy.url().should('include', `${soknad.id}/4`);


        cy.contains('Bekreft opplysninger');
        cy.contains('Før du reiser ber vi deg bekrefte');
        cy.contains('Jeg bekrefter de to punktene ovenfor').click({ force: true });

        cy.contains('Send søknaden').click();
    });

    it('Kvittering', function() {
        cy.url().should('include', `kvittering/${soknad.id}`);


        cy.contains('Søknaden er sendt til NAV');
    });

});
