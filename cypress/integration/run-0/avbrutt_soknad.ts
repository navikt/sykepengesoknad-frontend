import { avbruttSoknad } from '../../../src/data/mock/data/soknader-integration'

describe('Tester avryting av søknad', () => {


    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function() {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader')
    })

    it('Avbrutt søknad har forventa tekst', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${avbruttSoknad.id}]`)
            .should('include.text', '1. – 24. april')
            .should('include.text', 'Avbrutt av deg')

    })

    it('Ved klikk så åpnes avbrutt søknad visning', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${avbruttSoknad.id}]`).click()
        cy.url().should('include', `${avbruttSoknad.id}/1`)
    })

    it('Avbrutt tekster stemmer', function() {
        cy.contains('Avbrutt av deg')
        cy.contains('12. juni 2020')

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
    })

    it('Søknad kan gjenåpnes', function() {
        cy.contains('Gjenåpne søknad').click()
        cy.url().should('include', `${avbruttSoknad.id}/1`)
        cy.contains('Gå videre')
    })

    it('Søknad kan avsluttes og fortsette senere ', function() {
        cy.contains('Avslutt og fortsett senere').click()
        cy.contains('Vi lagrer søknaden din på Ditt sykefravær i listen med søknader om sykepenger.')
        cy.contains('Ja, fortsett senere')
        cy.contains('Nei').click()
    })

    it('Søknad kan avbrytes ', function() {

        // Avbryt dialog vises
        cy.contains('Avbryt søknad').click()
        cy.get('.modal__avbryt_popup button:contains(Nei)').click()
        cy.get('.modal__avbryt_popup button:contains(Nei)').should('not.exist')

        cy.contains('Avbryt søknad').click()
        cy.get('.modal__avbryt_popup button:contains(Ja, avbryt søknaden)').click()
        cy.url().should('include', `${avbruttSoknad.id}/1`)
        cy.contains('Gjenåpne søknad')
    })
})
