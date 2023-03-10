import { behandlingsdager } from '../../../src/data/mock/data/opplaering'

describe('Tester behandlingsdagersøknad', () => {
    //-----
    // Sykmelding: e876fe08-2765-4bd6-966c-922eefe99382, arbeidstaker - behandlingsdager
    // Søknad: bcb032ac-b6dd-4ae7-8e73-9e64f1b35182, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = behandlingsdager

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING - steg 1', function () {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('POSTEN NORGE AS, BÆRUM')
        cy.contains('1 behandlingsdag')
        cy.contains('Opplysninger fra sykmeldingen').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click({
            force: true,
        })

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
        cy.get('.rdp-day').contains('1').click({ force: true })
        cy.get('.rdp-day').contains('10').click({ force: true })
        cy.get('.rdp-day').contains('16').click({ force: true })
        cy.get('.rdp-day').contains('15').click({ force: true })
        cy.get('.rdp-day').contains('1').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER - steg 3', function () {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687382]').should('include.text', 'andre arbeidsforhold')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687382').click()
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687383_0').click({ force: true })
        cy.contains(
            'Du må sende egen sykepengesøknad for dette. ' +
                'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
        )

        cy.contains('Gå videre').click()
    })

    it('Tilbake og videre', function () {
        cy.contains('Tilbake').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad VAER_KLAR_OVER_AT - steg 4', function () {
        cy.url().should('include', `${soknad.id}/4`)
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )
        cy.contains('Søknaden sendes til NAV.')

        cy.get('.oppsummering').click()
        cy.get('.oppsummering__sporsmal')
            .contains('31. mars – 3. april')
            .siblings()
            .should('contain', 'Ikke til behandling')
        cy.get('.oppsummering__sporsmal').contains('6. – 10. april').siblings().should('contain', '10. april')
        cy.get('.oppsummering__sporsmal').contains('13. – 17. april').siblings().should('contain', '15. april')
        cy.get('.oppsummering__sporsmal').contains('20. – 24. april')
        cy.get('.oppsummering__sporsmal').contains('Ikke til behandling')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('.hva-skjer')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Før NAV kan behandle søknaden')
            .and('contain', 'Hvorfor går det et skille ved 16 dager?')
            .and('contain', 'Hva er en inntektsmelding')
            .and('contain', 'NAV behandler søknaden')
            .and('contain', 'Når blir pengene utbetalt')
    })
})
