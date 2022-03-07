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
        cy.contains('Søknaden ble avbrutt av deg')
        cy.contains('12. juni 2020')
        cy.contains('Det betyr at du ikke vil få sykepenger for perioden denne søknaden gjelder for.')
        cy.contains('Hvis du vil ha sykepenger likevel, må du gjenåpne søknaden, fylle den ut og sende den inn. ' +
            'Vi minner om at søknaden må sendes seneste tre måneder etter den måneden hver enkelt sykemelding startet.')

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('Hvorfor må jeg søke om sykepenger?')
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
        cy.contains('Jeg vil ikke søke om sykepenger').click()
        cy.get('.modal__avbryt_popup button:contains(Nei, jeg vil bruke søknaden)').click()
        cy.get('.modal__avbryt_popup button:contains(Nei, jeg vil bruke søknaden)').should('not.exist')

        cy.contains('Jeg vil ikke søke om sykepenger').click()
        cy.get('.modal__avbryt_popup button:contains(Ja, jeg er sikker)').click()
        cy.url().should('include', `${avbruttSoknad.id}/1`)
        cy.contains('Gjenåpne søknad')
    })
})
