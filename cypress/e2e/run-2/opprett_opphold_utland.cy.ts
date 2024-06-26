import { arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger } from '../../../src/data/mock/data/soknad/soknader-integration'

describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING - steg 1', function () {
        cy.url().should('include', `${arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger.id}/1`)

        // Godkjenne ANSVARSERKLARING
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click()

        cy.contains('Gå videre').click()
    })

    it('Vi åpner opprettelse av søknad siden', function () {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')
        cy.contains('Søknad om å beholde sykepenger utenfor EU/EØS')
        cy.contains('Fortsett til søknaden').click()
    })

    it('Vi er på søknaden for å beholde søknader', function () {
        cy.contains('Søknad om å beholde sykepenger utenfor EU/EØS')
        cy.url().should('not.include', arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger.id)
        cy.url().should('include', `/1`)
        cy.contains('Når skal du reise?')
        cy.contains('Gå videre')
    })
})
