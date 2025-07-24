describe('Placeholder test', () => {
    it('should always pass', () => {
        cy.visit('/syk/sykepengesoknad')
        cy.get('h1').should('exist')
    })
})
