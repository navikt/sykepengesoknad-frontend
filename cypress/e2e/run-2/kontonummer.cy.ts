describe('Tester kontonummer i kvittering', () => {
    it('Har kontonumer', () => {
        cy.visit('/syk/sykepengesoknad?testperson=har%20kontonummer')
        cy.get(`#soknader-list-til-behandling article a`).click({
            force: true,
        })
        besvarSoknad()
        cy.location('pathname').should('include', `/kvittering/`)
        cy.url().should('include', `/kvittering/`)
        cy.contains('Kontonummer for utbetaling')
        cy.get('.kontonummer')
            .should('contain', '1234 00 12345')
            .and(
                'contain',
                'Dersom du vil benytte et annet kontonummer for utbetaling fra NAV, kan du endre det på Min side',
            )
    })

    it('Har ikke kontonumer', () => {
        cy.visit('/syk/sykepengesoknad?testperson=har%20ikke%20kontonummer')

        cy.get(`#soknader-list-til-behandling article a`).click({
            force: true,
        })
        besvarSoknad()
        cy.url().should('include', `/kvittering/`)
        cy.contains('Kontonummer for utbetaling')
        cy.get('.kontonummer').should(
            'contain',
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side',
        )
    })
})

const besvarSoknad = () => {
    cy.contains(
        'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
    ).click({ force: true })
    cy.contains('Gå videre').click({ force: true })
    cy.get('.navds-checkbox__label').click({ force: true })
    cy.contains('Send søknaden').click({ force: true })
}
