import { nyttReisetilskudd } from '../../../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

describe('Tester feilmeldinger i reisetilskudd', () => {
    it('Naviger til siden', () => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4?testperson=reisetilskudd`)
        cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`)
    })

    it('Feilmeldinger når ingenting er valgt', () => {
        cy.get('button').contains('Legg til reiseutgift').click()

        cy.get('.navds-modal').contains('Bekreft').should('be.visible').click()

        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('be.visible')
        cy.get('[data-cy="opplasting-form"]').contains('Du må skrive inn beløp').should('be.visible')
        cy.get('[data-cy="opplasting-form"]').contains('Du må laste opp kvittering').should('be.visible')
    })

    it('Ugyldig valg', () => {
        cy.get('select[name=transportmiddel]').should('be.visible').select('')
        cy.get('.navds-modal').contains('Bekreft').should('be.visible').click()

        cy.get('body').findByRole('dialog', { name: 'Legg til reiseutgift' }).should('have.attr', 'open')
        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('be.visible')

        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel')
        cy.get('select[name=transportmiddel]').select('PARKERING')
        cy.get('#transportmiddel').contains('Parkering')
        cy.get('.navds-modal').contains('Bekreft').click()
        cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('not.exist')
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
        cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være større enn 1 000 000')
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

    it('Legger inn taxi kvittering', () => {
        cy.get('select[name=transportmiddel]').select('TAXI')
        cy.get('#transportmiddel').contains('Taxi')
        cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.pdf')
        cy.get('button').contains('Bekreft').click()
        cy.get('.navds-modal').contains('Filtypen til kvittering.pdf er ugyldig')
        cy.get('.navds-modal').contains('Slett filen').click()
        cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile(['kvittering.jpg', 'kvittering2.jpg'])
        cy.get('button').contains('Bekreft').click()
        cy.get('.navds-modal').contains('Du kan ikke laste opp mer enn en fil').should('be.visible')
        cy.get('.navds-modal').contains('Slett filen').click()
        cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.jpg')
        cy.get('button').contains('Bekreft').click()
        cy.get('.navds-modal').contains('Du kan ikke laste opp mer enn en fil').should('not.exist')
    })

    it('Fil list oppdateres med kvittering', () => {
        cy.get('.navds-table').within(() => {
            cy.contains('Taxi')
            cy.contains('99 kr')
            cy.contains('1 utgift på til sammen')
            cy.contains('99 kr')
        })
    })
})
