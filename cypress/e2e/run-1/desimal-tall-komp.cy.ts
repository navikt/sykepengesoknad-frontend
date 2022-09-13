import { gradertReisetilskudd } from '../../../src/data/mock/data/reisetilskudd'

describe('Tester at riktig antall desimaler sendes til backend', () => {
    it('Oppgir desimaler på svartype TALL og PROSENT', () => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7`)
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        cy.get('input#1547250').focus().type('37.321') // maks 2 desimaler tas med på TALL

        cy.get('label[for=1547252]').click()
        cy.get('input#1547253').focus().type('50.321') // ingen desimaler tas med på PROSENT

        cy.contains('Gå videre').click()
        cy.contains('Tilbake').click()

        cy.get('input#1547250').should('have.value', '37.32')
        cy.get('input#1547253').should('have.value', '50')
    })

    it('Oppgir desimaler på svartype BELOP og KILOMETER', () => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/13`)

        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        cy.get('input#1547262_16_3').click()

        cy.get('label[for=1547263_0]').click()
        cy.get('input#1547264').focus().type('500.321') // maks 2 desimaler tas med på BELOP

        cy.get('input#1547265').focus().type('12.321') // maks 1 desimal tas med på KILOMETER

        cy.contains('Gå videre').click()
        cy.contains('Tilbake').click()

        cy.get('input#1547264').should('have.value', '500.32')
        cy.get('input#1547265').should('have.value', '12.3')
    })
})
