import { avbruttSoknad } from '../../../src/data/mock/data/soknad/arbeidstaker-avbrutt'
import { modalAktiv, modalIkkeAktiv } from '../../support/utilities'

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

    it('Søknad kan gjenåpnes', function () {
        cy.get('button[data-cy="bruk-soknad-likevel"]').click()
        cy.url().should('include', `${avbruttSoknad.id}/1`)
        cy.contains('Gå videre')
    })

    it('Søknad kan avsluttes og fortsette senere ', function () {
        cy.get('button[data-cy="avslutt-og-fortsett-senere"]').click()
        cy.contains('Vi lagrer søknaden din på Ditt sykefravær i listen med søknader om sykepenger.')
        cy.contains('Ja, fortsett senere')
        cy.contains('Nei').click()
    })

    it('Søknad kan avbrytes ', function () {
        // Avbryt dialog vises
        cy.contains('Jeg har ikke behov for denne søknaden').click()
        modalAktiv()
        cy.contains('Nei, jeg vil bruke søknaden').should('be.visible')
        cy.findByRole('button', { name: 'Nei, jeg vil bruke søknaden' }).click()
        modalIkkeAktiv()
        cy.contains('Nei, jeg vil bruke søknaden').should('not.be.visible')
        cy.contains('Jeg har ikke behov for denne søknaden').should('be.visible').click()
        modalAktiv()
        cy.contains('Ja, jeg er sikker').should('be.visible')

        cy.findByRole('button', { name: 'Ja, jeg er sikker' }).click()
        modalIkkeAktiv()
        cy.url().should('include', `avbrutt/${avbruttSoknad.id}`)
        cy.contains('Jeg vil bruke denne søknaden likevel')
    })
})
