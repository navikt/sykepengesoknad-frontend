import { klikkGaVidere, setPeriodeFraTil } from '../../support/utilities'
import { arbeidstaker } from '../../../src/data/mock/data/soknad/arbeidstaker'

describe('Tester at datovelger viser korrekt feilmelding, og at man ikke kan gå videre uten å velge datoer', () => {
    const soknad = arbeidstaker

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/3`)
    })

    it('Trigger feilmelding', function () {
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du ut feriedager?')

        setPeriodeFraTil(16, 23)
        cy.get(`.navds-date__field-input`).eq(0).clear()

        klikkGaVidere(true)

        //Får feilmelding og blir på siden
        cy.get('.navds-error-message').contains('Du må oppgi en fra og med dato i formatet dd.mm.åååå')
        cy.url().should('include', `/syk/sykepengesoknad/soknader/${soknad.id}/3`)
    })

    it('Fyller inn korrekt dato, og går videre', function () {
        cy.get(`[data-cy="periode"]`).find('.navds-date__field-button').eq(0).click()
        cy.get(`[data-cy="periode"]`).find('.rdp-cell').contains('16').click()
        cy.findByRole('button', { name: 'Gå videre' }).click({ force: true })

        //Feilmelding blir borte og går videre til neste spørsmål
        cy.get('.navds-error-message').should('not.exist')
        cy.url().should('include', `/syk/sykepengesoknad/soknader/${soknad.id}/4`)
    })
})
