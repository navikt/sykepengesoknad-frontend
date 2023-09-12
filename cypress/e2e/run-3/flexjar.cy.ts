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
        return cy.findByRole('heading', {
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
                }).should('have.css', 'background-color', 'rgb(38, 38, 38)')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: 'Send tilbakemelding',
                }).click()
                cy.contains('Takk for tilbakemeldingen din!')
            })
    })

    it('Har ikke feedback på siste sidene', function () {
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
        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?').should('not.exist')
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
        heading('Opplever du at du har nok informasjon til å svare på dette spørsmålet?').should('not.exist')
    })
})
