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
        heading('Tilbakemeldingen din er viktig for oss!').should('not.exist')
        checkViStolerPaDeg()
    })

    it('Test å gi feedback', function () {
        cy.contains('Tilbake i fullt arbeid')
        cy.contains('Tilbakemeldingen din er viktig for oss!')

        heading('Tilbakemeldingen din er viktig for oss!')
            .closest('section')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Ja',
                }).click()
                cy.findByRole('button', {
                    name: 'Ja',
                }).should('have.css', 'background-color', 'rgb(35, 38, 42)')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: 'Send tilbakemelding',
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
        heading('Tilbakemeldingen din er viktig for oss!').should('not.exist')
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
        heading('Tilbakemeldingen din er viktig for oss!').should('exist')
    })

    it('Har emoji flexjar på kvitteringa', function () {
        cy.contains('Hva synes du om denne søknaden?')
        heading('Tilbakemeldingen din er viktig for oss!')
            .closest('section')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Bra',
                })
                    .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    .click()
                cy.findByRole('button', {
                    name: 'Bra',
                }).should('have.css', 'background-color', 'rgb(236, 238, 240)')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: 'Send tilbakemelding',
                }).click()
            })
        cy.contains('Takk for tilbakemeldingen!')
    })
})
