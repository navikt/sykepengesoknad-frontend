import { behandlingsdager, nySoknadSomIkkeKanFyllesUt } from '../../../src/data/mock/data/soknader-opplaering'

describe('Tester soknad med eldre søknader', () => {

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function() {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${nySoknadSomIkkeKanFyllesUt.id}]`).click()
    })

    it('Viser advarsel om at det finnes eldre søknad', function() {
        cy.url().should('include', `${nySoknadSomIkkeKanFyllesUt.id}/1`)

        cy.contains('OBS: Du har en eldre søknad som du må fylle ut først')

        cy.contains('Gå til den eldste søknaden').click()
    })

    it('Vi endre på den eldste søknaden', function() {
        cy.url().should('include', `${behandlingsdager.id}/1`)
    })
})
