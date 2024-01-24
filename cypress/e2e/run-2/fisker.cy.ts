describe('Tester søknad med fisker som arbeidssituasjon', () => {
    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=fisker')
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Viser arbeidssituasjon fra sykmeldinga', () => {
        cy.contains('Søknad om sykepenger').click()
        cy.contains('Opplysninger fra sykmeldingen')
        cy.get('section').contains('Jeg er sykmeldt som').siblings().first().contains('Fisker')
        cy.get('section').contains('Valgt blad').siblings().first().contains('A')
        cy.get('section').contains('Mottar du lott eller er du på hyre?').siblings().first().contains('Begge')
    })
})
