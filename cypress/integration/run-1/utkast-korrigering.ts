import { arbeidstakerTilKorrigering } from '../../../src/data/mock/data/soknader-integration'
import { tekst } from '../../../src/utils/tekster'

describe('Tester utkast til korrigerte søknader', () => {

    const tilKorrigering = arbeidstakerTilKorrigering

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Henter liste med søknader', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader')
    })

    it('En søknad til korringeringer markert som til korrigering', () => {
        cy.get(`#soknader-list-til-behandling article a[href*=${tilKorrigering.id}] .inngangspanel__status`)
            .contains(tekst('soknad.teaser.utkast-korrigering.tekst'))
    })

    it('Korrigert første spørsmål er ubesvart', () => {
        cy.get(`#soknader-list-til-behandling article a[href*=${tilKorrigering.id}]`).click()
        cy.url().should('include', `${tilKorrigering.id}/1`)
        cy.get('input.skjemaelement__input').should('not.be.checked')
    })
})
