describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    it('Vi åpner opprettelse av søknad siden', function () {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')

        cy.findByRole('heading', { level: 1, name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).should('exist')
        cy.findByText('Du trenger ikke søke hvis du enten').should('exist')
        cy.findByRole('heading', { level: 2, name: 'Har du allerede vært på reise?' }).should('exist')
        cy.findByRole('heading', { level: 3, name: 'Er du statsborger i et land utenfor EU/EØS?' }).should('exist')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()

        // Havner på side 2 for søknad som er ny, og dermed ikke finnes i mock-api (gir 404)
        cy.url().should('include', `/2`)
        cy.intercept('GET', '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/', (req) => {
            req.reply(404)
        })
    })
})
