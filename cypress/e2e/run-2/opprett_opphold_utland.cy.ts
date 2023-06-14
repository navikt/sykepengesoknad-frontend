import { oppholdUtland } from '../../../src/data/mock/data/opphold-utland'
import { arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger } from '../../../src/data/mock/data/soknader-integration'

describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=alle-soknader')
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

    it('Søknad UTLANDSOPPHOLD_SOKT_SYKEPENGER - steg 2', function () {
        cy.url().should('include', `${arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger.id}/2`)

        // Test spørsmål
        cy.get('[data-cy="sporsmal-tittel"]').should('have.text', 'Sykepenger utenfor EØS')
        cy.contains('Har du søkt om å beholde sykepengene for de dagene du var utenfor EØS?')
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.get('.utland_infotekst')
            .should(
                'include.text',
                'Du må ha sendt en egen utenlandssøknad for å svare ja på dette spørsmålet. Husk at du også må fullføre denne søknaden om sykepenger.',
            )
            .find('a')
            .should('have.attr', 'href', '/syk/sykepengesoknad/sykepengesoknad-utland')

        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').click()

        cy.get('.utland_infotekst')
            .should(
                'include.text',
                'I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel søke NAV om å få reise ut av EØS og beholde sykepengene i en begrenset periode.',
            )
            .find('a')
            .should('have.attr', 'href', '/syk/sykepengesoknad/sykepengesoknad-utland')
    })

    it('Vi åpner opprettelse av søknad siden', function () {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')
        cy.contains('Søknad om å beholde sykepenger utenfor EØS')
        cy.contains('Fortsett til søknaden').click()
    })

    it('Vi er på søknaden for å beholde søknader', function () {
        cy.url().should('include', `${oppholdUtland.id}/1`)
        cy.contains('Søknad om å beholde sykepenger utenfor EØS')
        cy.contains('Når skal du reise?')
        cy.contains('Gå videre')
    })
})
