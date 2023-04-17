import { sendtArbeidsledig } from '../../../src/data/mock/data/soknader-integration'

describe('Tester sendt søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('Sendt søknad har forventa tekst', function () {
        cy.get(`#soknader-sendt article[aria-labelledby*=${sendtArbeidsledig.id}]`)
            .should('include.text', '27. mai – 11. juni 2020')
            .should('include.text', 'Sendt til NAV')
    })

    it('Ved klikk så åpnes kvittering søknad visning', function () {
        cy.get(`#soknader-sendt article[aria-labelledby*=${sendtArbeidsledig.id}]`).click()
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
