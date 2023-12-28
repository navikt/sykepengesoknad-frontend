import { soknadUtenEgenmeldingSporsmal } from '../../../src/data/mock/data/personas/egenmeldingsdager-i-sykmeldingen'

describe('Tester egenmeldingsdager i fra sykmelding', () => {
    const soknad = soknadUtenEgenmeldingSporsmal

    it('Viser egenmeldingsdager i fra sykmelding', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}?testperson=sykmelding-med-egenmeldingsdager`)
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('Egenmeldingsdager (12 dager)')
            .siblings()
            .first()
            .within(() => {
                cy.get('li').first().contains('20. februar')
                cy.get('li').last().contains('10. mars')
            })
    })
})
