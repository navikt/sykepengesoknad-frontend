import { fremtidigSoknad } from '../../../src/data/mock/data/opplaering'

describe('Tester fremtidig søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('Fremtidig søknad har forventa tekst', function () {
        cy.get(`[data-cy="button-listevisning-${fremtidigSoknad.id}"]`)
            .should('include.text', '23. mai – 7. juni 3020')
            .and('include.text', 'Aktiveres 8. juni 3020')
    })

    it('Ved klikk så åpnes popup', function () {
        cy.get(`[data-cy="button-listevisning-${fremtidigSoknad.id}"]`).click()
        cy.get('.navds-modal__content')
            .should('include.text', 'Søknaden er ikke klar')
            .get('.utvidbar .navds-label')
            .should('include.text', 'Hvorfor kan jeg ikke søke nå?')
    })
})
