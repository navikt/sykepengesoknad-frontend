describe('Tester cummulative-layout-shift ', () => {
    it('Høyden endres ikke i happy case i listevisninga etter at dataene er lastet', () => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=cummulative-layout-shift')
        cy.get('h1').should('be.visible')
        // Sjekk mains høyde
        const expectedHeight = '380px'
        cy.get('main').should('have.css', 'height', expectedHeight)
        cy.get('.navds-skeleton').should('have.length', 2)

        // Venter på at alle dataene er fetchet og rendret

        cy.contains('Nye søknader').should('be.visible')
        cy.get('.navds-skeleton').should('have.length', 0)

        cy.get('main').should('have.css', 'height', expectedHeight)
    })

    it('Høyden endres ikke i happy case i et vanlig spørsmål etter at dataene er lastet', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/3?testperson=cummulative-layout-shift',
        )
        // Sjekk mains høyde
        const expectedHeight = '1152px'
        cy.get('main').should('have.css', 'height', expectedHeight)
        cy.get('.navds-skeleton').should('have.length', 11)

        // Venter på at alle dataene er fetchet og rendret

        cy.contains('Ferie').should('be.visible')
        cy.get('.navds-skeleton').should('have.length', 0)

        cy.get('main').should('have.css', 'height', expectedHeight)
    })

    it('Høyden endres ikke i første spørsmålet etter at dataene er lastet', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/1?testperson=cummulative-layout-shift',
        )
        // Sjekk mains høyde
        const expectedHeight = '1146px'
        cy.get('main').should('have.css', 'height', expectedHeight)
        cy.get('.navds-skeleton').should('have.length', 8)

        // Venter på at alle dataene er fetchet og rendret

        cy.contains('Jeg vet at jeg kan miste retten').should('be.visible')
        cy.get('.navds-skeleton').should('have.length', 0)

        cy.get('main').should('have.css', 'height', expectedHeight)
    })
})

export {}
