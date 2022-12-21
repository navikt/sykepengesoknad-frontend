import { nySoknadSomIkkeKanFyllesUt } from '../../../src/data/mock/data/eldre-usendt-soknad'
import { kortArbeidstakerSoknad } from '../../../src/data/mock/data/kort-soknad'

xdescribe('Eldre søknader', () => {
    describe('soknad med en eldre søknad', () => {
        before(() => {
            cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=en-eldre-usendt-soknad')
        })

        it('Laster startside', function () {
            cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
            cy.get(`#soknader-list-til-behandling article a[href*=${nySoknadSomIkkeKanFyllesUt.id}]`).click()
        })

        it('Viser advarsel om at det finnes eldre søknad', function () {
            cy.url().should('include', `${nySoknadSomIkkeKanFyllesUt.id}/1`)

            cy.contains('Du har en eldre søknad du må velge om du skal bruke, før du kan begynne på denne.')

            cy.contains('Gå til eldste søknad').click()
        })

        it('Vi ender på den eldste søknaden', function () {
            cy.url().should('include', `${kortArbeidstakerSoknad.id}/1`)
        })
    })
    describe('soknad med to eldre søknad', () => {
        before(() => {
            cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=to-eldre-usendte-soknader')
        })

        it('Laster startside', function () {
            cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
            cy.get(`#soknader-list-til-behandling article a[href*=${nySoknadSomIkkeKanFyllesUt.id}]`).click()
        })

        it('Viser advarsel om at det finnes eldre søknader', function () {
            cy.url().should('include', `${nySoknadSomIkkeKanFyllesUt.id}/1`)

            cy.contains('Du har to eldre søknader du må velge om du skal bruke, før du kan begynne på denne.')

            cy.contains('Gå til eldste søknad').click()
        })

        it('Vi ender på den eldste søknaden', function () {
            cy.url().should('include', `${kortArbeidstakerSoknad.id}/1`)
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
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click({
            force: true,
        })
        cy.contains('Gå videre').click()

        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })

        cy.contains('Gå videre').click()
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        ).click()

        cy.contains('Send søknaden').click()
    })
}
