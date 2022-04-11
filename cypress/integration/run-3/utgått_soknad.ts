import { utgattSoknad } from '../../../src/data/mock/data/soknader-integration'

describe('Tester utgått søknad', () => {

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function() {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('Utgått søknad har forventa tekst', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${utgattSoknad.id}]`)
            .should('include.text', '23. mai – 7. juni 2020')
            .should('include.text', 'Utgått')

    })

    it('Ved klikk så åpnes popup', function() {
        cy.get(`#soknader-sendt article[aria-labelledby*=${utgattSoknad.id}]`).click()
        cy.get('.ReactModal__Content')
            .should('include.text', 'Søknaden er utgått')
            .get('.navds-alert .navds-body-long')
            .should('include.text', 'Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.')
    })

})
