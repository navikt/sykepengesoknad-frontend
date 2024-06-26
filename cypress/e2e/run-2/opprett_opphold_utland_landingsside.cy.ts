
describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })


    it('Søknad ANSVARSERKLARING - steg 1', function () {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')
        cy.contains('Søknad om å beholde sykepenger utenfor EU/EØS')
        cy.contains('Du trenger ikke søke hvis du enten')
        cy.contains('Har du allerede vært på reise?')
        cy.contains('Er du statsborger i et land utenfor EU/EØS?')
        cy.contains('Fortsett til søknaden')
    })

})
