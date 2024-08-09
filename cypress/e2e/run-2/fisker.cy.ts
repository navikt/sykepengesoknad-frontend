describe('Tester søknad med fisker som arbeidssituasjon', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=fisker')
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })
})
