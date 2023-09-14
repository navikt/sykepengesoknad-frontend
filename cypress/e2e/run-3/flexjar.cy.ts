import { klikkGaVidere, svarCheckboxPanel, svarNeiHovedsporsmal } from '../../support/utilities'
import { arbeidstakerGradert } from '../../../src/data/mock/data/soknad/arbeidstaker-gradert'

describe('Tester flexjar', () => {
    const soknad = arbeidstakerGradert

    before(() => {
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
        svarCheckboxPanel()
        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?').should('not.exist')

        klikkGaVidere()
        svarNeiHovedsporsmal()
        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?').should('exist')
        klikkGaVidere()
    })

    it('Test å gi feedback', function () {
        cy.contains('Tilbake i fullt arbeid')
        cy.contains('Opplever du at du har nok informasjon til å svare på dette spørsmålet?')

        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?')
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
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })

    it('Har ikke sporsmål flexjar på de siste sidene', function () {
        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?').should('not.exist')
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?').should('not.exist')
    })

    it('Har kvittering flexjar på kvitteringa', function () {
        heading('Hvordan opplevde du denne søknaden?')
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
