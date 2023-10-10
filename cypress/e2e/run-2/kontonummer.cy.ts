import { checkViStolerPåDeg, svarCheckboxPanel } from '../../support/utilities'

describe('Tester kontonummer i kvittering', () => {
    it('Har kontonumer', () => {
        cy.visit('/syk/sykepengesoknad?testperson=har-kontonummer')
        cy.get('a[data-cy^="link-listevisning"]').first().click()
        besvarSoknad()
        cy.location('pathname').should('include', `/kvittering/`)
        cy.url().should('include', `/kvittering/`)
        cy.contains('Kontonummer for utbetaling')
        cy.get('[data-cy="kontonummer"]')
            .should('contain', '1234 00 12345')
            .and(
                'contain',
                'Dersom du vil benytte et annet kontonummer for utbetaling fra NAV, kan du endre det på Min side',
            )
    })

    it('Har ikke kontonumer', () => {
        cy.visit('/syk/sykepengesoknad?testperson=har-ikke-kontonummer')
        cy.get('a[data-cy^="link-listevisning"]').first().click()
        besvarSoknad()
        cy.url().should('include', `/kvittering/`)
        cy.contains('Kontonummer for utbetaling')
        cy.get('[data-cy="kontonummer"]').should(
            'contain',
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side',
        )
    })
})

const besvarSoknad = () => {
    checkViStolerPåDeg()
    cy.contains('Send søknaden')
    svarCheckboxPanel()
    cy.contains('Send søknaden').click()
}

export {}
