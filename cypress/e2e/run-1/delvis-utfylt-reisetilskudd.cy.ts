import { delvisUtfyltReisetilskudd } from '../../../src/data/mock/data/reisetilskudd'

describe('Tester delvis utfylt søknad med reisetilskudd', () => {
    const delvisUtfyltSoknad = delvisUtfyltReisetilskudd

    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=reisetilskudd')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Går til første ubesvarte spørsmål', () => {
        cy.get(`a[href*=${delvisUtfyltSoknad.id}]`).click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/6`)
        cy.get('[data-cy="bekreftCheckboksPanel"]').should('not.be.checked')
    })

    it('Forrige spørsmål er besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/5`)
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').should('be.checked')
    })

    it('Side for opplasting av kvitteringer er ikke besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/4`)
        cy.get('.belop').should('not.exist')
    })
})
