import { klikkGaVidere, setPeriodeFraTil } from '../../support/utilities'
import { arbeidstaker } from '../../../src/data/mock/data/soknad/arbeidstaker'

describe('Reproduserer datovelger bug', () => {
    const soknad = arbeidstaker

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/3`)
    })

    it('Trigger feilmelding', function () {
        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du ut feriedager?')

        setPeriodeFraTil(16, 23)
        cy.get(`.navds-date__field-input`).eq(0).clear()

        klikkGaVidere(true)
    })

    it('Fyller inn korrekt dato', function () {
        cy.get(`[data-cy="periode"]`).find('.navds-date__field-button').eq(0).click()
        cy.get(`[data-cy="periode"]`).find('.rdp-cell').contains('16').click()
        cy.findByRole('button', { name: 'Gå videre' }).click({ force: true })

        cy.get('.navds-error-message').contains('Du må oppgi en til og med dato i formatet dd.mm.åååå')
        cy.url().should('include', `/syk/sykepengesoknad/soknader/${soknad.id}/3`)
    })
})
