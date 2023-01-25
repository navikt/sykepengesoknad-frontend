import { kortFomTomArbeidstakerSoknad } from '../../../src/data/mock/data/kort-soknad'

xdescribe('Tester søknad som er opprettet fra egenmeldingsdager i inntektsmeldingen', () => {
    const soknad = kortFomTomArbeidstakerSoknad

    it('Viser guidepanel på førsteside', function () {
        cy.visit(
            `http://localhost:8080/syk/sykepengesoknad/soknader/${soknad.id}?testperson=egenmeldingsdager%20arbeidsgiver`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')

        cy.get('.navds-guide-panel').within(() => {
            cy.contains('Du må søke om sykepenger')
            cy.contains('Siden sykefraværet ditt er på mer enn 16 dager må du søke om sykepenger.')
        })
    })
})
