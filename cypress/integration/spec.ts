/* eslint-disable no-undef */

describe('CRA', () => {
    it('shows learn link', function() {
        cy.visit('http://localhost:8080/nysykepengesoknad');
        cy.get('.sidetopp__tittel').should('be.visible').and('have.text', 'Søknader om sykepenger');
        cy.contains('Gjelder perioden 1. – 10. juni 2019').click();
        cy.url().should('include', '977ce8fc-a83a-4454-ab81-893ff0284437/1');
    })
})
