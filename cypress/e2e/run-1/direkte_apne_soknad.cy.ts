import { foranArbeidstakerMedOppholdKvittering } from '../../../src/data/mock/data/soknad/soknader-integration'
import { arbeidstaker } from '../../../src/data/mock/data/soknad/arbeidstaker'
import { sendtArbeidsledig } from '../../../src/data/mock/data/soknad/arbeidsledig-sendt'

describe('Tester å åpne søknaden direkte fra sykefravaer', () => {
    const soknad = arbeidstaker

    it('Vi kan gå direkte til søknaden fra sykefravaer', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}`)
        cy.url().should('equal', Cypress.config().baseUrl + `/syk/sykepengesoknad/soknader/${soknad.id}/1`)
    })

    it('Åpner en sendt søknad på en annen siden og sendes til sendt-side', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}?testperson=integrasjon-soknader`)
        cy.url().should(
            'equal',
            Cypress.config().baseUrl +
                `/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}?testperson=integrasjon-soknader`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('NAV behandler søknaden din')

        cy.visit(`/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}/3?testperson=integrasjon-soknader`)
        cy.url().should(
            'equal',
            Cypress.config().baseUrl +
                `/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}?testperson=integrasjon-soknader`,
        )
        cy.contains('Søknad om sykepenger').and('be.visible')
        cy.contains('NAV behandler søknaden din')
    })

    it('Går direkte til en sendt arbeidstaker søknad og innholdet i kvitteringen blir lastet inn', function () {
        cy.visit(
            `/syk/sykepengesoknad/kvittering/${foranArbeidstakerMedOppholdKvittering.id}?testperson=integrasjon-soknader`,
        )
        cy.url().should(
            'equal',
            Cypress.config().baseUrl +
                `/syk/sykepengesoknad/kvittering/${foranArbeidstakerMedOppholdKvittering.id}?testperson=integrasjon-soknader`,
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

    it('Direkte navigering til en utgått søknad ender på listevisningen', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}`)
        cy.url().should('equal', Cypress.config().baseUrl + `/syk/sykepengesoknad/soknader/${soknad.id}/1`)

        cy.visit('/syk/sykepengesoknad/soknader/df1371a4-2773-41c2-a895-49f561424aaa/1?testperson=utgatt')
        cy.url().should('equal', Cypress.config().baseUrl + `/syk/sykepengesoknad?testperson=utgatt`)
    })
})
