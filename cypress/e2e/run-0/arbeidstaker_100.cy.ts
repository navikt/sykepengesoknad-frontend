import { checkViStolerPaDeg, klikkGaVidere, setPeriodeFraTil, sjekkIntroside } from '../../support/utilities'
import { inlineForklaringer } from '../../support/sjekkInlineForklaringKvittering'
import { arbeidstaker } from '../../../src/data/mock/data/soknad/arbeidstaker'

describe('Tester arbeidstakersøknad', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = arbeidstaker

    before(() => {
        cy.visit('/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/1`)

        sjekkIntroside()

        // Personvern erklæring
        cy.contains('Slik behandler NAV personopplysningene dine').click()

        // Avbryt dialog vises
        cy.contains('Jeg har ikke behov for denne søknaden').click()
        cy.findByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()

        // Må godkjenne ANSVARSERKLARING først
        cy.contains('Start søknad').click()
        cy.contains('Det er 1 feil i skjemaet')
        cy.get('.navds-confirmation-panel__inner').should('exist')
        cy.contains('Du må bekrefte at du har lest og forstått informasjonen før du kan gå videre')
        checkViStolerPaDeg()
    })

    it('Søknad TILBAKE_I_ARBEID ', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.get('.navds-progress-bar')
            .should('have.attr', 'aria-valuenow', '1')
            .and('have.attr', 'aria-valuemax', '7')
            .and('have.attr', 'aria-valuetext', '1 av 7')

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når begynte du å jobbe igjen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('20').click()
        cy.contains(
            'Svaret ditt betyr at du har vært i fullt arbeid fra 20. – 24. april 2020. Du får ikke utbetalt sykepenger for denne perioden',
        )
    })

    it('Søknad TILBAKE_I_ARBEID går videre ', function () {
        // I egen test for å sjekke axe på hjelpetekst
        klikkGaVidere()
    })

    it('Søknad FERIE_V2', function () {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du ut feriedager?')

        setPeriodeFraTil(16, 23)
        klikkGaVidere()
    })

    it('Søknad PERMISJON_V2', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.contains('Spørsmålet forklart')
        cy.contains('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom').should('not.be.visible')
        cy.contains('Spørsmålet forklart').click()
        cy.contains('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom').should('exist')

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du permisjon?')

        setPeriodeFraTil(14, 22)

        klikkGaVidere()
    })

    it('Søknad ARBEID_UNDERVEIS_100_PROSENT', function () {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.contains(
            'I perioden 1. - 24. april 2020 var du 100 % sykmeldt fra Posten Norge AS, Bærum. Jobbet du noe hos Posten Norge AS, Bærum i denne perioden?',
        )
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        cy.contains('Oppgi arbeidsmengde i timer eller prosent')
        // Svarer prosent
        cy.get('.undersporsmal input[value=Prosent]').click()
        cy.contains(
            'Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos Posten Norge AS, Bærum i perioden 1. - 24. april 2020?',
        )
        cy.get('.undersporsmal .navds-text-field__input#796cf7ed-8a7e-39de-9cbc-6e789aa5af3f').type('21')
        // Velger timer
        cy.get('.undersporsmal input[value=Timer]').click()
        cy.contains('Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum')
        cy.contains('Antall timer du skrev inn, betyr at du har jobbet').should('not.exist')
        // Svarer timer
        cy.get('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').type('21')
        cy.contains('Er prosenten lavere enn du forventet?').should('not.exist')

        // Underspørsmål 2
        cy.contains('Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?')
        cy.get('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()

        klikkGaVidere()
    })

    it('Søknad ANDRE_INNTEKTSKILDER_V2', function () {
        cy.url().should('include', `${soknad.id}/6`)

        cy.contains('Har du andre inntektskilder enn nevnt over?')

        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.contains('Velg inntektskildene som passer for deg:')
            .parent()
            .contains('Ansatt andre steder enn nevnt over')
            .parent()
            .click()

        cy.contains(
            'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
        )
            .parent()
            .find('input[type="radio"][value="JA"]')
            .click()

        cy.contains('Velg inntektskildene som passer for deg:')
            .parent()
            .contains('Selvstendig næringsdrivende')
            .parent()
            .click()

        klikkGaVidere()
    })

    it('Søknad OPPHOLD_UTENFOR_EOS ', function () {
        cy.url().should('include', `${soknad.id}/7`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når var du utenfor EU/EØS?')

        setPeriodeFraTil(14, 22)

        klikkGaVidere()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/8`)

        cy.get('.navds-progress-bar')
            .should('have.attr', 'aria-valuenow', '7')
            .and('have.attr', 'aria-valuemax', '7')
            .and('have.attr', 'aria-valuetext', '7 av 7')

        it('Bekreftelsespunktene er riktige', () => {
            const bekreftelser = [
                'Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.',
                'Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.',
                'Retten til sykepenger gjelder bare pensjonsgivende inntekt du har på sykmeldingstidspunktet.',
                'NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.',
                'Fristen for å søke sykepenger er som hovedregel 3 måneder',
                'Du kan endre svarene i denne søknaden opp til 12 måneder etter du sendte den inn første gangen.',
            ]

            bekreftelser.forEach((bekreftelse) => {
                cy.contains(bekreftelse)
            })

            cy.contains(
                'Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.',
            )
                .find('a')
                .should('have.attr', 'href', 'https://www.nav.no/skriv-til-oss')

            cy.contains(
                'Du må melde fra om studier som er påbegynt etter at du ble sykmeldt, og som ikke er avklart med NAV. Det samme gjelder hvis du begynner å studere mer enn du gjorde før du ble sykmeldt.',
            )
                .find('a')
                .should('have.attr', 'href', 'https://www.nav.no/skriv-til-oss')

            cy.contains('Du kan lese mer om rettigheter og plikter på')
                .find('a')
                .should('have.attr', 'href', 'https://www.nav.no/sykepenger')
        })

        cy.get('section[aria-label="Oppsummering fra søknaden"] button').click()
        cy.contains('Jeg vil svare så godt jeg kan på spørsmålene i søknaden.')

        cy.get('.oppsummering').within(() => {
            cy.contains('Jobber du vanligvis 37,5 timer i uka')
            cy.contains('21 timer')
        })

        cy.contains('Det er 1 feil i skjemaet').should('not.exist')

        cy.get('.navds-checkbox__label').click()
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )
        cy.contains('Søknaden sendes til NAV. Kopi av søknaden sendes til Posten Norge AS, Bærum.')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('[data-cy="kvittering"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Før NAV kan behandle søknaden')
            .and('contain', 'NAV behandler søknaden')
            .and('contain', 'Når blir pengene utbetalt')

        inlineForklaringer()
    })
})
