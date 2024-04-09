import { avbruttSoknad } from '../../../src/data/mock/data/soknad/arbeidstaker-avbrutt'
import { modalAktiv, modalIkkeAktiv, svarFritekst } from '../../support/utilities'

describe('Tester avbryting av søknad', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Avbrutt søknad har forventa tekst', function () {
        cy.get(`a[href*=${avbruttSoknad.id}]`)
            .should('contain.text', '1. – 24. april')
            .should('contain.text', 'Avbrutt av deg')
    })

    it('Ved klikk så åpnes avbrutt søknad visning', function () {
        cy.get(`a[href*=${avbruttSoknad.id}]`).click()
        cy.url().should('include', `avbrutt/${avbruttSoknad.id}`)
    })

    it('Avbrutt tekster stemmer', function () {
        cy.contains('Søknaden ble avbrutt av deg')
        cy.contains('12. juni 2020')
        cy.contains('Det betyr at du ikke vil få sykepenger basert på denne søknaden')
        cy.contains(
            'For å få sykepenger fra NAV, må du søke. Så hvis du ikke har sendt inn søknad som gjelder samme periode og samme arbeidsgiver på papir, vil du ikke få sykepenger fra NAV for denne perioden.',
        )
        cy.contains('Hvis du er sykmeldt fra flere arbeidsgivere, må du sende én søknad for hver arbeidsgiver.')
        cy.contains(
            'Hvis du vil søke om sykepenger basert på denne søknaden likevel, må du gjenåpne søknaden, fylle den ut og sende den inn.',
        )

        // Sykmelding
        cy.get('section[aria-label="Opplysninger fra sykmeldingen"] button').click()
        cy.contains('1. april - 24. april 2020 (24 dager)')
        cy.contains('Frist for å søke')
    })

    it('Søknad kan gjenåpnes med survey, som ikke besvares', () => {
        cy.get('button[data-cy="bruk-soknad-likevel"]').click()
        cy.url().should('include', 'visSurvey=true')

        modalAktiv()
        cy.get('dialog').get('section').should('have.class', 'w-full').and('not.have.class', 'mt-16 md:w-3/4')
        cy.contains('Du har gjenåpnet søknaden')
        cy.contains('Jeg vil ikke gi tilbakemelding').click()
        modalIkkeAktiv()

        cy.url().should('include', `${avbruttSoknad.id}/1`).and('include', 'visSurvey=false')
        cy.contains('Gå videre')
    })

    it('Søknad kan avsluttes og fortsette senere ', function () {
        cy.get('button[data-cy="avslutt-og-fortsett-senere"]').click()
        cy.contains('Vi lagrer søknaden din på Ditt sykefravær i listen med søknader om sykepenger.')
        cy.contains('Ja, fortsett senere')
        cy.contains('Nei').click()
    })

    it('Søknad avbrytes, med survey som besvares ', function () {
        // Avbryt dialog vises
        cy.contains('Jeg vil ikke bruke denne søknaden').click()
        modalAktiv()
        cy.contains('Ja, jeg er sikker').should('be.visible')
        cy.findByRole('button', { name: 'Ja, jeg er sikker' }).click()
        cy.url().should('include', 'visSurvey=true')

        modalAktiv()
        cy.get('dialog').get('section').should('have.class', 'w-full').and('not.have.class', 'mt-16 md:w-3/4')
        cy.contains('Hvorfor ønsket du å avbryte denne søknaden?')
        cy.contains('Arbeidsgiveren min betaler for hele sykefraværet').click()
        svarFritekst('Er det noe du vil trekke frem? (valgfritt)', 'Trenger ikke sykemelding da vel')

        cy.contains('Send tilbakemelding').click()
        modalIkkeAktiv()
        cy.url().should('include', `avbrutt/${avbruttSoknad.id}`).and('include', 'visSurvey=false')
        cy.contains('Jeg vil bruke denne søknaden likevel')
    })

    it('Søknad gjenåpnes med survey, som besvares', () => {
        cy.get('button[data-cy="bruk-soknad-likevel"]').click()
        cy.url().should('include', 'visSurvey=true')

        modalAktiv()
        cy.contains('Du har gjenåpnet søknaden')
        cy.contains('Jeg trengte mer tid og ville fortsette senere').click()
        svarFritekst('Er det noe du vil trekke frem? (valgfritt)', 'Trodde jeg kunne fortsette søknaden senere')
        cy.contains('Send tilbakemelding').click()
        modalIkkeAktiv()

        cy.url().should('include', `${avbruttSoknad.id}/1`).and('include', 'visSurvey=false')
        cy.contains('Gå videre')
    })

    it('Søknad kan avbrytes, med survey som ikke besvares ', function () {
        // Avbryt dialog vises
        cy.contains('Jeg vil ikke bruke denne søknaden').click()
        modalAktiv()
        cy.contains('Ja, jeg er sikker').should('be.visible')
        cy.findByRole('button', { name: 'Ja, jeg er sikker' }).click()
        cy.url().should('include', 'visSurvey=true')

        cy.contains('Hvorfor ønsket du å avbryte denne søknaden?')
        cy.contains('Jeg vil ikke gi tilbakemelding').click()
        modalIkkeAktiv()

        cy.url().should('include', `avbrutt/${avbruttSoknad.id}`).and('include', 'visSurvey=false')
        cy.contains('Jeg vil bruke denne søknaden likevel')
    })
})
