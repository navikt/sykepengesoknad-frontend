import { checkViStolerPaDeg, heading, klikkGaVidere, svarNeiHovedsporsmal } from '../../support/utilities'
import { arbeidstakerGradert } from '../../../src/data/mock/data/soknad/arbeidstaker-gradert'

describe('Tester flexjar', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
    })

    it('Laster startside', function () {
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Naviger til tilbake i arbeid', function () {
        heading('Vil du hjelpe oss å gjøre søknaden bedre?').should('not.exist')
        checkViStolerPaDeg()
    })

    it('Test å gi feedback', function () {
        cy.contains('Tilbake i fullt arbeid')
        cy.contains('Vil du hjelpe oss å gjøre søknaden bedre?')

        heading('Vil du hjelpe oss å gjøre søknaden bedre?', 2)
            .closest('[role="region"]')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Ja',
                }).click()
                cy.findByRole('button', {
                    name: 'Ja',
                }).should('have.css', 'background-color', 'rgb(35, 38, 42)')
                cy.contains('Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger.')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: /Send tilbakemelding/i,
                }).click()
            })
        cy.contains('Takk for tilbakemeldingen!')
    })

    it('Navigerer til siste side', function () {
        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Har du andre inntektskilder enn nevnt over?')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })

    it('Har ikke spørsmål flexjar på de siste sidene', function () {
        heading('Vil du hjelpe oss å gjøre søknaden bedre?').should('not.exist')
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
        heading('Vil du hjelpe oss å gjøre søknaden bedre?').should('exist')
    })

    it('Har emoji flexjar på kvitteringa', function () {
        cy.contains('Hva synes du om denne søknaden?')
        heading('Vil du hjelpe oss å gjøre søknaden bedre?')
            .closest('[role="region"]')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Bra',
                })
                    .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    .click()
                cy.findByRole('button', {
                    name: 'Bra',
                }).should('have.css', 'background-color', 'rgb(236, 238, 240)')
                cy.contains('Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger.')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: /Send tilbakemelding/i,
                }).click()
            })
        cy.contains('Takk for tilbakemeldingen!')
    })
})
