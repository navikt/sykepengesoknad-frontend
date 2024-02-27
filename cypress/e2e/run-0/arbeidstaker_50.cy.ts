import { setPeriodeFraTil } from '../../support/utilities'
import { arbeidstakerGradert } from '../../../src/data/mock/data/soknad/arbeidstaker-gradert'

describe('Tester arbeidstakersøknad - gradert 50%', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 (24 dager)')
        cy.contains('Posten Norge AS, Bærum')
        cy.contains('50% sykmeldt')
        cy.get('section[aria-label="Opplysninger fra sykmeldingen"] button').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click()

        cy.contains('Gå videre').click()
    })

    it('Tilbake til ANSVARSERKLARING og frem igjen', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.contains('Tilbake').click()
        cy.url().should('include', `${soknad.id}/1`)
        cy.contains('Gå videre').click()
    })

    it('Søknad TILBAKE_I_ARBEID', function () {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når begynte du å jobbe igjen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('20').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad FERIE_V2', function () {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du ut feriedager?')

        setPeriodeFraTil(16, 23)

        cy.contains('Gå videre').click()
    })

    it('Søknad PERMISJON_V2', function () {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du permisjon?')

        setPeriodeFraTil(14, 22)

        cy.contains('Gå videre').click()
    })

    it('Søknad JOBBET_DU_GRADERT', function () {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        cy.contains(
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
        )
        cy.get('.undersporsmal .navds-text-field__input#495730df-717d-3774-bd19-e6bcf76e3ba2').type('12')

        // Underspørsmål 2
        cy.contains('Hvor mye jobbet du tilsammen 1. - 24. april 2020?')
        cy.contains('Velg timer eller prosent')
        // Svarer prosent
        cy.get('.undersporsmal input[value=Prosent]').click()
        cy.get('.undersporsmal .navds-text-field__input#13acfccb-3f39-3893-8054-058270add6ab').type('51')
        // Svarer timer
        cy.get('.undersporsmal input[value=Timer]').click()
        // Ferie/permisjon/tilbake i arbeid dekker alle datoer fra dag 14.
        // Gradkalkulatoren dermed vil regne ut at man har hatt 9 arbeidsdager i denne perioden
        // 12 timer * (9 dager/5) * 0.5 (50% sykefraværsgrad) = 10.8 timer, så vi prøver litt lavere enn det
        cy.get('.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539').type('10.7')

        cy.contains('Gå videre').click()

        cy.get('.navds-read-more__button').contains('Er prosenten lavere enn du forventet?')

        // Feilmelding
        cy.get('[data-cy="feil-lokal"]').contains('Timene utgjør mindre enn 50 %.')
        cy.contains(
            'Antall timer du skrev inn, betyr at du har jobbet 49 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
        )

        // Endre timer til 11, som er mer enn 10.8
        cy.get('.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539').clear()
        cy.get('.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539').type('11')

        cy.contains('Gå videre').click()
    })

    it('Søknad ARBEID_UTENFOR_NORGE', function () {
        cy.url().should('include', `${soknad.id}/6`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Har du arbeidet i utlandet i løpet av de siste 12 månedene?')

        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER_V2', function () {
        cy.url().should('include', `${soknad.id}/7`)

        cy.contains('Har du andre inntektskilder enn nevnt over?')

        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.contains('Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei')
        cy.get('.undersporsmal .navds-checkbox label[for=d9ac4359-5519-34f1-b59d-b5ab24e55821]').should(
            'include.text',
            'ansatt et annet sted enn nevnt over',
        )
        cy.get('input[type=checkbox]#d9ac4359-5519-34f1-b59d-b5ab24e55821').click()
        cy.contains('Gå videre').click()
    })

    it('Søknad UTLAND_V2', function () {
        cy.url().should('include', `${soknad.id}/8`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når var du utenfor EØS?')

        setPeriodeFraTil(14, 22)
        cy.contains('Gå videre').click()
    })

    it('Søknad ANSVARSERKLARING ', function () {
        cy.url().should('include', `${soknad.id}/9`)
        cy.contains('Til slutt')
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )
        cy.get('.navds-checkbox__label').click()
        cy.contains('Søknaden sendes til Posten Norge AS, Bærum med kopi til NAV.')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('[data-cy="kvittering"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får sykepengene fra arbeidsgiveren din')
            .and('not.contain', 'Vi trenger inntektsopplysninger fra deg')
    })
})
