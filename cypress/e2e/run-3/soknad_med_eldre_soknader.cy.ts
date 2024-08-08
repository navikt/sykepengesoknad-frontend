import { svarNeiHovedsporsmal, klikkGaVidere } from '../../support/utilities'

describe('Eldre søknader', () => {
    describe('soknad med en eldre søknad', () => {
        before(() => {
            cy.visit('/syk/sykepengesoknad?testperson=en-eldre-usendt-soknad')
        })

        it('Laster startside', function () {
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
            cy.get(`a[href*=e6e53c43-3b64-48be-b9d1-39d95198e528]`).click()
        })

        it('Viser advarsel om at det finnes eldre søknad', function () {
            cy.url().should('include', `e6e53c43-3b64-48be-b9d1-39d95198e528/1`)

            cy.contains('Du har en eldre søknad du må velge om du skal bruke, før du kan begynne på denne.')

            cy.contains('Gå til eldste søknad').click()
        })

        it('Vi ender på den eldste søknaden', function () {
            cy.url().should('include', `e6e53c43-3b64-48be-b9d1-39d95198e523/1`)
        })
    })
    describe('soknad med to eldre søknad', () => {
        before(() => {
            cy.visit('/syk/sykepengesoknad?testperson=to-eldre-usendte-soknader')
        })

        it('Laster startside', function () {
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
            cy.get(`a[href*=e6e53c43-3b64-48be-b9d1-39d95198e521]`).click()
        })

        it('Viser advarsel om at det finnes eldre søknader', function () {
            cy.url().should('include', `e6e53c43-3b64-48be-b9d1-39d95198e521/1`)

            cy.contains('Du har to eldre søknader du må velge om du skal bruke, før du kan begynne på denne.')

            cy.contains('Gå til eldste søknad').click()
        })

        it('Vi ender på den eldste søknaden', function () {
            cy.url().should('include', `e6e53c43-3b64-48be-b9d1-39d95198e529/1`)
        })

        fyllUtSoknad()

        it('Vi har lenke til neste søknad', function () {
            cy.contains('Du har to søknader du må velge om du skal bruke.')
            cy.contains('Gå til neste søknad').click()
        })

        fyllUtSoknad()

        it('Vi har lenke til neste søknad', function () {
            cy.contains('Du har en søknad du må velge om du skal bruke.')
            cy.contains('Gå til søknaden').click()
        })

        fyllUtSoknad()

        it('Siden har en Ferdig-knapp', () => {
            cy.contains('Ferdig')
        })
    })
})

function fyllUtSoknad() {
    it('Fyller ut søknaden', () => {
        cy.contains('Jeg vil svare så godt jeg kan på spørsmålene i søknaden.').click()

        cy.contains('Gå videre').click()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        ).click()

        cy.contains('Send søknaden').click()
    })
}

export {}
