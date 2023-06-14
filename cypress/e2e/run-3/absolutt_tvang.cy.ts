describe('Tester at åpne sykmeldinger må sendes inn', () => {
    describe('Tester med en usendt sykmelding', () => {
        it('Laster søknader ', function () {
            cy.visit('/syk/sykepengesoknad?testperson=en-usendt-sykmelding')

            cy.get(`a[href*=5d0bd29f-7803-4945-8426-49921284435e]`).click()
        })

        it('Viser advarsel om at det finnes sykmelding', function () {
            cy.url().should('include', `5d0bd29f-7803-4945-8426-49921284435e/1`)

            cy.contains('Du har en sykmelding du må velge om du skal bruke, før du kan begynne på denne søknaden.')

            cy.contains('Gå til sykmeldingen')
        })
    })

    describe('Tester med flere usendte sykmeldinger', () => {
        it('Laster søknader ', function () {
            cy.visit('/syk/sykepengesoknad?testperson=to-usendte-sykmeldinger')

            cy.get(`a[href*=a7efa5f0-003c-41d5-ab33-5c9be9179721]`).click()
        })

        it('Viser advarsel om at det finnes sykmeldinger', function () {
            cy.url().should('include', `a7efa5f0-003c-41d5-ab33-5c9be9179721/1`)

            cy.contains('Du har to sykmeldinger du må velge om du skal bruke, før du kan begynne på denne søknaden.')

            cy.contains('Gå til sykmeldingen')
        })
    })
})
