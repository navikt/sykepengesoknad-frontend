import { arbeidstakerGradert } from '../../../src/data/mock/data/opplaering'
import { klikkGaVidere, svarCheckboxPanel, svarNeiHovedsporsmal } from '../../support/utilities'

describe('Tester feedback', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Naviger til tilbake i arbeid', function () {
        svarCheckboxPanel()
        cy.get('[data-cy="feedback-wrapper"]').should('not.exist')
        klikkGaVidere()
        svarNeiHovedsporsmal()
        cy.get('[data-cy="feedback-wrapper"]').should('exist')
        klikkGaVidere()
    })

    it('Test å gi feedback', function () {
        cy.contains('Tilbake i fullt arbeid')
        cy.contains('Opplever du at du har nok informasjon til å svare på dette spørsmålet?')

        cy.get('[data-cy="feedback-JA"]').contains('Ja').click()
        cy.get('[data-cy="feedback-JA"]').should('have.css', 'background-color', 'rgb(38, 38, 38)')
        cy.get('[data-cy="feedback-textarea"]').type('Dette er en test')

        cy.get('[data-cy="send-feedback"]').contains('Send inn tilbakemelding').click()
        cy.contains('Takk for tilbakemeldingen!')
    })

    it('Har ikke feedback på siste sidene', function () {
        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.get('[data-cy="feedback-wrapper"]').should('not.exist')
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
        cy.get('[data-cy="feedback-wrapper"]').should('not.exist')
    })
})
