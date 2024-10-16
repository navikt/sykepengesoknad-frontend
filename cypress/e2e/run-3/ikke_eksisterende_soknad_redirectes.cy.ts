import * as uuid from 'uuid'

describe('Tester direktenavigering til søknad som ikke eksisterer', () => {
    it('Prøver å laste søknaden', function () {
        cy.visit('/syk/sykepengesoknad/soknader/' + uuid.v4())
    })

    it('Er på listevisninga', function () {
        cy.url().should('equal', Cypress.config().baseUrl + `/syk/sykepengesoknad`)
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })
})
