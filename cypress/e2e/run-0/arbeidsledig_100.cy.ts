import { arbeidsledig } from '../../../src/data/mock/data/soknader-opplaering'

describe('Tester arbeidsledigsøknad', () => {
    const soknad = arbeidsledig

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', () => {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', () => {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('100% sykmeldt')
        cy.contains('Opplysninger fra sykmeldingen').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains('Jeg bekrefter at jeg vil gi så riktige og fullstendige opplysninger som mulig.').click({
            force: true,
        })

        cy.contains('Gå videre').click()
    })

    it('Søknad FRISKMELDT', () => {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Fra hvilken dato trengte du ikke lenger sykmeldingen?')
        cy.get('.ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('20').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER', () => {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.contains('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?')
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Når ingen velges så dukker bare 1 feilmelding opp
        cy.contains('Gå videre').click()
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppgi hvilke inntektskilder du har')

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke inntektskilder har du hatt?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687404]').should('include.text', 'andre arbeidsforhold')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687404').click({
            force: true,
        })
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687405_0').click({ force: true })
        cy.contains(
            'Du må sende egen sykepengesøknad for dette. ' +
                'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.'
        )

        cy.contains('Gå videre').click()
    })

    it('Søknad UTDANNING', () => {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?')
        cy.get('.ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('10').click()

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?')
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687421_0').click({ force: true })

        cy.contains('Gå videre').click({ force: true })
    })

    it('Søknad ARBEIDSLEDIG_UTLAND', () => {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.contains('Var du på reise utenfor EU/EØS/Storbritannia mens du var sykmeldt 1. - 24. april 2020?')
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når var du utenfor EU/EØS/Storbritannia?')
        cy.get('#687423_0 .fom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('17').click()
        cy.get('#687423_0 .tom .ds-datepicker__calendarButton').click({
            force: true,
        })
        cy.get('.DayPicker-Day').contains('24').click()

        // Underspørsmål 2
        cy.contains('Har du søkt om å beholde sykepengene for disse dagene?')
        cy.get('.skjemaelement__label[for=687424_0]').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad VAER_KLAR_OVER_AT', () => {
        cy.url().should('include', `${soknad.id}/6`)
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.'
        )
        cy.contains('Søknaden sendes til').should('not.exist')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        // Hva skjer videre
        cy.get('.opplysninger.navds-alert--info')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'NAV behandler søknaden din')
            .and('contain', 'Når blir pengene utbetalt?')
    })
})
