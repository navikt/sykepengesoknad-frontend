import { sendtArbeidsledigKvittering } from '../../../src/data/mock/data/soknader-integration'

describe('Tester endring uten en endringer', () => {
    const soknad = sendtArbeidsledigKvittering

    before(() => {
        cy.visit(`/syk/sykepengesoknad/sendt/${soknad.id}?testperson=alle-soknader`)
    })

    it('Jeg vil endre svarene i søknaden', () => {
        // Endre søknaden
        cy.contains('Jeg vil endre svarene i søknaden').click()
        cy.contains('Ok').click()

        // Ny søknad
        cy.url().should('not.include', `/sendt/${soknad.id}`)
        cy.url().should('include', '/1')
    })

    it('Svarer det samme søknaden', function () {
        cy.contains('kan være straffbart').click()
        cy.contains('Gå videre').click()

        cy.url().should('include', '/2')
        cy.contains('Gå videre').click()

        cy.contains('Avslutt uten å endre søknaden')
        cy.contains('Jeg vil ikke bruke denne søknaden').should('not.exist')

        cy.url().should('include', '/3')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/4')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/5')
        cy.contains('Gå videre').click()
    })

    it('Vi ser en popup og lander på listevisninga', function () {
        cy.url().should('include', '/6')
        cy.get('.navds-checkbox__label').click()
        cy.contains('Send endringene').click()

        cy.get('.navds-modal__content').contains('Du har ikke gjort noen endringer')
        cy.contains('Vi behandler den opprinnelige sykepengesøknaden din.')

        cy.contains('OK').click()

        cy.log(`url er: ${Cypress.config().baseUrl}`)

        cy.url().should('equal', Cypress.config().baseUrl + '/syk/sykepengesoknad')
    })
})
