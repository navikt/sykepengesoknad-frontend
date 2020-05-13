/* eslint-disable no-undef */

describe('Tester arbeidstakersøknad', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef, 1.4.20 - 24.4.20
    //-----
    const soknad = 'faba11f5-c4f2-4647-8c8a-58b28ce2f3ef';

    it('Laster startside', function() {
        cy.visit('http://localhost:8080/nysykepengesoknad');
        cy.get('.sidetopp__tittel').should('be.visible').and('have.text', 'Søknader om sykepenger');
        cy.contains('Gjelder perioden 1. – 24. april 2020').click();
    })
    it('Søknad ANSVARSERKLARING - steg 1', function() {
        cy.url().should('include', `${soknad}/1`);

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('LOMMEN BARNEHAVE')
        cy.contains('Opplysninger fra sykmeldingen').click();

        // Må godkjenne ANSVARSERKLARING først
        cy.contains('Gå videre').click()
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må bekrefte dette før du går videre')

        // Gå til neste
        cy.get('.skjemaelement__label').click({ force: true })
        cy.contains('Gå videre').click()
    })
    it('Søknad PERMITTERT_NAA - steg 2', function() {
        cy.url().should('include', `${soknad}/2`);

        // Sjekk at sykmelding er minimert

        // Test spørsmål

        // Gå til neste
    })
    // Arbeidstaker 100% (syk: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47) (sok: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef)
    // Arbeidstaker Gradert (syk: ee4540e3-eba6-46cb-b90f-05747ddb1537) (sok: 5b769c04-e171-47c9-b79b-23ab8fce331e)
    // Arbeidstaker Behnadlingsdager (syk: e876fe08-2765-4bd6-966c-922eefe99382) (sok: bcb032ac-b6dd-4ae7-8e73-9e64f1b35182)
    // Arbeidsledig/Annet (syk: 470c9e25-e112-4060-be61-7a24af530889) (sok: 934f39f4-cb47-459f-8209-0dbef6d36059)
    // Frilanser/Selvstendig (syk: baf4a9ab-cc9b-42af-bba3-67cd6ca06388) (sok: a8e40578-682b-4a04-bfda-b7768af2ae13)
})
