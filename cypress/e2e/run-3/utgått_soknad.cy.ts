import { utgattSoknad } from '../../../src/data/mock/data/soknader-integration'

describe('Tester utgått søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Utgått søknad har forventa tekst', function () {
        cy.get(`[data-cy="button-listevisning-${utgattSoknad.id}"]`)
            .should('include.text', '23. mai – 7. juni 2020')
            .should('include.text', 'Utgått')
    })

    it('Ved klikk så åpnes popup', function () {
        cy.get(`[data-cy="button-listevisning-${utgattSoknad.id}"]`).click()
        cy.get('.navds-modal__content')
            .should('include.text', 'Søknaden er utgått')
            .get('.navds-alert .navds-body-long')
            .should('include.text', 'Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.')
    })
})
