import { arbeidstakerTilKorrigering } from '../../../src/data/mock/data/soknader-integration'
import { tekst } from '../../../src/utils/tekster'

describe('Tester utkast til korrigerte søknader', () => {
    const tilKorrigering = arbeidstakerTilKorrigering

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('En søknad til korringeringer markert som til korrigering', () => {
        cy.get(`a[href*=${tilKorrigering.id}]`).contains(tekst('soknad.teaser.utkast-korrigering.tekst'))
    })

    it('Korrigert første spørsmål er ubesvart', () => {
        cy.get(`a[href*=${tilKorrigering.id}]`).click()
        cy.url().should('include', `${tilKorrigering.id}/1`)
        cy.get('.navds-checkbox__input').should('not.be.checked')
    })
})
