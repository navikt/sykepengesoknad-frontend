import { oppholdUtland, soknaderOpplaering as soknader } from '../../../src/data/mock/data/soknader-opplaering'
import { RSSoknad } from '../../../src/types/rs-types/rs-soknad'

describe('Tester søknad om å beholde sykepenger utenfor EU/EØS/Storbritannia', () => {
    const soknad = soknader.find((sok: RSSoknad) => sok.id === oppholdUtland.id)!

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=bare-utland')
    })

    it('Laster startside og velger søknad', function () {
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Velger periode for utenlandsopphold', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.get('#1_0 .fom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('17').click()
        cy.get('#1_0 .tom .ds-datepicker__kalenderknapp').click()
        cy.get('.DayPicker-Day').contains('24').click()

        cy.contains('Gå videre').click()
    })

    it('Velger land', function () {
        cy.url().should('include', `${soknad.id}/2`)

        cy.get('.skjemaelement__input').type('De')
        cy.contains('De okkuperte palestinske områdene').click({ force: true })
        cy.contains('Gå videre').click({ force: true })
    })

    it('Oppgir arbeidsgiver', function () {
        cy.url().should('include', `${soknad.id}/3`)

        cy.contains('Har du arbeidsgiver?')
        cy.contains('Ja').click({ force: true })
        cy.contains('Er du 100 % sykmeldt?').siblings().contains('Ja').click()
        cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
            .siblings()
            .contains('Nei')
            .click()

        cy.contains('Gå videre').click({ force: true })
    })

    it('Sender søknaden', function () {
        cy.url().should('include', `${soknad.id}/4`)
        cy.contains('Jeg bekrefter de to punktene ovenfor').click({
            force: true,
        })
        cy.contains('Send søknaden').click({ force: true })
    })

    it('Viser kvittering', function () {
        cy.url().should('include', `kvittering/${soknad.id}`)
        cy.contains('Ferdig')
    })
})
