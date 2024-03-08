import {
    soknadSomTrigger401ForOppdaterSporsmal,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
} from '../../../src/data/mock/data/soknad/soknader-integration'
import { svarNeiHovedsporsmal, klikkGaVidere } from '../../support/utilities'

describe('Tester feilsituasjoner ', () => {
    describe('Tester SPORSMAL_FINNES_IKKE_I_SOKNAD ', () => {
        before(() => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        })

        it('Laster startside og åpner søknad', function () {
            cy.get(`a[href*=${soknadSomTriggerSporsmalFinnesIkkeISoknad.id}]`).click()
        })

        it('Ved svar på første spørsmål får vi en SPORSMAL_FINNES_IKKE_I_SOKNAD feil fra backend som gir oss refresh mulighet', function () {
            cy.url().should('include', `${soknadSomTriggerSporsmalFinnesIkkeISoknad.id}/1`)

            cy.get('.navds-checkbox__label').click()
            cy.contains('Gå videre').click()
        })

        it('Vi får se en feilmelding', function () {
            cy.contains('Ooops! Her har det skjedd noe rart')
            cy.contains('Gå tilbake til listen over alle søknader').should('not.exist')
            cy.contains('Last inn siden på nytt').click()
            cy.url().should('include', `${soknadSomTriggerSporsmalFinnesIkkeISoknad.id}/1`)
        })
    })

    describe('Tester FEIL_STATUS_FOR_OPPDATER_SPORSMAL ', () => {
        before(() => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        })

        it('Vi går inn på en annen søknad som gir en annen feil', function () {
            cy.get(`a[href*=${soknadSomTriggerFeilStatusForOppdaterSporsmal.id}]`).click()
        })

        it('Ved svar på første spørsmål får vi en FEIL_STATUS_FOR_OPPDATER_SPORSMAL feil fra backend som gir oss refresh mulighet', function () {
            cy.url().should('include', `${soknadSomTriggerFeilStatusForOppdaterSporsmal.id}/1`)

            cy.get('.navds-checkbox__label').click()
            cy.contains('Gå videre').click()
            cy.contains('Ooops! Her har det skjedd noe rart')
        })

        it('Vi får se en feilmelding', function () {
            cy.contains('Ooops! Her har det skjedd noe rart')
            cy.contains('Last inn siden på nytt').click()
            cy.url().should('include', `${soknadSomTriggerFeilStatusForOppdaterSporsmal.id}/1`)
        })

        it('Vi får se en feilmelding', function () {
            cy.get('.navds-checkbox__label').click()
            cy.contains('Gå videre').click()

            cy.contains('Ooops! Her har det skjedd noe rart')
            cy.contains('Gå tilbake til listen over alle søknader').should('not.exist')
            cy.contains('Last inn siden på nytt').click()
            cy.url().should('include', `${soknadSomTriggerFeilStatusForOppdaterSporsmal.id}/1`)
        })
    })

    describe('Tester 401 ved oppdatersporsmal ', () => {
        before(() => {
            cy.visit(
                `/syk/sykepengesoknad/soknader/${soknadSomTrigger401ForOppdaterSporsmal.id}/1?testperson=integrasjon-soknader`,
            )
            cy.get('.navds-heading--large').should('be.visible').and('contain.text', 'Søknad om sykepenger')
        })

        it('Ved svar og 401 gjør appen en refresh', function () {
            cy.url().should('include', `${soknadSomTrigger401ForOppdaterSporsmal.id}/1`)
            cy.get('[data-cy="bekreftCheckboksPanel"]').should('not.be.checked')

            cy.get('.navds-checkbox__label').click()
            cy.get('[data-cy="bekreftCheckboksPanel"]').should('be.checked')
            cy.contains('Gå videre').click()
            cy.url().should('include', `${soknadSomTrigger401ForOppdaterSporsmal.id}/1`)
            cy.get('form').should('not.contain', 'Ooops! Her har det skjedd noe rart')
            cy.get('[data-cy="bekreftCheckboksPanel"]').should('not.be.checked')
            cy.url().should('include', `${soknadSomTrigger401ForOppdaterSporsmal.id}/1`)
        })
    })

    describe('Tester 400 ved send søknad', () => {
        before(() => {
            cy.visit(
                '/syk/sykepengesoknad/soknader/9157b65a-0372-4657-864c-195037349df5/2?testperson=http-400-ved-send-soknad',
            )
            cy.get('.navds-heading--large').should('be.visible').and('contain.text', 'Søknad om sykepenger')
        })
        it('Når vi sender søknad som får 400 får vi en feilmelding som lar oss refreshe', function () {
            svarNeiHovedsporsmal()
            klikkGaVidere()
            cy.contains(
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            ).click()
            cy.contains('Send søknaden').click()
            cy.contains(
                'Vi har lagret dine svar, men du må laste inn siden på nytt før du kan sende søknaden. Klikk her for å laste inn siden på nytt.',
            ).click()
            cy.url().should(
                'equal',
                Cypress.config().baseUrl +
                    '/syk/sykepengesoknad/soknader/9157b65a-0372-4657-864c-195037349df5/1?testperson=http-400-ved-send-soknad',
            )
        })
    })

    describe('Tester 403 ved get av en annen persons søknad', () => {
        before(() => {
            cy.visit(`/syk/sykepengesoknad?testperson=http-403-ved-get-soknad`)
            cy.get('.navds-heading--large').should('be.visible').and('contain.text', 'Søknader')
        })
        it('Når vi laster inn søknad som får 403, får de en alert med knapp om å gå tilbake til listen over alle søknader', function () {
            cy.contains('Nye søknader').parent().parent().find('a').eq(0).click()
            cy.url().should('include', `3fa85f64-5717-4562-b3fc-2c963f67afa3/1`)

            cy.contains('Ooops! Her har det skjedd noe rart')
            cy.contains('Last inn siden på nytt').should('not.exist')

            cy.contains('Gå tilbake til listen over alle søknader').click()
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
            cy.url().should('include', '/syk/sykepengesoknad')
        })
    })

    describe('Tester 404 ved PUT av søknad som ble klippet bort mens brukeren svarte på den', () => {
        before(() => {
            cy.visit(
                `/syk/sykepengesoknad/soknader/3fa85f64-5717-4562-b3fc-2c963f66afa6/2?testperson=http-404-ved-put-soknad`,
            )
            cy.get('.navds-heading--large').should('be.visible').and('contain.text', 'Søknad om sykepenger')
        })
        it('Når vi oppdaterer søknad som får 404, får de en alert med knapp om å gå tilbake til listen over alle søknader', function () {
            cy.url().should('include', `3fa85f64-5717-4562-b3fc-2c963f66afa6/2`)

            svarNeiHovedsporsmal()
            klikkGaVidere(true)
            cy.contains('Ooops! Her har det skjedd noe rart')
            cy.contains('Gå tilbake til listen over alle søknader').click()
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
            cy.url().should('include', '/syk/sykepengesoknad')
        })
    })

    describe('Tester 404 ved GET av søknad som ble klippet bort mens brukeren svarte på den', () => {
        before(() => {
            cy.visit(`/syk/sykepengesoknad?testperson=http-404-ved-put-soknad`)
            cy.get('.navds-heading--large').should('be.visible').and('contain.text', 'Søknader')
        })
        it('Når vi laster inn søknad som får 404, får de en alert med knapp om å gå tilbake til listen over alle søknader', function () {
            cy.contains('Nye søknader').parent().parent().find('a').eq(1).click()
            cy.url().should('include', `5a7d403b-df78-491e-86f0-bf3f25408765/1`)

            cy.contains('Ooops! Her har det skjedd noe rart')
            cy.contains('Last inn siden på nytt').should('not.exist')

            cy.contains('Gå tilbake til listen over alle søknader').click()
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
            cy.url().should('include', '/syk/sykepengesoknad')
        })
    })

    describe('Tester 500 ved send søknad', () => {
        before(() => {
            cy.visit(
                '/syk/sykepengesoknad/soknader/2a9196c7-306f-4b4f-afdc-891d8a564e42/2?testperson=http-500-ved-send-soknad',
            )
            cy.get('.navds-heading--large').should('be.visible').and('contain.text', 'Søknad om sykepenger')
        })
        it('Når vi sender søknad som får 500 får vi en feilmelding', function () {
            svarNeiHovedsporsmal()
            klikkGaVidere()
            cy.contains(
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            ).click()
            cy.contains('Send søknaden').click()
            cy.contains('Beklager, det oppstod en teknisk feil.').click()
            cy.url().should(
                'equal',
                Cypress.config().baseUrl +
                    '/syk/sykepengesoknad/soknader/2a9196c7-306f-4b4f-afdc-891d8a564e42/3?testperson=http-500-ved-send-soknad',
            )
        })
    })
})
