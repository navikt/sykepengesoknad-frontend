import { svarJaHovedsporsmal, svarNeiHovedsporsmal, svarCheckboxPanel, setPeriodeFraTil, klikkGaVidere } from '../../support/utilities'

describe('Tester korrigering av ferie', () => {


    it('Sender inn søknad med ja på ferie spørsmålet', () => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e')
        svarCheckboxPanel()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        cy.get('[data-cy="sporsmal-tittel"]').should('contain', 'Ferie')

        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)

        cy.contains('Når tok du ut feriedager?')

        cy.get('[data-cy="feriekorrigeringvarsel"]').should('not.exist')
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarNeiHovedsporsmal()
        klikkGaVidere()
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
    })

    it('Korrigerer ferie spørsmålet fra NEI til JA', () => {
        cy.contains('Jeg vil endre svarene i søknaden').click()
        cy.contains('Ok').click()

        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarNeiHovedsporsmal()
        klikkGaVidere()

        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')
        cy.get('[data-cy="feriekorrigeringvarsel"]').should('exist')
    })
})
