import { sendtArbeidsledigKvittering } from '../../../src/data/mock/data/soknad/soknader-integration'

describe('Tester endring uten en endringer', () => {
    const soknad = sendtArbeidsledigKvittering

    before(() => {
        cy.visit(`/syk/sykepengesoknad/sendt/${soknad.id}?testperson=integrasjon-soknader`)
    })

    it('Jeg vil endre svarene i søknaden', () => {
        // Endre søknaden
        cy.contains('Jeg vil endre svarene i søknaden').click()
        cy.findByRole('button', { name: 'Ok' }).click()

        // Ny søknad
        cy.url().should('not.include', `/sendt/${soknad.id}`)
        cy.url().should('include', '/1')
    })

    it('Svarer det samme søknaden', function () {
        cy.contains('kan være straffbart').click()
        cy.contains('Gå videre').click()
        cy.contains('Friskmeldt')

        cy.contains('Gå videre').click()
        cy.contains('Andre inntektskilder')

        cy.contains('Avslutt uten å endre søknaden')
        cy.contains('Jeg har ikke behov for denne søknaden').should('not.exist')

        cy.contains('Gå videre').click()
        cy.contains('Var du på reise utenfor EU/EØS')

        cy.contains('Gå videre').click()
        cy.contains('Arbeid utenfor Norge')

        cy.contains('Gå videre').click()
        cy.contains('Oppsummering')
    })

    it('Vi ser en popup og lander på listevisninga', function () {
        cy.url().should('include', '/6')
        cy.get('.navds-checkbox__label').click()
        cy.contains('Send endringene').click()

        cy.get('.navds-modal').contains('Du har ikke gjort noen endringer')
        cy.contains('Vi behandler den opprinnelige sykepengesøknaden din.')

        cy.findByRole('button', { name: 'Ok' }).click()

        cy.url().should('equal', Cypress.config().baseUrl + '/syk/sykepengesoknad')
    })
})
