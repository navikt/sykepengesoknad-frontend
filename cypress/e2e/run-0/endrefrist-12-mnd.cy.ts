describe('Tester endrefrist 12 måneder', () => {
    it('Viser popup med info om at endrefristen er ute', () => {
        cy.visit(`/syk/sykepengesoknad/sendt/46cd957d-0d62-4091-81ec-7bac2bf6a628?testperson=korrigeringsfrist-utlopt`)

        cy.contains('Jeg vil endre svarene i søknaden').and('be.visible').click()
        cy.contains(
            'Fristen for å endre svarene i denne digitale søknaden er gått ut. Hvis du trenger å endre svarene dine kan du forklare hva du ønsker å endre ved å skrive til oss.',
        )
            .and('be.visible')
            .click()
        cy.contains('Lukk').and('be.visible').click()
        cy.get('Lukk').should('not.exist')
    })
})

export {}
