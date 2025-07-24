describe('Placeholder test', () => {
    it('should always pass', () => {
        cy.visit('/syk/sykepenger')
        cy.get('h1').should('exist')
    })
})
