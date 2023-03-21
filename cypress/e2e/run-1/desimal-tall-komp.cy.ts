import { gradertReisetilskudd } from '../../../src/data/mock/data/reisetilskudd'

describe('Tester at riktig antall desimaler sendes til backend', () => {
    it('Oppgir desimaler på svartype TALL og PROSENT', () => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7`)
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').focus().type('37.321') // maks 2 desimaler tas med på TALL

        cy.get('label[for=0e368ffc-1840-35e5-bbb5-b994cbaa8ef1]').click()
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').focus().type('50.321') // ingen desimaler tas med på PROSENT

        cy.contains('Gå videre').click()
        cy.contains('Tilbake').click()

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').should('have.value', '37.32')
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').should('have.value', '50')
    })

    it('Oppgir desimaler på svartype BELOP og KILOMETER', () => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/12`)

        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        cy.get('[aria-label="8. april (onsdag)"]').click()

        cy.get('input[type=radio]#1547263_0').click()
        cy.get('input#1547264').focus().type('500.321') // maks 2 desimaler tas med på BELOP

        cy.get('input#1547265').focus().type('12.321') // maks 1 desimal tas med på KILOMETER

        cy.contains('Gå videre').click()
        cy.contains('Tilbake').click()

        cy.get('input#1547264').should('have.value', '500.32')
        cy.get('input#1547265').should('have.value', '12.3')
    })

    it('Håndterer at man bruker komma istedenfor punktum', () => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7`)
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').focus().type('36,99') // maks 2 desimaler tas med på TALL

        cy.get('label[for=0e368ffc-1840-35e5-bbb5-b994cbaa8ef1]').click()
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').focus().type('50.321wsergergwegr') // ingen desimaler tas med på PROSENT

        cy.contains('Gå videre').click()
        cy.contains('Tilbake').click()

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').should('have.value', '36.99')
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').should('have.value', '50')
    })

    it('Legger ikke til desimaler', () => {
        cy.visit(`http://localhost:8080/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7`)
        cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').focus().type('36') // ingen desimaler i input

        cy.get('label[for=0e368ffc-1840-35e5-bbb5-b994cbaa8ef1]').click()
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').focus().type('50.321wsergergwegr') // ingen desimaler tas med på PROSENT

        cy.contains('Gå videre').click()
        cy.contains('Tilbake').click()

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').should('have.value', '36')
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').should('have.value', '50')
    })
})
