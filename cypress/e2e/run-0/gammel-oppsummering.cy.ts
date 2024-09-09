import { klikkGaVidere, setPeriodeFraTil, sporsmalOgSvar } from '../../support/utilities'
import { inlineForklaringer } from '../../support/sjekkInlineForklaringKvittering'
import { arbeidtakerMedGammelOppsummering } from '../../../src/data/mock/data/soknad/arbeidstaker'

describe('Sjekker at søknader med gammel oppsummering ser ok ut', () => {
    const soknad = arbeidtakerMedGammelOppsummering()

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=gammel-oppsummering')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.contains('Før du begynner').should('not.exist')
        cy.contains('Det du fyller ut brukes til å vurdere om du har rett til sykepenger').should('not.exist')

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
        cy.get('.navds-checkbox__label').click()

        cy.contains('Start søknad').click()
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

        cy.contains('Spørsmålet forklart')
        cy.contains('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom').should('not.be.visible')
        cy.contains('Spørsmålet forklart').click()
        cy.contains('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom').should('exist')

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når tok du permisjon?')

        setPeriodeFraTil(14, 22)

        cy.contains('Gå videre').click()
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

        cy.contains('Gå videre').click()
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

        cy.contains('Gå videre').click()
    })

    it('Søknad OPPHOLD_UTENFOR_EOS ', function () {
        cy.url().should('include', `${soknad.id}/7`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når var du utenfor EU/EØS?')

        setPeriodeFraTil(14, 22)

        cy.contains('Gå videre').click()
    })

    it('Søknad TIL_SLUTT', function () {
        cy.url().should('include', `${soknad.id}/8`)

        cy.get('.navds-progress-bar')
            .should('have.attr', 'aria-valuenow', '7')
            .and('have.attr', 'aria-valuemax', '7')
            .and('have.attr', 'aria-valuetext', '7 av 7')

        cy.get('.navds-guide-panel__content').contains(
            'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
        )

        cy.get('[data-cy="oppsummering-fra-søknaden"]').within(() => {
            sporsmalOgSvar('Søknaden sendes til', 'NAV').and('contain', 'Posten Norge AS, Bærum')
            //Arbeid underveis i sykefravær
            sporsmalOgSvar('Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
                .children()
                .within(() => {
                    sporsmalOgSvar(
                        'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                        '21 timer',
                    )
                })
            sporsmalOgSvar('Jobber du vanligvis 37,5 timer i uka', 'Ja')

            //Andre inntektskilder
            sporsmalOgSvar('Har du andre inntektskilder enn Butikken?', 'Ja')
            sporsmalOgSvar('Velg inntektskildene som passer for deg:', 'Ansatt andre steder enn nevnt over')
                .children()
                .within(() => {
                    sporsmalOgSvar(
                        'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
                        'Ja',
                    )
                })
            sporsmalOgSvar('Velg inntektskildene som passer for deg:', 'Selvstendig næringsdrivende')
        })

        cy.contains('Det er 1 feil i skjemaet').should('not.exist')

        //kan trykke på forrige steg knapp øverst
        cy.contains('Forrige steg')
            .and('have.attr', 'href', `/soknader/${soknad.id}/7?testperson=gammel-oppsummering`)
            .click()
        klikkGaVidere()

        //Trykker på Endre svar og havner på første spørsmål
        cy.contains('Endre svar').click()
        cy.contains('Steg 1 av 7')
        cy.findByRole('button', { name: 'Vis alle steg' }).click()
        cy.findByRole('link', { name: 'Oppsummering fra søknaden' }).click()
        cy.contains('Steg 7 av 7')

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
