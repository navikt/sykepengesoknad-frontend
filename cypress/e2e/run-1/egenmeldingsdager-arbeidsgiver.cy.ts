import { arbeidstakerSoknadOpprettetAvInntektsmelding } from '../../../src/data/mock/data/personas/opprettet-av-inntektsmelding'

describe('Tester søknad som er opprettet fra egenmeldingsdager i inntektsmeldingen', () => {
    const soknad = arbeidstakerSoknadOpprettetAvInntektsmelding

    it('Viser guidepanel på førsteside', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}?testperson=egenmeldingsdager-arbeidsgiver`)
        cy.contains('Søknad om sykepenger').and('be.visible')

        cy.get('.navds-guide-panel')
            .eq(1)
            .within(() => {
                cy.contains('Du må søke om sykepenger')
                cy.contains('Siden sykefraværet ditt er på mer enn 16 dager må du søke om sykepenger.')
            })
    })
})
