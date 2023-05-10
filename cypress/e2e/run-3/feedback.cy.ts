import { arbeidstakerGradert } from '../../../src/data/mock/data/opplaering'
import { klikkGaVidere, svarCheckboxPanel, svarNeiHovedsporsmal } from '../../support/utilities'

describe('Tester feedback i hjelpetekst', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Naviger til tilbake i arbeid', function () {
        svarCheckboxPanel()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })

    it('Test å gi feedback', function () {
        cy.contains('Tilbake i fullt arbeid')
        cy.contains('Spørsmålet forklart').click()
        cy.contains('Var forklaringen til hjelp')

        cy.get('[data-cy="feedback-JA"]').contains('Ja').click()
        cy.get('[data-cy="feedback-JA"]').should('have.css', 'background-color', 'rgb(38, 38, 38)')
        cy.get('[data-cy="feedback-textarea"]').type('Dette er en test')

        cy.get('[data-cy="send-feedback"]').contains('Send inn svar').click()
        cy.contains('Takk for tilbakemeldingen!')
    })
})
