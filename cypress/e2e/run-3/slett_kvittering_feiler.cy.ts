import { feilVedSlettingAvKvittering } from '../../../src/data/mock/data/reisetilskudd'

describe('Test sletting av kvittering som feiler', () => {
    before(() => {
        cy.visit(
            `syk/sykepengesoknad/soknader/${feilVedSlettingAvKvittering.id}/4?testperson=reisetilskudd`
        )
    })

    describe('Sletting', () => {
        it('URL er riktig', () => {
            cy.url().should(
                'include',
                `/syk/sykepengesoknad/soknader/${feilVedSlettingAvKvittering.id}/4`
            )
        })

        it('Laster opp Taxi-kvittering', () => {
            cy.get('.fler-vedlegg').click()
            cy.contains('Legg til reiseutgift')
            cy.get('select[name=transportmiddel]').select('TAXI')
            cy.get('input[name=belop_input]').type('1234')
            cy.get('.filopplasteren input[type=file]').attachFile(
                'kvittering.jpg'
            )
            cy.get('.lagre-kvittering').contains('Bekreft').click()
        })

        it('Liste med kvitteringer er oppdatert', () => {
            cy.get('.fil_liste')

            cy.get('.transport').contains('Taxi')
            cy.get('.belop').contains('1.234 kr')

            cy.get('.sumlinje').contains('1 utgift på til sammen')
            cy.get('.sumlinje .belop').contains('1.234 kr')
        })

        it('Sletting av kvittering fra liste', () => {
            cy.get('.slette-kvittering').click()
            cy.contains('Ja, jeg er sikker').click()
            cy.contains('Det skjedde en feil ved sletting av kvitteringen')
            cy.contains('Lukk').click()
        })

        it('Sletting av kvittering i åpnet modal', () => {
            cy.get('.fil_liste').contains('Taxi').click()

            cy.get('.knapperad').contains('Slett').click()
            cy.get('.bekreft-dialog').within(() => {
                cy.contains('Vil du slette kvitteringen?')
                cy.contains('Ja, jeg er sikker').click()
                cy.contains('Det skjedde en feil ved sletting av kvitteringen')
                cy.contains('Lukk').click()
            })
        })
    })
})
