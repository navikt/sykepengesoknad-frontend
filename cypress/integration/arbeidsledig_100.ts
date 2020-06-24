import { soknaderOpplaering as soknader } from '../../src/data/mock/data/soknader-opplaering'
import { RSSoknad } from '../../src/types/rs-types/rs-soknad'

describe('Tester arbeidsledigsøknad', () => {
    //-----
    // Sykmelding: 470c9e25-e112-4060-be61-7a24af530889, arbeidsledig - 100%
    // Søknad: 934f39f4-cb47-459f-8209-0dbef6d36059, fom: 1.4.20, tom: 24.4.20
    //-----

    const soknad = soknader.find((sok: RSSoknad) => sok.id === '934f39f4-cb47-459f-8209-0dbef6d36059')!

    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om sykepenger')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING - steg 1', () => {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('100 % sykmeldt')
        cy.contains('Opplysninger fra sykmeldingen').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
            .click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad PERMITTERT_NAA - steg 2', () => {
        cy.url().should('include', `${soknad.id}/2`)

        // Sjekk at sykmelding er minimert
        cy.get('.sykmelding-perioder').should('not.be.visible')

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Velg første dag i permitteringen')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('20').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad PERMITTERT_PERIODE - steg 3', () => {
        cy.url().should('include', `${soknad.id}/3`)

        // Hovedspørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Periode 1
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_0').focus()
        cy.get('.flatpickr-calendar.open').contains('10').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('15').click({ force: true })

        // Periode 2 - overlapper
        cy.contains('+ Legg til ekstra periode').click()
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_1').focus()
        cy.get('.flatpickr-calendar.open').contains('12').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('20').click({ force: true })

        // Feilmelding
        cy.contains('Gå videre').click()
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du kan ikke legge inn perioder som overlapper med hverandre')

        // Endre periode 2
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_1').focus()
        cy.get('.flatpickr-calendar.open').contains('16').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('20').click({ force: true })
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_1')
            .should('have.value', '16.04.2020   -    20.04.2020')

        // Gå frem også tilbake
        cy.contains('Gå videre').click()
        cy.url().should('include', `${soknad.id}/4`)
        cy.contains('Tilbake').click()
        cy.url().should('include', `${soknad.id}/3`)

        // Periode 1 - hentSvar og formater
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_0')
            .should('have.value', '10.04.2020   -    15.04.2020')

        // Periode 1 - Må velge 2 datoer
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_0').focus()
        cy.get('.flatpickr-calendar.open').contains('10').click({ force: true })
        cy.contains('Gå videre').click()

        // Feilmelding
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppi en gyldig periode')

        // Endre periode 1
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_0').focus()
        cy.get('.flatpickr-calendar.open').contains('10').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('10').click({ force: true })
        cy.get('.undersporsmal .skjemaelement__input.form-control#687399_t_0')
            .should('have.value', '10.04.2020   -    10.04.2020')

        cy.contains('Gå videre').click()
    })

    it('Søknad FRISKMELDT - steg 4', () => {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Fra hvilken dato har du ikke lenger behov for sykmelding?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('20').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER - steg 5', () => {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.contains('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020? Du trenger ikke oppgi penger fra NAV.')
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke inntektskilder har du hatt?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687404]').should('include.text', 'andre arbeidsforhold')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687404').click({ force: true })
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687405_0').click({ force: true })
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.')

        cy.contains('Gå videre').click()
    })

    it('Søknad UTDANNING - steg 6', () => {
        cy.url().should('include', `${soknad.id}/6`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('10').click({ force: true })

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?')
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687421_0').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad ARBEIDSLEDIG_UTLAND - steg 7', () => {
        cy.url().should('include', `${soknad.id}/7`)

        // Test spørsmål
        cy.contains('Var du på reise utenfor EØS mens du var sykmeldt 1. - 24. april 2020?')
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når var du utenfor EØS?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('17').click({ force: true })
        cy.get('.flatpickr-calendar').contains('24').click({ force: true })

        // Underspørsmål 2
        cy.contains('Har du søkt om å beholde sykepengene for disse dagene?')
        cy.get('.skjemaelement__label[for=687424_0]').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad VAER_KLAR_OVER_AT - steg 8', () => {
        cy.url().should('include', `${soknad.id}/8`)
        cy.get('.skjemaelement__label').click({ force: true })
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.')
        cy.contains('Søknaden sendes til').should('not.exist')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        // TODO: Legg til test når kvittering er ferdig
    })
})
