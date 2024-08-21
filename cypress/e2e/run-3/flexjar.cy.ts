import { checkViStolerPaDeg, klikkGaVidere, svarCheckboxPanel, svarNeiHovedsporsmal } from "../../support/utilities";
import { arbeidstakerGradert } from '../../../src/data/mock/data/soknad/arbeidstaker-gradert'

describe('Tester flexjar', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    function heading(heading: string, level = 3) {
        return cy.get('body').findByRole('heading', {
            name: heading,
            level,
        })
    }

    it('Naviger til tilbake i arbeid', function () {
        heading('Hjelp oss med å gjøre søknaden bedre').should('not.exist')
        checkViStolerPaDeg()
    })

    it('Test å gi feedback', function () {
        cy.contains('Tilbake i fullt arbeid')
        cy.contains('Hjelp oss med å gjøre søknaden bedre')

        heading('Hjelp oss med å gjøre søknaden bedre')
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
                cy.contains('Takk for tilbakemeldingen din!')
            })
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

    it('Har ikke sporsmål flexjar på de siste sidene', function () {
        heading('Hjelp oss med å gjøre søknaden bedre').should('not.exist')
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
        heading('Hjelp oss med å gjøre søknaden bedre').should('exist')
    })

    it('Har kvittering flexjar på kvitteringa', function () {
        cy.contains('Hvordan opplevde du denne søknaden')
        heading('Hjelp oss med å gjøre søknaden bedre')
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
                cy.contains('Takk for tilbakemeldingen din!')
            })
    })
})
