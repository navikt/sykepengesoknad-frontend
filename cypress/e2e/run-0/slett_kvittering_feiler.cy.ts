import { feilVedSlettingAvKvittering } from '../../../src/data/mock/data/personas/reisetilskuddTestPerson'

describe('Test sletting av kvittering som feiler', () => {
    before(() => {
        cy.visit(`syk/sykepengesoknad/soknader/${feilVedSlettingAvKvittering.id}/4?testperson=reisetilskudd-test`)
    })

    describe('Sletting', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${feilVedSlettingAvKvittering.id}/4`)
            cy.get('h2').contains('Kvittering').and('be.visible')
        })

        it('Laster opp Taxi-kvittering', () => {
            cy.get('button').contains('Legg til reiseutgift').click()
            cy.get('select[name=transportmiddel]').select('TAXI')
            cy.get('input[name=belop_input]').type('1234')

            // fileUpload-rk
            // cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.jpg')
            // cy.get('[id="fileUpload-rk"] input[type=file]').attachFile('kvittering.jpg')
            // cy get by id fileUpload-rk
            // cy.get('#fileUpload-rk')
            // cy.get('#fileUpload-rk').attachFile('kvittering.jpg')
            //cy.get('[id="fileUpload-rk"] input[type=file]').attachFile('kvittering.jpg')
            cy.get('[data-cy="filopplasteren"]').find('input[type=file]').attachFile('kvittering.jpg')
            // cy.get('input[type="file"]').attachFile('kvittering.jpg')
            cy.get('button').contains('Bekreft').click()
        })

        it('Liste med kvitteringer er oppdatert', () => {
            cy.get('.navds-table').within(() => {
                cy.contains('Taxi')
                cy.contains('1 234 kr')
                cy.contains('1 utgift på til sammen')
            })
        })

        it('Sletting av kvittering fra liste', () => {
            cy.contains('button', 'Slett').click()
            cy.contains('Ja, jeg er sikker').click()
            cy.contains('Det skjedde en feil ved sletting av kvitteringen')
            cy.contains('Nei').click()
        })
    })
})
