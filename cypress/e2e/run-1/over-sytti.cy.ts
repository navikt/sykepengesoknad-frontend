describe('Tester søknader tilhørende person over 70', () => {
    it('Person over 70', function () {
        cy.visit(
            'http://localhost:3000/syk/sykepengesoknad/soknader/df1371a4-2773-41c2-a895-49f56142496c/1?testperson=over-70',
        )

        cy.get('.navds-alert').should('be.visible')
        cy.get('.navds-alert').contains('Viktig informasjon')
        cy.get('.navds-alert').contains('Når du har passert 70 år, har du ikke lenger rett til sykepenger.')
        cy.get('.navds-alert').contains(
            'Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden. Hvis du likevel ønsker å søke, kan vi ikke hindre deg i dette.',
        )
    })
})

export {}
