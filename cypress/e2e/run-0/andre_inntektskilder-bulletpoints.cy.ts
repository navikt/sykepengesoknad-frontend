describe('Tester andre inntektskilder bulletpoints', () => {
    it('Viser liste med flere hvis vi har data fra inntektskomponenten', () => {
        cy.visit(`/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/8`)

        cy.contains('Arbeidsforhold vi har registrert på deg:').and('be.visible')
        cy.get('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]').find('li').should('have.length', 4)
        const expectedValues = ['Posten Norge AS, Bærum', 'Ruter', 'Blomsterbutikken', 'Bensinstasjonen']

        cy.get('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]')
            .find('li')
            .each(($el, index) => {
                cy.wrap($el).should('contain', expectedValues[index])
            })
    })

    it('Viser liste med en hvis vi har data fra inntektskomponenten, men ingen ekstra', () => {
        cy.visit(`/syk/sykepengesoknad/soknader/faba11f5-c4f2-4647-8c8a-58b28ce2f3ef/6`)

        cy.contains('Arbeidsforhold vi har registrert på deg:').and('be.visible')
        cy.contains('Har du andre inntektskilder enn nevnt over?').and('be.visible')
        cy.get('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]').find('li').should('have.length', 1)
        const expectedValues = ['Posten Norge AS, Bærum']

        cy.get('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]')
            .find('li')
            .each(($el, index) => {
                cy.wrap($el).should('contain', expectedValues[index])
            })
    })

    it('Viser ikke liste vi ikke har data fra inntektskomponenten', () => {
        cy.visit(`/syk/sykepengesoknad/soknader/214f6e73-8150-4261-8ce5-e2b41907fa58/9?testperson=integrasjon-soknader`)

        cy.contains('Har du andre inntektskilder enn nevnt over?').should('not.exist')

        cy.contains('Har du andre inntektskilder enn Posten Norge AS, Bærum?').and('be.visible')
        cy.get('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]').should('not.exist')
    })
})
