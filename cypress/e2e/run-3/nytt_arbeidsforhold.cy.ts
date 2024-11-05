import {
    heading,
    klikkGaVidere,
    setPeriodeFraTil,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
} from '../../support/utilities'

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

    it('Får spesifikk hjelpetekst ved ja på ferie', function () {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold')
        heading('Ferie', 2).should('exist')

        svarJaHovedsporsmal()
        setPeriodeFraTil(17, 18)
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarJaHovedsporsmal()
        cy.contains('Ikke ta med det du eventuelt tjente de dagene du hadde ferie fra MATBUTIKKEN AS.')
    })

    it('Får spesifikk hjelpetekst ved ja på permisjon', function () {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold')
        heading('Ferie', 2).should('exist')

        svarNeiHovedsporsmal()
        klikkGaVidere()

        heading('Permisjon', 2).should('exist')

        svarJaHovedsporsmal()
        setPeriodeFraTil(15, 16)
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarJaHovedsporsmal()
        cy.contains('Ikke ta med det du eventuelt tjente de dagene du hadde permisjon fra MATBUTIKKEN AS.')
    })

    it('Får spesifikk hjelpetekst ved ja på ferie og permisjon', function () {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold')
        heading('Ferie', 2).should('exist')

        svarJaHovedsporsmal()
        setPeriodeFraTil(17, 18)
        klikkGaVidere()

        heading('Permisjon', 2).should('exist')

        svarJaHovedsporsmal()
        setPeriodeFraTil(15, 16)
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarJaHovedsporsmal()
        cy.contains('Ikke ta med det du eventuelt tjente de dagene du hadde ferie eller permisjon fra MATBUTIKKEN AS.')
    })
})
