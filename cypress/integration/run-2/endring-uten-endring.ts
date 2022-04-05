import { sendtArbeidsledigKvittering } from '../../../src/data/mock/data/soknader-integration'

describe('Tester endring uten en endringer', () => {

    const soknad = sendtArbeidsledigKvittering

    before(() => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/kvittering/${soknad.id}`)
    })


    it('Endre søknaden', () => {
        // Endre søknaden
        cy.contains('Endre søknaden').click()

        // Ny søknad
        cy.url().should('not.include', `/kvittering/${soknad.id}`)
        cy.url().should('include', '/1')
        cy.get('.navds-alert--info')
            .should('contain', 'Rett opp det som er feil i søknaden, og send den inn på nytt.')

        cy.contains('Gå videre').click()
    })


    it('Svarer det samme søknaden', function() {
        cy.url().should('include', '/2')
        cy.contains('Gå videre').click()

        cy.contains('Avslutt uten å endre søknaden')
        cy.contains('Jeg vil ikke søke om sykepenger').should('not.exist')

        cy.url().should('include', '/3')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/4')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/5')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/6')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/7')
        cy.contains('Gå videre').click()

        cy.url().should('include', '/8')
        cy.contains('Gå videre').click()
        cy.get('.skjemaelement__label').click({ force: true })

        cy.contains('Send søknaden').click()
    })

    it('Vi ser en popup og lander på listevisninga', function() {
        cy.contains('Du har ikke gjort noen endringer. Vi behandler den opprinnelige sykepengesøknaden din.').click()

        cy.contains('OK').click()
        cy.url().should('equal', 'http://localhost:8080/syk/sykepengesoknad/')
    })
})
