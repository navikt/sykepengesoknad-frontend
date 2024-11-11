describe('Tester søknader tilhørende tilbakedaterte sykmeldinger', () => {
    it('Tilbakedatering under behandling', function () {
        cy.visit(
            'http://localhost:3000/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daf/1?testperson=tilbakedateringer',
        )

        // Viktig informasjon grunnet tilbakedatering
        cy.get('.navds-alert').should('be.visible')
        cy.get('.navds-alert').contains('Viktig informasjon')
        cy.get('.navds-alert').contains(
            'Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en tidligere startdato. NAV må vurdere om det er en gyldig grunn for at sykemeldingen din starter før du var i kontakt med legen, og vil ta med dette i vurderingen når de går igjennom søknaden din.',
        )
    })

    it('Tilbakedatering avvist', function () {
        cy.visit(
            'http://localhost:3000/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daa/1?testperson=tilbakedateringer',
        )

        // Viktig informasjon grunnet tilbakedatering
        cy.get('.navds-alert').should('be.visible')
        cy.get('.navds-alert').contains('Viktig informasjon')
        cy.get('.navds-alert').contains(
            'Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en tidligere startdato.',
        )
        cy.get('.navds-alert').contains(
            'NAV har kommet til at det ikke er noen gyldig grunn til at sykmeldingen startet før dere hadde kontakt.',
        )
    })
})

export {}
