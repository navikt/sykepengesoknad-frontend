import { heading, svarJaHovedsporsmal } from '../../support/utilities'

describe('Tester nytt arbeidsforhold', () => {
    it('Åpner førstegangs nytt arbeidsforhold sporsmål', function () {
        cy.clearCookies()
        cy.visit(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/7?testperson=nytt-arbeidsforhold-forstegangs',
        )
        heading('Nytt arbeidsforhold', 2).should('exist')
    })

    it('Svarer ja på hovedspørsmål', function () {
        svarJaHovedsporsmal()
        cy.contains('Når hadde du din første arbeidsdag?')
        cy.contains('Hvor mye har du tjent i perioden 8. – 21. september 2022?')
    })

    it('Ekspanderer ferie hjelpetekst', function () {
        cy.get('body')
            .findByRole('button', {
                name: 'Jobbet i ferien?',
            })
            .click()
        cy.contains('Du trenger ikke oppgi eventuell inntekt du opparbeidet deg når du egentlig hadde ferie.').should(
            'be.visible',
        )
    })

    it('Åpner påfølgende nytt arbeidsforhold sporsmål', function () {
        cy.clearCookies()
        cy.visit(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4ddd/7?testperson=nytt-arbeidsforhold-pafolgende',
        )
        heading('Inntekt fra annet arbeidsforhold', 2).should('exist')
    })

    it('Svarer ja på hovedspørsmål', function () {
        cy.contains('Har du jobbet noe hos Kaffebrenneriet i perioden 8. – 21. september 2022?')
        svarJaHovedsporsmal()
        cy.contains('Når hadde du din første arbeidsdag?').should('not.exist')
        cy.contains('Hvor mye har du tjent i perioden 8. – 21. september 2022?')
    })

    it('Ekspanderer ferie hjelpetekst', function () {
        cy.get('body')
            .findByRole('button', {
                name: 'Jobbet i ferien?',
            })
            .click()
        cy.contains('Du trenger ikke oppgi eventuell inntekt du opparbeidet deg når du egentlig hadde ferie.').should(
            'be.visible',
        )
    })
})
