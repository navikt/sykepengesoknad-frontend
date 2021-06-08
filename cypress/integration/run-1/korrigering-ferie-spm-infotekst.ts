import { arbeidstakerTilKorrigering } from '../../../src/data/mock/data/soknader-integration'

describe('Ved korrigering av ferie forsvinner bjørn og det er en infotekst om ingen sykepenger', () => {

    const soknad = arbeidstakerTilKorrigering


    it('Vi kan gå direkte til søknaden fra sykefravaer', function() {
        cy.visit(`http://localhost:8080/soknader/${soknad.id}/3`)
        cy.url().should('equal', `http://localhost:8080/soknader/${soknad.id}/3`)

        cy.contains('Hadde du ferie i tidsrommet 1. - 24. april 2020?')
        cy.contains('Du får ikke sykepenger de dagene du tar ut ferie.')
        cy.contains('Måtte du avbryte ferien fordi du ble syk').should('not.exist')
    })
})
