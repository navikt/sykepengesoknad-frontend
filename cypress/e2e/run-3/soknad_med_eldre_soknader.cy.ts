import { nySoknadSomIkkeKanFyllesUt } from '../../../src/data/mock/data/eldre-usendt-soknad'
import { arbeidstaker } from '../../../src/data/mock/data/soknader-opplaering'

describe('Eldre søknader', () => {
    describe('soknad med en eldre søknad', () => {
        before(() => {
            cy.visit(
                'http://localhost:8080/syk/sykepengesoknad?testperson=en-eldre-usendt-soknad'
            )
        })

        it('Laster startside', function () {
            cy.get('.navds-heading--xlarge')
                .should('be.visible')
                .and('have.text', 'Søknader')
            cy.get(
                `#soknader-list-til-behandling article a[href*=${nySoknadSomIkkeKanFyllesUt.id}]`
            ).click()
        })

        it('Viser advarsel om at det finnes eldre søknad', function () {
            cy.url().should('include', `${nySoknadSomIkkeKanFyllesUt.id}/1`)

            cy.contains(
                'Du har en eldre søknad du må velge om du skal bruke eller ikke, før du kan fylle ut denne søknaden.'
            )

            cy.contains('Gå til den eldste søknaden').click()
        })

        it('Vi ender på den eldste søknaden', function () {
            cy.url().should('include', `${arbeidstaker.id}/1`)
        })
    })
    describe('soknad med to eldre søknad', () => {
        before(() => {
            cy.visit(
                'http://localhost:8080/syk/sykepengesoknad?testperson=to-eldre-usendte-soknader'
            )
        })

        it('Laster startside', function () {
            cy.get('.navds-heading--xlarge')
                .should('be.visible')
                .and('have.text', 'Søknader')
            cy.get(
                `#soknader-list-til-behandling article a[href*=${nySoknadSomIkkeKanFyllesUt.id}]`
            ).click()
        })

        it('Viser advarsel om at det finnes eldre søknader', function () {
            cy.url().should('include', `${nySoknadSomIkkeKanFyllesUt.id}/1`)

            cy.contains(
                'Du har to eldre søknader du må velge om du skal bruke eller ikke, før du kan fylle ut denne søknaden.'
            )

            cy.contains('Gå til den eldste søknaden').click()
        })

        it('Vi ender på den eldste søknaden', function () {
            cy.url().should('include', `${arbeidstaker.id}/1`)
        })
    })
})
