import { soknaderOpplaering as soknader } from '../../src/data/mock/data/soknader-opplaering'
import { RSSoknad } from '../../src/types/rs-types/rs-soknad'

describe('Tester behandlingsdagersøknad', () => {
    //-----
    // Sykmelding: e876fe08-2765-4bd6-966c-922eefe99382, arbeidstaker - behandlingsdager
    // Søknad: bcb032ac-b6dd-4ae7-8e73-9e64f1b35182, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = soknader.find((sok: RSSoknad) => sok.id === 'bcb032ac-b6dd-4ae7-8e73-9e64f1b35182')!

    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', function() {
        cy.get('.soknadtopp__tittel').should('be.visible').and('have.text', 'Søknad om sykepenger')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })


    it('Søknad ANSVARSERKLARING - steg 1', function() {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('LOMMEN BARNEHAVE')
        cy.contains('Opplysninger fra sykmeldingen').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
            .click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad ENKELTSTAENDE_BEHANDLINGSDAGER - steg 2', function() {
        cy.url().should('include', `${soknad.id}/2`)

        // Sjekk at sykmelding er minimert
        cy.get('.sykmelding-perioder').should('not.be.visible')

        cy.contains('Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 24. april 2020?')
        cy.get('.skjema__beh-dager').contains('1').click({ force: true })
        cy.get('.skjema__beh-dager').contains('10').click({ force: true })
        cy.get('.skjema__beh-dager').contains('16').click({ force: true })
        cy.get('.skjema__beh-dager').contains('15').click({ force: true })
        cy.get('.skjema__beh-dager').contains('fjern').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER - steg 3', function() {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687382]').should('include.text', 'andre arbeidsforhold')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687382').click()
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687383_0').click()
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.')

        cy.contains('Gå videre').click()
    })

    it('Søknad VAER_KLAR_OVER_AT - steg 4', function() {
        cy.url().should('include', `${soknad.id}/4`)
        cy.get('.skjemaelement__label').click({ force: true })
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        // Sendt til
        // cy.contains('Søknaden er sendt til NAV');

        // Kvittering
        cy.contains('Hva skjer videre?')
        cy.contains('NAV behandler søknaden din').should('be.visible')
        cy.contains('Når blir pengene utbetalt?').should('be.visible')
        cy.contains('Viktig for arbeidstaker').should('be.visible')
        cy.contains('Viktig for selvstendige næringsdrivende og frilansere').should('be.visible')

        // Kvittering minimert
        cy.contains('Hva skjer videre?').click({ force: true })
        cy.contains('NAV behandler søknaden din').should('not.be.visible')

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager').should('not.be.visible')
        cy.contains('Opplysninger fra sykmeldingen').click({ force: true })
        cy.contains('1. april - 24. april 2020 • 24 dager').should('be.visible')

        // Oppsummering
        cy.contains('Oppsummering').click({ force: true })
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.')
    })
})
