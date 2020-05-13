/* eslint-disable no-undef */

describe('Tester arbeidstakersøknad', () => {
    it('Laster startside', function() {
        cy.visit('http://localhost:8080/nysykepengesoknad');
        cy.get('.sidetopp__tittel').should('be.visible').and('have.text', 'Søknader om sykepenger');
        cy.contains('Gjelder perioden 1. – 10. juni 2019').click();
    })
    it('Søknad steg 1', function() {
        cy.url().should('include', '977ce8fc-a83a-4454-ab81-893ff0284437/1');

        // Sykmelding
        cy.contains('16. aug. - 17. sep. 2019 • 33 dager')
        cy.contains('18. sep. - 25. sep. 2019 • 8 dager')
        cy.contains('LOMMEN BARNEHAVE')
        cy.contains('Opplysninger fra sykmeldingen').click();

        // Må godkjenne først
        cy.contains('Gå videre').click()
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må bekrefte dette før du går videre')

    })
})
