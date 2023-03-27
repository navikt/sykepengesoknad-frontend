import { soknadUtenEgenmeldingSporsmal } from '../../../src/data/mock/data/egenmeldingsdager-i-sykmeldingen'

describe('Tester egenmeldingsdager i fra sykmelding', () => {
    const soknad = soknadUtenEgenmeldingSporsmal

    it('Viser egenmeldingsdager i fra sykmelding', function () {
        cy.visit(
            `http://localhost:8080/syk/sykepengesoknad/soknader/${soknad.id}?testperson=sykmelding%20med%20egenmeldingsdager`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('Egenmeldingsdager (12 dager)')
            .siblings()
            .first()
            .within(() => {
                cy.get('li').contains('6. mars')
                cy.get('li').contains('26. februar')
            })
    })
})
