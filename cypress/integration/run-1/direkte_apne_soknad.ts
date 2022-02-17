import { sendtArbeidsledig } from '../../../src/data/mock/data/soknader-integration'
import { arbeidstaker } from '../../../src/data/mock/data/soknader-opplaering'

describe('Tester å åpne søknaden direkte fra sykefravaer', () => {

    const soknad = arbeidstaker

    it('Vi kan gå direkte til søknaden fra sykefravaer', function() {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${soknad.id}`)
        cy.url().should('equal', `http://localhost:8080/syk/sykepengesoknad/soknader/${soknad.id}/1`)

        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('POSTEN NORGE AS, BÆRUM')
        cy.contains('100% sykmeldt')
    })

    it('Åpner en sendt søknad på en annen siden enn kvitteringssiden og sendes til oversikten', function() {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}`)
        cy.url().should('equal', `http://localhost:8080/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}`)
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}/3`)
        cy.url().should('equal', 'http://localhost:8080/syk/sykepengesoknad/')
    })

    it('Hvis vi går til /soknader sendes vi til oversikten', function() {
        cy.visit('http://localhost:8080/syk/sykepengesoknad/soknader/')
        cy.url().should('equal', 'http://localhost:8080/syk/sykepengesoknad/')
    })
})
