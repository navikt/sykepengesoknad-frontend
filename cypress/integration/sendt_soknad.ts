import { sendtArbeidsledig } from '../../src/data/mock/data/soknader-integration'

describe('Tester sendt søknad', () => {


    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', function() {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om sykepenger')
    })

    it('Sendt søknad har forventa tekst', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${sendtArbeidsledig.id}]`)
            .should('include.text', 'Gjelder perioden 27. mai – 11. juni 2020')
            .should('include.text', 'Sendt til NAV 12.06.2020')

    })

    it('Ved klikk så åpnes kvittering søknad visning', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${sendtArbeidsledig.id}]`).click()
        cy.url().should('equal', `http://localhost:8080/kvittering/${sendtArbeidsledig.id}`)
    })

    it('Tekster stemmer', function() {
        cy.contains('NAV behandler søknaden din')

    })

    it('Siden kan refreshes', function() {
        cy.reload()
        cy.contains('NAV behandler søknaden din')
        cy.url().should('equal', `http://localhost:8080/kvittering/${sendtArbeidsledig.id}`)

    })

})
