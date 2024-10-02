import { checkViStolerPaDeg, klikkGaVidere, neiOgVidere } from '../../support/utilities'
import { arbeidstakerGradert } from '../../../src/data/mock/data/soknad/arbeidstaker-gradert'

describe('Tester ettersending og korrigering', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Svar på søknad', function () {
        checkViStolerPaDeg()
        neiOgVidere([
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Jobb underveis i sykefraværet',
            'Arbeid utenfor Norge',
            'Andre inntektskilder',
            'Reise til utlandet',
        ])

        cy.contains('Oppsummering fra søknaden')
        cy.contains('Send søknaden').click()
    })

    it('Kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)

        // Sendt til
        cy.get('[data-cy="kvittering"]').should(
            'contain',
            'Posten Norge AS, Bærum (Org.nr. 974654458), med kopi til NAV',
        )

        cy.contains('Du får sykepengene fra arbeidsgiveren din')
        cy.contains('Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.')
    })

    it('Korriger fra /sendt', () => {
        cy.visit('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
        cy.get(`a[href*=${soknad.id}]`).click()
        cy.url().should('include', `/sendt/${soknad.id}`)

        cy.findByRole('link', { name: 'Endre svar' }).click()
        cy.findByRole('button', { name: 'Ok' }).click()
        cy.url().should('include', `/1`)
    })

    it('Ettersend', () => {
        cy.visit('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
        cy.get(`[data-cy="Tidligere søknader"]`).children().should('have.length', 2)
        cy.get(`[data-cy="Tidligere søknader"] > a[href*=${soknad.id}]`).click()

        cy.contains('Jeg vil at søknaden skal behandles av NAV').click()
        cy.contains(
            'Vanligvis behandles søknaden bare av NAV hvis det samlede sykefraværet er 16 dager eller mer. Denne søknaden er beregnet til å være kortere. Hvis arbeidsgiveren din eller NAV har bedt deg sende den likevel, gjør du det her.',
        )
        cy.contains('Send søknaden til NAV').click()
        cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')

        // Innholdet i kvitteringen blir også oppdatert
        cy.contains('NAV behandler søknaden din')
        cy.contains('Du får sykepengene fra arbeidsgiveren din').should('not.exist')
    })

    it('Korriger', () => {
        // Endre søknaden
        cy.url().should('include', `/sendt/${soknad.id}`)
        cy.findByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()
        cy.findByRole('button', { name: 'Ok' }).click()

        // Ny søknad
        cy.url().should('not.include', `/kvittering/${soknad.id}`)
        cy.url().should('include', '/1')

        // ANSVARSERKLARING er resatt
        cy.get('.navds-checkbox__input[type=checkbox]').should('not.be.checked')
        checkViStolerPaDeg()

        klikkGaVidere()
        klikkGaVidere()
        klikkGaVidere()
        klikkGaVidere()
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        klikkGaVidere()
        klikkGaVidere()
        klikkGaVidere()
        cy.contains('Send endringene').click()

        cy.url().should('include', `/kvittering/`)

        cy.findByRole('link', { name: 'Endre svar' }).click()
        cy.findByRole('button', { name: 'Ok' }).click()
        cy.url().should('include', `/1`)
    })

    it('Søknad har teaser', () => {
        cy.visit('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')

        cy.get(`a[href*=${soknad.id}]`)
            .should('contain', '1. – 24. april 2020')
            .and('contain', 'Sendt til arbeidsgiver og NAV')
    })
})
