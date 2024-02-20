import { svarJaHovedsporsmal, svarNeiHovedsporsmal } from '../../support/utilities'

describe('Tester påskeferiehjelpetekst', () => {
    it('Søknaden går over påskeferien', () => {
        cy.visit('/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/3')

        cy.get('[data-cy="sporsmal-tittel"]').should('contain', 'Ferie')

        cy.get('[data-cy="paskeferiehjelp"]').should('not.exist')
        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')

        cy.get('[data-cy="paskeferiehjelp"]')
            .should('exist')
            .should('contain', 'Jeg var syk på de røde dagene i påsken. Er det ferie?')
            .should(
                'contain',
                'En offentlig helligdag ("rød dag") regnes ikke som en feriedag, med mindre du har avtalt med arbeidsgiveren din at du skal ta ut ferie på en rød dag.',
            )

        svarNeiHovedsporsmal()
        cy.get('[data-cy="paskeferiehjelp"]').should('not.exist')
    })

    it('Søknaden går ikke over påskeferien', () => {
        cy.visit('/syk/sykepengesoknad/soknader/963e816f-7b3c-4513-818b-95595d84dd91/3?testperson=brukertest')

        cy.get('[data-cy="sporsmal-tittel"]').should('contain', 'Ferie')

        svarJaHovedsporsmal()
        cy.contains('Når tok du ut feriedager?')
        cy.get('[data-cy="paskeferiehjelp"]').should('not.exist')
    })
})
