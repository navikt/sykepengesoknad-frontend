import { utgattSoknad } from '../../../src/data/mock/data/soknad/arbeidstaker-utgatt'

describe('Tester utgått søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
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
        cy.get('.navds-modal').should('include.text', 'Søknaden er utgått')
        cy.get('.navds-modal .navds-body-short').should(
            'include.text',
            'Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.',
        )
    })
})
