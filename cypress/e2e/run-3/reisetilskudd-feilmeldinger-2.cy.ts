import { modalAktiv, modalIkkeAktiv } from '../../support/utilities'
import { nyttReisetilskudd } from '../../../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

describe('Tester feilmeldinger i reisetilskudd', () => {
    it('Naviger til siden', () => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4?testperson=reisetilskudd`)
        cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`)
    })

    it('Åpner og lukker modal', () => {
        cy.get('body').findByRole('dialog', { name: 'Legg til reiseutgift' }).should('not.exist')

        cy.get('button').contains('Legg til reiseutgift').click()
        cy.get('body').findByRole('dialog', { name: 'Legg til reiseutgift' }).should('have.attr', 'open')
        cy.get('.navds-modal').contains('Tilbake').click()
        cy.get('body').findByRole('dialog', { name: 'Legg til reiseutgift' }).should('not.exist')
    })

    it('Feilmeldinger når ingenting er valgt', () => {
        modalIkkeAktiv()
        cy.get('button').contains('Legg til reiseutgift').click()
        modalAktiv()

        cy.get('.navds-modal').contains('Bekreft').should('be.visible').click()

        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('be.visible')
        cy.get('[data-cy="opplasting-form"]').contains('Du må skrive inn beløp').should('be.visible')
        cy.get('[data-cy="opplasting-form"]').contains('Du må laste opp kvittering').should('be.visible')
        cy.get('.navds-modal').contains('Tilbake').should('be.visible').click()
        modalIkkeAktiv()
    })

    it('Ugyldig valg', () => {
        modalIkkeAktiv()
        cy.get('button').should('be.visible').contains('Legg til reiseutgift').click()
        modalAktiv()

        cy.get('select[name=transportmiddel]').should('be.visible').select('')
        cy.get('.navds-modal').contains('Bekreft').should('be.visible').click()
        modalAktiv()
        cy.get('body').findByRole('dialog', { name: 'Legg til reiseutgift' }).should('have.attr', 'open')
        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('be.visible')

        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel')
        cy.get('select[name=transportmiddel]').select('PARKERING')
        cy.get('#transportmiddel').contains('Parkering')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('not.exist')
    })

    it('Reloader og åpner modal', () => {
        cy.reload()
        cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`)
        cy.contains('Legg til reiseutgift')
        cy.get('button').should('be.visible').contains('Legg til reiseutgift').click()
    })

    it('Negative beløp', () => {
        cy.get('input[name=belop_input]').type('-100')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være negativt')
    })

    it('Høyere beløp enn maks', () => {
        cy.get('input[name=belop_input]').clear()
        cy.get('input[name=belop_input]').type('1000000000')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være større enn 10 000')
    })

    it('Kan ikke skrive inn med 3 desimaler', () => {
        cy.get('input[name=belop_input]').clear()
        cy.get('input[name=belop_input]').type('100.253')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('input[name=belop_input]')
            .invoke('val')
            .should((val) => {
                expect(val).to.be.eq('100.25')
            })
    })

    it('Gyldig beløp med 2 desimaler', () => {
        cy.get('input[name=belop_input]').clear()
        cy.get('input[name=belop_input]').type('100.30')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være større enn 10 000').should('not.exist')
    })

    it('Gyldig beløp uten desimaler', () => {
        cy.get('input[name=belop_input]').clear()
        cy.get('input[name=belop_input]').type('99')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være større enn 10 000').should('not.exist')
    })
})
