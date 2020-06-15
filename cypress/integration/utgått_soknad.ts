import { utgåttSøknad } from '../../src/data/mock/data/soknader-integration'

describe('Tester sendt søknad', () => {


    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', function() {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om sykepenger')
    })

    it('Utgått søknad har forventa tekst', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${utgåttSøknad.id}]`)
            .should('include.text', 'Opprettet 08.06.2020')
            .should('include.text', 'Gjelder perioden 23. mai – 7. juni 2020')
            .should('include.text', 'Ikke brukt på nett')
            .should('include.text', '995816598 sitt orgnavn')

    })

    it('Ved klikk så åpnes popup', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${utgåttSøknad.id}]`).click()
        cy.get('.ReactModal__Content')
            .should('include.text', 'Søknaden er utgått')
            .get('.alertstripe > .typo-normal')
            .should('include.text', 'Du får ikke åpnet denne søknaden fordi du ikke har sendt den innen fristen.')
    })

})
