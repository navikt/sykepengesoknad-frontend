import { avbryterSoknad } from '../../support/utilities'

describe('Tester opprettelse av søknad om å beholde sykepenger utenfor EØS', () => {
    it('Søknad ANSVARSERKLARING - steg 1', () => {
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')

        cy.findByRole('heading', { level: 1, name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).should('exist')
        cy.findByText('Du trenger ikke søke hvis du enten').should('exist')
        cy.findByRole('heading', { level: 2, name: 'Har du allerede vært på reise?' }).should('exist')
        cy.findByRole('heading', { level: 3, name: 'Er du statsborger i et land utenfor EU/EØS?' }).should('exist')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()
    })

    it('Går til side for ny søknad', () => {
        // Havner på side 2 for søknad som er ny, og dermed ikke finnes i mock-api (gir 404)
        cy.url().should('include', `/1`)
        cy.intercept('GET', '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/', (req) => {
            req.reply(404)
        })
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
        cy.visit('/syk/sykepengesoknad/sykepengesoknad-utland')
        avbryterSoknad()
        cy.url().should('include', `/syk/sykefravaer`)
    })
})
