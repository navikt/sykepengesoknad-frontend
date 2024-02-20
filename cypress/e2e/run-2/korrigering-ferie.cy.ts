import {
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarCheckboxPanel,
    setPeriodeFraTil,
    klikkGaVidere,
    besvarKjenteInntektskilder,
} from '../../support/utilities'

describe('Tester korrigering av ferie', () => {
    it('Sender inn søknad med ja på ferie spørsmålet', () => {
        cy.visit('/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e')
        svarCheckboxPanel()
        klikkGaVidere()
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
        besvarKjenteInntektskilder()
        cy.contains('Andre inntektskilder')
        cy.contains('Har du andre inntektskilder enn nevnt over?')
        cy.contains('Spørsmålet forklart').click()
        cy.contains('NAV trenger å vite om din pensjonsgivende inntekt')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Opphold i utlandet')
        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Til slutt')
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
        cy.contains('Tilbake i fullt arbeid')

        svarNeiHovedsporsmal()
        klikkGaVidere()
        cy.contains('Ferie')

        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')
        cy.get('[data-cy="feriekorrigeringvarsel"]').should('exist')
    })
})
