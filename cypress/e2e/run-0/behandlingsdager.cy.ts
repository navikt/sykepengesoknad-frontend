import { behandlingsdager } from '../../../src/data/mock/data/soknad/behandlingsdager'
import {
    checkViStolerPaDeg,
    klikkGaVidere,
    klikkTilbake,
    sjekkIntroside,
    svarNeiHovedsporsmal,
    sporsmalOgSvar
} from '../../support/utilities'

describe('Tester behandlingsdagersøknad', () => {
    //-----
    // Sykmelding: e876fe08-2765-4bd6-966c-922eefe99382, arbeidstaker - behandlingsdager
    // Søknad: bcb032ac-b6dd-4ae7-8e73-9e64f1b35182, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = behandlingsdager

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=behandlingsdager')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING - steg 1', function () {
        cy.url().should('include', `${soknad.id}/1`)

        sjekkIntroside()
        checkViStolerPaDeg()
    })

    it('Søknad ENKELTSTAENDE_BEHANDLINGSDAGER - steg 2', function () {
        cy.url().should('include', `${soknad.id}/2`)

        cy.contains(
            'Du kan bare få én behandlingsdag i løpet av en uke. Trenger du flere slike dager, ber du legen om en gradert sykmelding i stedet.',
        )
        cy.contains(
            'Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 24. april 2020?',
        )
        cy.get('button[aria-label="onsdag 1"]').click()
        cy.get('button[aria-label="fredag 10"]').click()
        cy.get('button[aria-label="torsdag 16"]').click()
        cy.get('button[aria-label="onsdag 15"]').click()
        cy.get('button[aria-label="onsdag 1"]').click()

        klikkGaVidere()
    })

    it('Søknad FERIE - steg 3', function () {
        cy.url().should('include', `${soknad.id}/3`)

        cy.contains('Ferie')
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })

    it('Søknad ANDRE_INNTEKTSKILDER - steg 4', function () {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .navds-checkbox label[for=687382]').should('include.text', 'andre arbeidsforhold')
        cy.get('input[type=checkbox]#687382').click()

        // Underspørsmål nivå 2 - radio
        cy.get('input[type=radio]#687383_0').click()
        cy.contains(
            'Du må sende egen sykepengesøknad for dette. ' +
                'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
        )

        klikkGaVidere()
    })

    it('Tilbake og videre', function () {
        cy.contains('Oppsummering')
        klikkTilbake()

        cy.contains('Andre inntektskilder')
        klikkGaVidere()
    })

    it('Søknad TIL_SLUTT - steg 4', function () {
        cy.url().should('include', `${soknad.id}/5`)
        cy.contains('Oppsummering fra søknaden')
        cy.get('.navds-guide-panel__content').contains(
            'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
        )
        cy.get('.navds-checkbox__label').click()
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )

        cy.contains('Oppsummering fra søknaden')
        cy.get('[data-cy="oppsummering-fra-søknaden"]').within(() => {
            sporsmalOgSvar('Søknaden sendes til', 'NAV')
            sporsmalOgSvar('1. – 3. april', 'Ikke til behandling')
            sporsmalOgSvar('6. – 10. april', '10. april')
            sporsmalOgSvar('13. – 17. april', '15. april')
            sporsmalOgSvar('20. – 24. april', 'Ikke til behandling')
        })

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('[data-cy="kvittering"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Før NAV kan behandle søknaden')
            .and('contain', 'NAV behandler søknaden')
            .and('contain', 'Når blir pengene utbetalt')
    })
})
