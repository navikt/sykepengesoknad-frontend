import { mainSkalHaHoyde } from '../../support/utilities'

describe('Tester cummulative-layout-shift ', () => {
    it('Høyden endres ikke i happy case i listevisninga etter at dataene er lastet', () => {
        cy.clearCookies()
        cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=cummulative-layout-shift')
        cy.get('h1').should('be.visible')
        // Sjekk mains høyde
        mainSkalHaHoyde(388)
        cy.get('.navds-skeleton').should('have.length', 0)

        // Venter på at alle dataene er fetchet og rendret

        cy.contains('Nye søknader').should('be.visible')
        cy.get('.navds-skeleton').should('have.length', 0)

        mainSkalHaHoyde(388)
    })

    it('Høyden endres ikke i happy case i et vanlig spørsmål etter at dataene er lastet', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/3?testperson=cummulative-layout-shift',
        )
        // Sjekk mains høyde
        mainSkalHaHoyde(1148)
        cy.get('.navds-skeleton').should('have.length', 0)

        // Venter på at alle dataene er fetchet og rendret

        cy.get('h2').contains('Ferie').should('be.visible')
        cy.get('.navds-skeleton').should('have.length', 0)

        mainSkalHaHoyde(1148)
    })

    it('Høyden endres ikke i første spørsmålet etter at dataene er lastet', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/1?testperson=cummulative-layout-shift',
        )
        // Sjekk mains høyde
        mainSkalHaHoyde(1657)
        cy.get('.navds-skeleton').should('have.length', 0)

        // Venter på at alle dataene er fetchet og rendret

        cy.contains('Jeg vil svare så godt jeg kan på spørsmålene i søknaden.').should('be.visible')
        cy.get('.navds-skeleton').should('have.length', 0)

        mainSkalHaHoyde(1657)
    })
})

export {}
