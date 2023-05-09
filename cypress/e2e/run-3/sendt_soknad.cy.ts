import { sendtArbeidsledig } from '../../../src/data/mock/data/soknader-integration'

describe('Tester sendt søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Sendt søknad har forventa tekst', function () {
        cy.get(`[data-cy="link-listevisning-${sendtArbeidsledig.id}"]`)
            .should('include.text', '27. mai – 11. juni 2020')
            .should('include.text', 'Sendt til NAV')
    })

    it('Ved klikk så åpnes kvittering søknad visning', function () {
        cy.get(`[data-cy="link-listevisning-${sendtArbeidsledig.id}"]`).click()
        cy.url().should(
            'equal',
            Cypress.config().baseUrl + `/syk/sykepengesoknad/sendt/${sendtArbeidsledig.id}?testperson=alle-soknader`,
        )
        cy.contains('Søknaden er sendt til NAV')
    })

    it('Siden kan refreshes', function () {
        cy.visit(`/syk/sykepengesoknad/sendt/${sendtArbeidsledig.id}?testperson=alle-soknader`)
        cy.contains('Søknaden er sendt til NAV')
        cy.reload()
        cy.contains('Søknaden er sendt til NAV')
        cy.url().should(
            'equal',
            Cypress.config().baseUrl + `/syk/sykepengesoknad/sendt/${sendtArbeidsledig.id}?testperson=alle-soknader`,
        )
    })
})
