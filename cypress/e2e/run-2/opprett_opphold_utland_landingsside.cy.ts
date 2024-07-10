import { avbryterSoknad } from '../../support/utilities'

describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    before(() => {
        cy.clearCookies()
    })

    it('Søknad ANSVARSERKLARING - steg 1', () => {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')

        cy.findByRole('heading', { level: 1, name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).should('exist')
        cy.findByText('Du trenger ikke søke hvis du enten').should('exist')
        cy.findByRole('heading', { level: 2, name: 'Har du allerede vært på reise?' }).should('exist')
        cy.findByRole('heading', { level: 3, name: 'Er du statsborger i et land utenfor EU/EØS?' }).should('exist')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()

        cy.url().should('include', `b4de172d-863d-4069-b357-76019a9d9537/1`)
    })

    it('Avbryter søknaden og havner på avbrutt-siden', () => {
        avbryterSoknad()
        cy.url().should('include', `avbrutt/`)
        cy.contains('Fjernet søknad om å beholde sykepenger utenfor EU/EØS')
        cy.findByRole('link', { name: 'nav.no/sykepenger#utland' })
        cy.contains(
            'I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke om å få beholde sykepengene etter du har reist.',
        )
    })

    it('Avbryter en ikke-opprettet opphold utland søknad', () => {
        // Ignorerer eventuelle feil fra demosiden
        cy.origin('https://demo.ekstern.dev.nav.no', () => {
            cy.on('uncaught:exception', () => {
                return false
            })
        })

        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')
        avbryterSoknad()
        cy.url().should('include', `/syk/sykefravaer`)
    })
})
