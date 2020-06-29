import { arbeidstaker } from '../../src/data/mock/data/soknader-opplaering'

describe('Tester å åpne søknaden direkte fra sykefravaer', () => {

    const soknad = arbeidstaker


    it('Vi kan gå direkte til søknaden fra sykefravaer', function() {
        cy.visit(`http://localhost:8080/soknader/${soknad.id}`)
        cy.url().should('equal', `http://localhost:8080/soknader/${soknad.id}/1`)

        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('POSTEN NORGE AS, BÆRUM')
        cy.contains('100 % sykmeldt')
    })
})
