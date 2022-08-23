import { arbeidstaker } from '../../../src/data/mock/data/soknader-opplaering'

describe('Tester arbeidstakersøknad', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = arbeidstaker

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.contains('Før du begynner').should('not.exist')
        cy.contains('Det du fyller ut brukes til å vurdere om du har rett til sykepenger').should('not.exist')

        // Personvern erklæring
        cy.get('.frist-sykepenger').click()
        cy.contains('Les mer om hvordan NAV behandler personopplysninger').click()
        cy.contains('Slik behandler NAV personopplysningene dine')
        cy.contains('Søknaden din vil bli behandlet automatisk hvis NAV har tilstrekkelige opplysninger')
        cy.get('.no-border > .navds-body-short').contains('Lukk').click()

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('POSTEN NORGE AS, BÆRUM')
        cy.contains('100% sykmeldt')
        cy.contains('Sykmeldingen din er lang, derfor er den delt opp i flere søknader om sykepenger').should(
            'not.exist'
        )

        cy.contains('Opplysninger fra sykmeldingen').click({ force: true })

        // Avbryt dialog vises
        cy.contains('Jeg vil ikke bruke denne søknaden').click()
        cy.get('.modal__avbryt_popup button:contains(Nei, jeg vil bruke søknaden)').click()
        cy.get('.modal__avbryt_popup button:contains(Nei, jeg vil bruke søknaden)').should('not.exist')

        // Må godkjenne ANSVARSERKLARING først
        cy.contains('Gå videre').click()
        cy.contains('Det er 1 feil i skjemaet')
        cy.get('.navds-confirmation-panel__inner').should('exist')
        cy.contains('Du må bekrefte at du har lest og forstått informasjonen før du kan gå videre')
        cy.get('.navds-checkbox__label').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad TILBAKE_I_ARBEID ', function () {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når begynte du å jobbe igjen?')
        cy.get('.ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('20').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad FERIE_V2', function () {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når tok du ut feriedager?')
        cy.get('#687344_0 .fom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('16').click()
        cy.get('#687344_0 .tom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('23').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad PERMISJON_V2', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.contains('Hva mener vi med permisjon')
        cy.contains('Med permisjon mener vi dager du var borte fra jobben av andre grunner enn sykdom').should(
            'not.exist'
        )
        cy.contains('Hva mener vi med permisjon').click()
        cy.contains('Med permisjon mener vi dager du var borte fra jobben av andre grunner enn sykdom').should('exist')

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når tok du permisjon?')
        cy.get('#687346_0 .fom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('14').click()
        cy.get('#687346_0 .tom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('22').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad UTLAND_V2 ', function () {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når var du utenfor EØS?')
        cy.get('#687348_0 .fom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('14').click()
        cy.get('#687348_0 .tom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('22').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad JOBBET_DU_100_PROSENT', function () {
        cy.url().should('include', `${soknad.id}/6`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains(
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.'
        )
        cy.get('.undersporsmal .navds-text-field__input#687350').focus().type('9')

        // Underspørsmål 2
        cy.contains('Hvor mye jobbet du tilsammen 1. - 24. april 2020?')
        // Svarer prosent
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=Prosent]').focus().click({ force: true })
        cy.get('.undersporsmal .navds-text-field__input#687353').focus().type('21')
        // Velger timer
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=Timer]').focus().click({ force: true })
        cy.contains('Antall timer du skrev inn, betyr at du har jobbet').should('not.exist')
        // Svarer timer
        cy.get('.undersporsmal .navds-text-field__input#687355').focus().type('21')
        cy.contains('Er prosenten lavere enn du forventet?').should('not.exist')
        // Denne personen har vært tilbake i arbeid 20 april, har hatt ferie 16-23 april, og hatt permisjon 14-22 april
        cy.get('.undersporsmal .navds-alert--info').should(
            'contain',
            'Antall timer du skrev inn, betyr at du har jobbet 129% av det du gjør når du er frisk.'
        )

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER', function () {
        cy.url().should('include', `${soknad.id}/7`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687358]')
            .should('include.text', 'andre arbeidsforhold')
            .click({ force: true })
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687359_0').click({ force: true })
        cy.contains(
            'Du må sende egen sykepengesøknad for dette. ' +
                'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.'
        )

        // Svarer NEI
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687360]').should('include.text', 'selvstendig næringsdrivende')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687360').click({
            force: true,
        })
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687361_1').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad UTDANNING', function () {
        cy.url().should('include', `${soknad.id}/8`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?')
        cy.get('.ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('10').click()

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?')
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687371_0').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/9`)

        cy.contains('Oppsummering fra søknaden').click({ force: true })
        cy.contains('Jeg bekrefter at jeg vil gi så riktige og fullstendige opplysninger som mulig.')
        cy.contains('Det er 1 feil i skjemaet').should('not.exist')

        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.'
        )
        cy.contains('Søknaden sendes til NAV. Kopi av søknaden sendes til POSTEN NORGE AS, BÆRUM.')

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
