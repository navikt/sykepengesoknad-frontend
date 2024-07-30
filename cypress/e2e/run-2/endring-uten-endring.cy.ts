import { sendtArbeidsledigKvittering } from '../../../src/data/mock/data/soknad/soknader-integration'
import { klikkGaVidere } from '../../support/utilities'

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
        cy.contains('Jeg vil svare så godt jeg kan på spørsmålene i søknaden.').click()
        cy.contains('Start søknad').click()
        cy.contains('Friskmeldt')

        klikkGaVidere()
        cy.contains('Andre inntektskilder')

        cy.contains('Avslutt uten å endre søknaden')
        cy.contains('Jeg har ikke behov for denne søknaden').should('not.exist')

        klikkGaVidere()
        cy.contains('Var du på reise utenfor EU/EØS')

        klikkGaVidere()
        cy.contains('Arbeid utenfor Norge')

        klikkGaVidere()
        cy.contains('Oppsummering fra søknaden')
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
