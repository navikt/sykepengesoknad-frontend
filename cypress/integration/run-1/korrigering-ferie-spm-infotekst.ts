import { arbeidstakerTilKorrigering } from '../../../src/data/mock/data/soknader-integration'

describe('Ved korrigering av ferie forsvinner bjørn og det er en infotekst om ingen sykepenger', () => {

    const soknad = arbeidstakerTilKorrigering

    it('Vi kan gå direkte til søknaden fra sykefravaer', function() {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${soknad.id}/3`)
        cy.url().should('equal', `http://localhost:8080/syk/sykepengesoknad/soknader/${soknad.id}/3`)

        cy.contains('Tok du ut feriedager i tidsrommet 1. - 24. april 2020?')
        cy.contains('Du får ikke sykepenger de dagene du tar ut ferie.')
        cy.contains('Syns du det er vanskelig å svare på om du har tatt ut ferie eller ikke').should('not.exist')
    })
})
