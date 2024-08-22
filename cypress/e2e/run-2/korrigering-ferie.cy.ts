import {
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarCheckboxPanel,
    setPeriodeFraTil,
    klikkGaVidere,
    checkViStolerPaDeg,
} from '../../support/utilities'

describe('Tester korrigering av ferie', () => {
    it('Sender inn søknad med ja på ferie spørsmålet', () => {
        cy.visit('/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e')
        checkViStolerPaDeg()
        cy.contains('Tilbake i fullt arbeid')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Ferie')

        svarNeiHovedsporsmal()
        cy.get('[data-cy="sporsmal-tittel"]').should('contain', 'Ferie')

        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)

        cy.contains('Når tok du ut feriedager?')

        cy.get('[data-cy="feriekorrigeringvarsel"]').should('not.exist')
        klikkGaVidere()
        cy.contains('Permisjon')

        svarNeiHovedsporsmal()
        klikkGaVidere()

        cy.contains('Jobb underveis')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Arbeid utenfor Norge')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Andre inntektskilder')
        cy.contains('Har du andre inntektskilder enn nevnt over?')
        cy.contains('Spørsmålet forklart').click()
        cy.contains('NAV trenger å vite om din pensjonsgivende inntekt')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Reise til utlandet')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Oppsummering fra søknaden')
        cy.contains('Send søknaden').click()
    })

    it('Korrigerer ferie spørsmålet fra NEI til JA', () => {
        cy.findByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()
        cy.contains('Ok').click()

        checkViStolerPaDeg()
        cy.contains('Tilbake i fullt arbeid')

        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Ferie')

        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')
        cy.get('[data-cy="feriekorrigeringvarsel"]').should('exist')
    })
})
