import { arbeidstakerGradert } from '../../../src/data/mock/data/opplaering'

describe('Tester arbeidstakersøknad - gradert 50%', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('POSTEN NORGE AS, BÆRUM')
        cy.contains('50% sykmeldt')
        cy.contains('Opplysninger fra sykmeldingen').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click({
            force: true,
        })

        cy.contains('Gå videre').click()
    })

    it('Tilbake til ANSVARSERKLARING og frem igjen', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.contains('Tilbake').click()
        cy.url().should('include', `${soknad.id}/1`)
        cy.contains('Gå videre').click()
    })

    it('Søknad FRAVAR FOR SYKMELDINGEN', function () {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        cy.contains(
            'Hvilke dager var du syk og borte fra jobb, før du ble sykmeldt? Du trenger bare oppgi dager før 1. april 2020.',
        )
        cy.get('#687299_0 .fom .ds-datepicker__calendarButton').click()

        cy.get('.DayPicker-Day').contains('11').click()
        cy.get('#687299_0 .tom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('12').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad TILBAKE_I_ARBEID', function () {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })
        cy.contains('Når begynte du å jobbe igjen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('20').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad FERIE_V2', function () {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })
        cy.contains('Når tok du ut feriedager?')
        cy.get('#687305_0 .fom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('16').click()
        cy.get('#687305_0 .tom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('23').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad PERMISJON_V2', function () {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })
        cy.contains('Når tok du permisjon?')
        cy.get('#687307_0 .fom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('14').click()
        cy.get('#687307_0 .tom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('22').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad UTLAND_V2', function () {
        cy.url().should('include', `${soknad.id}/6`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })
        cy.contains('Når var du utenfor EØS?')
        cy.get('#687309_0 .fom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('14').click()
        cy.get('#687309_0 .tom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('22').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad JOBBET_DU_GRADERT', function () {
        cy.url().should('include', `${soknad.id}/7`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Hvor mye jobbet du tilsammen 1. - 24. april 2020?')
        cy.contains('Velg timer eller prosent')
        // Svarer prosent
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=Prosent]').focus().click({ force: true })
        cy.get('.undersporsmal .navds-text-field__input#13acfccb-3f39-3893-8054-058270add6ab').focus().type('51')
        // Svarer timer
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=Timer]').focus().click({ force: true })
        // Ferie/permisjon/tilbake i arbeid dekker alle datoer fra dag 14.
        // Gradkalkulatoren dermed vil regne ut at man har hatt 9 arbeidsdager i denne perioden
        // 12 timer * (9 dager/5) * 0.5 (50% sykefraværsgrad) = 10.8 timer, så vi prøver litt lavere enn det
        cy.get('.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539').focus().type('10.7')

        // Underspørsmål 2
        cy.contains(
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
        )
        cy.get('.undersporsmal .navds-text-field__input#495730df-717d-3774-bd19-e6bcf76e3ba2').focus().type('12')

        cy.contains('Gå videre').click()

        cy.contains('Er prosenten lavere enn du forventet?')
        cy.get('.undersporsmal .navds-alert--info').should('not.exist')

        // Feilmelding
        cy.get('.skjemaelement__feilmelding').contains('Timene utgjør mindre enn 50 %.')
        cy.contains(
            'Antall timer du skrev inn, betyr at du har jobbet 49 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
        )

        // Endre timer til 11, som er mer enn 10.8
        cy.get('.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539')
            .focus()
            .type('{selectall}')
            .type('11')

        cy.contains('Gå videre').click()
    })

    it('Søknad ARBEID_UTENFOR_NORGE', function () {
        cy.url().should('include', `${soknad.id}/8`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })
        cy.contains('Har du arbeidet i utlandet i løpet av de siste 12 månedene?')

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER_V2', function () {
        cy.url().should('include', `${soknad.id}/9`)

        cy.contains('Har du andre inntektskilder enn Posten Norge AS, Bærum?')

        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        cy.contains('Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei')
        cy.get('.undersporsmal .checkboxgruppe label[for=d9ac4359-5519-34f1-b59d-b5ab24e55821]').should(
            'include.text',
            'ansatt et annet sted enn nevnt over',
        )
        cy.get('.undersporsmal .checkboxgruppe .checkboks#d9ac4359-5519-34f1-b59d-b5ab24e55821').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad UTDANNING', function () {
        cy.url().should('include', `${soknad.id}/10`)

        // Test spørsmål
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('10').click()

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?')
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687333_0').click({ force: true })

        cy.contains('Gå videre').click()
    })

    it('Søknad ANSVARSERKLARING ', function () {
        cy.url().should('include', `${soknad.id}/11`)
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )
        cy.contains('Søknaden sendes til POSTEN NORGE AS, BÆRUM med kopi til NAV.')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('.hva-skjer')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får sykepengene fra arbeidsgiveren din')
    })
})
