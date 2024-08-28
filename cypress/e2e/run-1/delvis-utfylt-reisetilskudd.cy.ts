import { delvisUtfyltReisetilskudd } from '../../../src/data/mock/data/personas/reisetilskuddTestPerson'
import { klikkTilbake } from '../../support/utilities'

describe('Tester delvis utfylt søknad med reisetilskudd', () => {
    const delvisUtfyltSoknad = delvisUtfyltReisetilskudd

    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=reisetilskudd-test')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Går til første ubesvarte spørsmål', () => {
        cy.get(`a[href*=${delvisUtfyltSoknad.id}]`).click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/6`)
    })

    it('Forrige spørsmål er besvart', () => {
        klikkTilbake()
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').should('be.checked')
    })

    it('Side for opplasting av kvitteringer er ikke besvart', () => {
        klikkTilbake()
        cy.get('.belop').should('not.exist')
    })
})
