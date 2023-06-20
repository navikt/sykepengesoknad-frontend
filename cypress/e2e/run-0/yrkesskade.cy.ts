import { checkViStolerPåDeg, klikkGaVidere, svarCheckboxPanel } from '../../support/utilities'

describe('Tester yrkesskadesspørsmål', () => {
    it('Laster listevisng', function () {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=yrkesskade-v2')
        cy.get('h1').should('be.visible').and('have.text', 'Søknader')
        cy.findByRole('link', { name: /søknad om sykepenger/i }).click()
    })

    it('Svarer på spørsmål før yrkesskade', function () {
        cy.contains("Vi stoler på deg")
        checkViStolerPåDeg()
        klikkGaVidere()
        cy.findByRole('radio', { name: 'Nei' }).debug()

        klikkGaVidere()
    })
})
