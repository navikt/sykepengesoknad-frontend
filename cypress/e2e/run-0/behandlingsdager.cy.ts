import { behandlingsdager } from '../../../src/data/mock/data/soknad/behandlingsdager'
import { klikkGaVidere, svarNeiHovedsporsmal } from '../../support/utilities'

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

        // Sykmelding
        cy.contains('1. april - 24. april 2020 (24 dager)')
        cy.contains('Posten Norge AS, Bærum')
        cy.contains('1 behandlingsdag')
        cy.get('section[aria-label="Opplysninger fra sykmeldingen"] button').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click()

        cy.contains('Gå videre').click()
    })

    it('Søknad ENKELTSTAENDE_BEHANDLINGSDAGER - steg 2', function () {
        cy.url().should('include', `${soknad.id}/2`)

        cy.contains(
            'Du kan bare få én behandlingsdag i løpet av en uke. Trenger du flere slike dager, ber du legen om en gradert sykmelding i stedet.',
        )
        cy.contains(
            'Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 24. april 2020?',
        )
        cy.get('button[aria-label="1. april (onsdag)"]').click()
        cy.get('button[aria-label="10. april (fredag)"]').click()
        cy.get('button[aria-label="16. april (torsdag)"]').click()
        cy.get('button[aria-label="15. april (onsdag)"]').click()
        cy.get('button[aria-label="1. april (onsdag)"]').click()

        cy.contains('Gå videre').click()
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

        cy.contains('Gå videre').click()
    })

    it('Tilbake og videre', function () {
        cy.contains('Til slutt')
        cy.contains('Tilbake').click()

        cy.contains('Andre inntektskilder')
        cy.contains('Gå videre').click()
    })

    it('Søknad TIL_SLUTT - steg 4', function () {
        cy.url().should('include', `${soknad.id}/5`)
        cy.contains('Til slutt')
        it('Bekreftelsespunktene er riktige', () => {
            const punkter = [
                'Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.',
                'NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.',
                'Fristen for å søke sykepenger er som hovedregel 3 måneder.',
                'Du kan endre svarene i denne søknaden opp til 12 måneder etter du sendte den inn første gangen.',
            ]

            punkter.forEach((punkt) => {
                cy.contains(punkt)
            })

            cy.contains('Du kan lese mer om rettigheter og plikter på')
                .find('a')
                .should('have.attr', 'href', 'https://www.nav.no/sykepenger')
        })
        cy.get('.navds-checkbox__label').click()
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )
        cy.contains('Søknaden sendes til NAV.')

        cy.get('.oppsummering').click()
        cy.get('[data-cy="oppsummering__behandlingsdager"]')
            .contains('1. – 3. april')
            .siblings()
            .should('contain', 'Ikke til behandling')
        cy.get('[data-cy="oppsummering__behandlingsdager"]')
            .contains('6. – 10. april')
            .siblings()
            .should('contain', '10. april')
        cy.get('[data-cy="oppsummering__behandlingsdager"]')
            .contains('13. – 17. april')
            .siblings()
            .should('contain', '15. april')
        cy.get('[data-cy="oppsummering__behandlingsdager"]').contains('20. – 24. april')
        cy.get('[data-cy="oppsummering__behandlingsdager"]').contains('Ikke til behandling')

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
