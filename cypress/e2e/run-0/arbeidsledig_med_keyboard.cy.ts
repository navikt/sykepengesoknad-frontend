import { arbeidsledig } from '../../../src/data/mock/data/opplaering'
import 'cypress-real-events'
import { sjekkMainContentFokus } from '../../support/utilities'

describe('Tester arbeidsledigsøknad', () => {
    const soknad = arbeidsledig

    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Navigerer søknaden', () => {
        cy.url().should('include', `${soknad.id}/1`)
        cy.contains('1. april - 24. april 2020 (24 dager)')
        cy.contains('100% sykmeldt')
        cy.contains('Opplysninger fra sykmeldingen')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.focused().parent().parent().contains('Vi stoler på deg').should('have.css', 'box-shadow')
        cy.realPress('Space')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Friskmeldt')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Space')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Andre inntektskilder')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('{rightarrow}')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Reise')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('{rightarrow}')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Til slutt')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.focused()
            .parent()
            .contains(
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            )
        cy.focused().should('have.css', 'box-shadow')
        cy.realPress('Space')
        cy.realPress('Tab')
        cy.focused().contains('Send søknaden').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Søknaden er sendt til NAV')
        cy.contains('Mottatt')
    })
})
