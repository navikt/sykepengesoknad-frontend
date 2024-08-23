describe('Tester søknader tilhørende tilbakedaterte sykmeldinger', () => {
    it('Tilbakedatering under behandling', function () {
        cy.visit(
            'http://localhost:8080/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daf/1?testperson=tilbakedateringer',
        )

        // Viktig informasjon grunnet tilbakedatering
        cy.get('.navds-guide-panel').should('be.visible')
        cy.get('.navds-guide-panel').contains('Viktig informasjon')
        cy.get('.navds-guide-panel').contains(
            'Vanligvis starter sykmeldingen den dagen du er hos legen. I ditt tilfelle har legen skrevet at den startet tidligere.',
        )
        cy.get('.navds-guide-panel').contains(
            'NAV må vurdere om det er en gyldig grunn for at sykmeldingen din starter før du var i kontakt med legen.',
        )
    })

    it('Tilbakedatering avvist', function () {
        cy.visit(
            'http://localhost:8080/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daa/1?testperson=tilbakedateringer',
        )

        // Viktig informasjon grunnet tilbakedatering
        cy.get('.navds-guide-panel').should('be.visible')
        cy.get('.navds-guide-panel').contains('Viktig informasjon')
        cy.get('.navds-guide-panel').contains(
            'Vanligvis starter sykmeldingen den dagen du er hos legen. I ditt tilfelle har legen skrevet at den startet tidligere.',
        )
        cy.get('.navds-guide-panel').contains(
            'NAV har kommet til at det ikke er noen gyldig grunn til at sykmeldingen startet før dere hadde kontakt.',
        )
    })
})

export {}
