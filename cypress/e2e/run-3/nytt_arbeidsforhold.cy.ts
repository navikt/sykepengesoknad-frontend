import { heading, svarJaHovedsporsmal } from '../../support/utilities'

describe('Tester nytt arbeidsforhold', () => {
    it('Åpner nytt arbeidsforhold sporsmål', function () {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/7?testperson=nytt-arbeidsforhold')
        heading('Nytt arbeidsforhold', 2).should('exist')
        cy.get('div').contains('Kaffebrenneriet').should('have.css', 'background-color', 'rgb(236, 238, 240)')
    })

    it('Svarer ja på hovedspørsmål', function () {
        svarJaHovedsporsmal()
        cy.contains('Hvor mye har du tjent i perioden 8. – 21. september 2022?')
    })

    it('Ekspanderer ferie hjelpetekst', function () {
        cy.get('body')
            .findByRole('button', {
                name: 'Jobbet i ferie, permisjon eller mens du mottok Nav-ytelser?',
            })
            .click()
        cy.contains(
            'Du skal ikke oppgi eventuell inntekt du opparbeidet deg når du hadde ferie, permisjon eller mottok andre ytelser fra Nav. Andre ytelser fra Nav kan være foreldrepenger, omsorgspenger, opplæringspenger og arbeidsavklaringspenger.',
        ).should('be.visible')
    })
})
