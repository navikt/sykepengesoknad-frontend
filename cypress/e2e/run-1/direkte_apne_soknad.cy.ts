import { arbeidstaker } from '../../../src/data/mock/data/opplaering'
import {
    foranArbeidstakerMedOppholdKvittering,
    sendtArbeidsledig,
} from '../../../src/data/mock/data/soknader-integration'

describe('Tester å åpne søknaden direkte fra sykefravaer', () => {
    const soknad = arbeidstaker

    it('Vi kan gå direkte til søknaden fra sykefravaer', function () {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}`)
        cy.url().should('equal', Cypress.config().baseUrl + `/syk/sykepengesoknad/soknader/${soknad.id}/1`)

        cy.contains('Opplysninger fra sykmelding').and('be.visible')
        cy.contains('1. april - 24. april 2020 (24 dager)')
        cy.contains('Posten Norge AS, Bærum')
        cy.contains('100% sykmeldt')
    })

    it('Åpner en sendt søknad på en annen siden og sendes til sendt-side', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}?testperson=alle-soknader`)
        cy.url().should(
            'equal',
            Cypress.config().baseUrl +
                `/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}?testperson=alle-soknader`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('NAV behandler søknaden din')

        cy.visit(`/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}/3?testperson=alle-soknader`)
        cy.url().should(
            'equal',
            Cypress.config().baseUrl +
                `/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}?testperson=alle-soknader`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('NAV behandler søknaden din')
    })

    it('Går direkte til en sendt arbeidstaker søknad og innholdet i kvitteringen blir lastet inn', function () {
        cy.visit(`/syk/sykepengesoknad/kvittering/${foranArbeidstakerMedOppholdKvittering.id}?testperson=alle-soknader`)
        cy.url().should(
            'equal',
            Cypress.config().baseUrl +
                `/syk/sykepengesoknad/kvittering/${foranArbeidstakerMedOppholdKvittering.id}?testperson=alle-soknader`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('Søknaden er sendt')
        cy.contains('Du får sykepengene fra arbeidsgiveren din')
    })

    it('Hvis vi går til /soknader sendes vi til listevisning', function () {
        cy.visit('/syk/sykepengesoknad/soknader/')
        cy.url().should('equal', Cypress.config().baseUrl + '/syk/sykepengesoknad/soknader')
        cy.contains('Nye søknader').and('be.visible')
    })
})
