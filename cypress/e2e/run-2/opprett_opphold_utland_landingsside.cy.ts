import { avbryterSoknad } from '../../support/utilities'
import { avbruttOppholdUtland } from '../../../src/data/mock/data/soknad/opphold-utland'

describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    it('Søknad ANSVARSERKLARING - steg 1', () => {
        cy.clearAllCookies()
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')

        cy.intercept(
            'GET',
            'http://localhost:8080/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/b4de172d-863d-4069-b357-76019a9d9537',
            (req) => {
                req.reply({
                    statusCode: 200,
                    body: { ...avbruttOppholdUtland, status: 'NY' },
                })
            },
        ).as('henterNyOppholdUtland')

        cy.findByRole('heading', { level: 1, name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).should('exist')
        cy.findByText('Du trenger ikke søke hvis du').should('exist')
        cy.findByRole('heading', { level: 2, name: 'Har du allerede vært på reise?' }).should('exist')
        cy.findByRole('heading', { level: 3, name: 'Er du statsborger i et land utenfor EU/EØS?' }).should('exist')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()

        cy.url().should('include', `b4de172d-863d-4069-b357-76019a9d9537/1`)
        cy.contains('Hvilke(t) land skal du reise til?')
        cy.contains('Du kan velge flere.')
    })

    it('Kan gå tilbake til forside, og starte søknad igjen', () => {
        cy.contains('Forrige steg').click()
        cy.url().should('include', 'sykepengesoknad-utland')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()
        cy.url().should('include', `b4de172d-863d-4069-b357-76019a9d9537/1`)
    })

    it('Avbryter søknaden og havner på avbrutt-siden', () => {
        cy.intercept(
            'POST',
            'http://localhost:8080/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/b4de172d-863d-4069-b357-76019a9d9537/avbryt',
            (req) => {
                req.reply({
                    statusCode: 200,
                    body: avbruttOppholdUtland,
                })
            },
        ).as('avbryterNyOppholdUtland')
        cy.intercept(
            'GET',
            'http://localhost:8080/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/b4de172d-863d-4069-b357-76019a9d9537',
            (req) => {
                req.reply({
                    statusCode: 200,
                    body: avbruttOppholdUtland,
                })
            },
        ).as('henterNyAvbruttOppholdUtland')

        cy.contains('Ooops! Her har det skjedd noe rart').should('not.exist')
        cy.contains('Jeg har ikke behov for denne søknaden').should('be.visible')
        avbryterSoknad()
        cy.url().should('include', `avbrutt/b4de172d-863d-4069-b357-76019a9d9537`)
        cy.contains('Søknaden ble avbrutt og fjernet av deg')
        cy.contains('Fjernet søknad om å beholde sykepenger utenfor EU/EØS')

        cy.findByRole('link', { name: 'nav.no/sykepenger#utland' })
        cy.contains(
            'I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke om å få beholde sykepengene etter du har reist.',
        )
    })

    it('Avbryter en ikke-opprettet opphold utland søknad', () => {
        cy.intercept('GET', 'https://demo.ekstern.dev.nav.no/syk/sykefravaer', {
            statusCode: 200,
            body: { message: 'Mocked response' },
        }).as('demoRequest')

        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')
        avbryterSoknad()
        cy.wait('@demoRequest').its('request.url').should('include', 'https://demo.ekstern.dev.nav.no/syk/sykefravaer')
    })
})
