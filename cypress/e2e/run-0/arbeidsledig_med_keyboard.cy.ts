/* eslint-disable cypress/unsafe-to-chain-command */
import 'cypress-real-events'
import { sjekkMainContentFokus } from '../../support/utilities'
import { arbeidsledig } from '../../../src/data/mock/data/soknad/arbeidsledig'

describe('Tester arbeidsledigsøknad', () => {
    const soknad = arbeidsledig

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=arbeidsledig')
    })

    it('Laster startside', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Navigerer søknaden', () => {
        cy.url().should('include', `${soknad.id}/1`)
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
            .parent()
            .contains('Jeg vet at jeg kan miste retten til sykepenger')
            .should('have.css', 'box-shadow')
        cy.realPress('Space')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Friskmeldt')
        cy.get('form').findAllByRole('radio', { name: 'Nei' }).should('have.length', 1)
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Space')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow').realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Andre inntektskilder')
        cy.contains('Hva mener vi med andre inntektskilder?')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Space')
        cy.realPress('{rightarrow}')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Reise')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.realPress('Space')
        cy.realPress('{rightarrow}')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.focused().contains('Gå videre').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Oppsummering')
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
        cy.realPress('Space')
        cy.focused().should('have.css', 'box-shadow')
        cy.realPress('Tab')
        cy.realPress('Tab')
        cy.focused().contains('Send søknaden').should('have.css', 'box-shadow')
        cy.realPress('Enter')
        sjekkMainContentFokus()

        cy.contains('Søknaden er sendt til NAV')
        cy.contains('Mottatt')
    })
})
