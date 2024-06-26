describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    it('Søknad ANSVARSERKLARING - steg 1', function () {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')

        // Check for main elements using React Testing Library selectors
        cy.findByRole('heading', { level: 1, name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).should('exist')
        cy.findByText('Du trenger ikke søke hvis du enten').should('exist')
        cy.findByRole('heading', { level: 2, name: 'Har du allerede vært på reise?' }).should('exist')
        cy.findByRole('heading', { level: 3, name: 'Er du statsborger i et land utenfor EU/EØS?' }).should('exist')
        cy.findByRole('button', { name: 'Fortsett til søknaden' }).should('exist').click()
    })
})
