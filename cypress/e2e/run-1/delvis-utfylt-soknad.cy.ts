import { delvisUtfylltArbeidsledig } from '../../../src/data/mock/data/soknader-integration'

describe('Tester delvis utfylt søknad', () => {
    const delvisUtfyltSoknad = delvisUtfylltArbeidsledig

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Går til første ubesvarte spørsmål', () => {
        cy.get(`a[href*=${delvisUtfyltSoknad.id}]`).click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/3`)
        cy.get('[data-cy="ja-nei-stor"]').should('not.be.checked')
    })

    it('Forrige spørsmål er besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/2`)
        cy.contains('Arbeid utenfor Norge')
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').should('be.checked')
    })
})
