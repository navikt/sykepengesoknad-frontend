import { arbeidstakerTilKorrigering } from '../../../src/data/mock/data/soknader-integration'

describe('Ved korrigering av ferie forsvinner Bjørn', () => {
    const soknad = arbeidstakerTilKorrigering

    it('Vi kan gå direkte til søknaden fra sykefravaer', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/3?testperson=alle-soknader`)
        cy.url().should(
            'equal',
            Cypress.config().baseUrl + `/syk/sykepengesoknad/soknader/${soknad.id}/3?testperson=alle-soknader`,
        )

        cy.contains('Tok du ut feriedager i tidsrommet 1. - 24. april 2020?')
        cy.contains('Syns du det er vanskelig å svare på om du har tatt ut ferie eller ikke').should('not.exist')
    })
})
