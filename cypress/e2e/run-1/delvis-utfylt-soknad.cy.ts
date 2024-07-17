import { delvisUtfylltArbeidsledig } from '../../../src/data/mock/data/soknad/soknader-integration'
import { klikkTilbake } from '../../support/utilities'

describe('Tester delvis utfylt søknad', () => {
    const delvisUtfyltSoknad = delvisUtfylltArbeidsledig

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
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
        klikkTilbake()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/2`)
        cy.contains('Arbeid utenfor Norge')
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').should('be.checked')
    })
})
