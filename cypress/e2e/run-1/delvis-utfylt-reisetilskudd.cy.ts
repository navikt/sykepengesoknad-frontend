import { delvisUtfyltReisetilskudd } from '../../../src/data/mock/data/reisetilskudd'

describe('Tester delvis utfylt søknad med reisetilskudd', () => {
    const delvisUtfyltSoknad = delvisUtfyltReisetilskudd

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=reisetilskudd')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('Går til første ubesvarte spørsmål', () => {
        cy.get(`#soknader-list-til-behandling article a[href*=${delvisUtfyltSoknad.id}]`).click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/6`)
        cy.get('.bekreftCheckboksPanel').should('not.be.checked')
    })

    it('Forrige spørsmål er besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/5`)
        cy.get('.inputPanel--checked').contains('Nei')
    })

    it('Side for opplasting av kvitteringer er ikke besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/4`)
        cy.get('.belop').should('not.exist')
    })
})
