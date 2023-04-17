import { delvisUtfylltArbeidsledig } from '../../../src/data/mock/data/soknader-integration'

describe('Tester delvis utfylt søknad', () => {
    const delvisUtfyltSoknad = delvisUtfylltArbeidsledig

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('Går til første ubesvarte spørsmål', () => {
        cy.get(`#soknader-list-til-behandling article a[href*=${delvisUtfyltSoknad.id}]`).click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/3`)
        cy.get('.radioGruppe-jaNei').should('not.be.checked')
    })

    it('Forrige spørsmål er besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/2`)
        cy.contains('Arbeid utenfor Norge')
        cy.get('.radioGruppe-jaNei input[value=NEI]').should('be.checked')
    })
})
