describe('CRA', () => {
    it('shows learn link', function() {
        // eslint-disable-next-line no-undef
        cy.visit('http://localhost:8080')
        // eslint-disable-next-line no-undef
        cy.get('.App-link').should('be.visible')
            .and('have.text', 'Learn React')
    })
})
