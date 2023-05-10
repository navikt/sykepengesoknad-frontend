import { svarJaHovedsporsmal, svarNeiHovedsporsmal, svarCheckboxPanel } from '../../support/utilities'
describe('Tester korrigering av ferie', () => {
    function gaVidere() {
        cy.contains('Gå videre').click({ force: true })
    }

    it('Korrigerer ferie spørsmålet fra NEI til JA', () => {
        cy.visit('/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/4')

        cy.get('[data-cy="sporsmal-tittel"]').should('contain', 'Ferie')

        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')

        cy.get('[data-cy="feriekorrigeringvarsel"]').should('not.exist')

        cy.visit('/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/10')
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()

        cy.contains('Jeg vil endre svarene i søknaden').click()
        cy.contains('Ok').click()

        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click({
            force: true,
        })
        gaVidere()

        svarNeiHovedsporsmal()
        gaVidere()

        svarNeiHovedsporsmal()
        gaVidere()

        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')
        cy.get('[data-cy="feriekorrigeringvarsel"]').should('exist')
    })
})
