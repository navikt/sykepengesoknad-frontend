import { klikkGaVidere, sjekkMainContentFokus } from '../../support/utilities'
import { gradertReisetilskudd } from '../../../src/data/mock/data/soknad/arbeidstaker-reisetilskudd-gradert'

describe('Tester at riktig antall desimaler sendes til backend', () => {
    it('Oppgir desimaler på svartype TALL og PROSENT', () => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7?testperson=reisetilskudd`)
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').type('37.321') // maks 2 desimaler tas med på TALL

        cy.get('label[for=0e368ffc-1840-35e5-bbb5-b994cbaa8ef1]').click()
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').type('50.321') // ingen desimaler tas med på PROSENT

        klikkGaVidere()
        cy.url().should('include', `${gradertReisetilskudd.id}/8`)
        cy.contains('Tilbake').click()
        sjekkMainContentFokus()

        cy.url().should('include', `${gradertReisetilskudd.id}/7`)

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').should('have.value', '37.32')
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').should('have.value', '50')
    })

    it('Oppgir desimaler på svartype BELOP og KILOMETER', () => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/12?testperson=reisetilskudd`)

        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.get('[aria-label="8. april (onsdag)"]').click()

        cy.get('input[type=radio]#1547263_0').click()
        cy.get('input#1547264').type('500.321') // maks 2 desimaler tas med på BELOP

        cy.get('input#1547265').type('12.321') // maks 1 desimal tas med på KILOMETER

        klikkGaVidere()
        cy.url().should('include', `${gradertReisetilskudd.id}/13`)
        cy.contains('Tilbake').click()
        sjekkMainContentFokus()

        cy.url().should('include', `${gradertReisetilskudd.id}/12`)

        cy.get('input#1547264').should('have.value', '500.32')
        cy.get('input#1547265').should('have.value', '12.3')
    })

    it('Håndterer at man bruker komma istedenfor punktum', () => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7?testperson=reisetilskudd`)
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').type('36,99') // maks 2 desimaler tas med på TALL

        cy.get('label[for=0e368ffc-1840-35e5-bbb5-b994cbaa8ef1]').click()
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').type('50.321wsergergwegr') // ingen desimaler tas med på PROSENT

        klikkGaVidere()
        cy.url().should('include', `${gradertReisetilskudd.id}/8`)
        cy.contains('Tilbake').click()
        sjekkMainContentFokus()

        cy.url().should('include', `${gradertReisetilskudd.id}/7`)

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').should('have.value', '36.99')
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').should('have.value', '50')
    })

    it('Legger ikke til desimaler', () => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/7?testperson=reisetilskudd`)
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').type('36') // ingen desimaler i input

        cy.get('label[for=0e368ffc-1840-35e5-bbb5-b994cbaa8ef1]').click()
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').type('50.321wsergergwegr') // ingen desimaler tas med på PROSENT

        klikkGaVidere()
        cy.url().should('include', `${gradertReisetilskudd.id}/8`)
        cy.contains('Tilbake').click()
        sjekkMainContentFokus()

        cy.url().should('include', `${gradertReisetilskudd.id}/7`)

        cy.get('input#495730df-717d-3774-bd19-e6bcf76e3ba2').should('have.value', '36')
        cy.get('input#13acfccb-3f39-3893-8054-058270add6ab').should('have.value', '50')
    })
})
