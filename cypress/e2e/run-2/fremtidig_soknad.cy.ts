import { fremtidigSoknad } from '../../../src/data/mock/data/soknad/arbeidstaker-fremtidig'

describe('Tester fremtidig søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=fremtidig')
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Ved klikk så åpnes popup', function () {
        cy.get(`[data-cy="button-listevisning-${fremtidigSoknad.id}"]`)
            .should('include.text', '23. mai – 7. juni 3020')
            .and('include.text', 'Aktiveres 8. juni 3020')

        cy.get(`[data-cy="button-listevisning-${fremtidigSoknad.id}"]`).click()
        cy.get('.navds-modal__content')
            .should('include.text', 'Søknaden er ikke klar')
            .get('.navds-label')
            .should('include.text', 'Hvorfor kan jeg ikke søke nå?')
    })
})
