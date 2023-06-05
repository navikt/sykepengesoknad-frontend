import { oppholdUtland } from '../../../src/data/mock/data/opphold-utland'
import { RSSoknad } from '../../../src/types/rs-types/rs-soknad'
import { setPeriodeFraTil } from '../../support/utilities'
import { soknaderOpplaering } from '../../../src/data/mock/personas'

describe('Tester søknad om å beholde sykepenger utenfor EØS', () => {
    const soknad = soknaderOpplaering.find((sok: RSSoknad) => sok.id === oppholdUtland.id)!

    before(() => {
        cy.visit('/syk/sykepengesoknad')
    })

    it('Går til søknad som har påfølgende søknader som må fylles ut', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).should('include.text', 'Søknad om å beholde sykepenger utenfor EØS')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Velger periode for utenlandsopphold', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.contains('Tilbake').should('not.exist')
        cy.contains('Opplysninger fra sykmeldingen').should('not.exist')
        cy.contains('Når skal du reise?')

        setPeriodeFraTil(17, 24)

        cy.contains('Gå videre').click()
    })

    it('Velger land', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.contains('Tilbake').should('exist')

        cy.get('[data-cy="landvelger"] input[type="text"]').click()
        cy.contains('Afghanistan').click()
        cy.contains('Albania').should('not.exist')
        cy.get('.navds-chips__removable-icon').click()

        cy.contains('Gå videre').click()
        cy.contains('Du må velge ett land')
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppgi et land utenfor EØS. Innenfor EØS trenger du ikke søke.')

        cy.contains('Hvilket land skal du reise til?')
        cy.get('[data-cy="landvelger"] input[type="text"]').type('Fransk', { force: true })
        cy.contains('Fransk Polynesia')
        cy.contains('Søre franske territorier').click()
        cy.get('.navds-chips__removable-icon').click()
        cy.contains('Du må velge ett land')
        cy.contains('Det er 1 feil i skjemaet')

        cy.get('[data-cy="landvelger"] input[type="text"]').type('Fransk', { force: true })
        cy.contains('Fransk Polynesia')
        cy.contains('Søre franske territorier').click()

        cy.get('[data-cy="landvelger"] input[type="text"]').type('De')
        cy.contains('De forente arabiske emirater')
        cy.contains('De okkuperte palestinske områdene').click()

        cy.get('[data-cy="landvelger"] input[type="text"]').type('R')
        cy.contains('Amerikansk Samoa').click()
        cy.contains('Amerikansk Samoa').find('.navds-chips__removable-icon').click()
        cy.contains('Amerikansk Samoa').should('not.exist')

        cy.contains('Gå videre').click()
    })

    it('Går tilbake og frem', function () {
        cy.contains('Tilbake').click()
        cy.contains('Gå videre').click()
    })

    it('Oppgir arbeidsgiver', function () {
        cy.url().should('include', `${soknad.id}/3`)

        cy.contains('Har du arbeidsgiver?').get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.contains('Er du 100 % sykmeldt?')
            .siblings()
            .eq(0)
            .within(() => {
                cy.get('input[value="JA"]').click()
            })

        cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
            .siblings()
            .eq(0)
            .within(() => {
                cy.get('input[value="NEI"]').click()
            })

        cy.contains('Gå videre').click()
    })

    it('Oppsummering fra søknaden', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.get('section[aria-label="Oppsummering fra søknaden"] button').click()

        cy.get('.oppsummering').contains('Når skal du reise?').siblings().should('contain', '17. – 24. desember 2020')

        cy.get('.oppsummering')
            .contains('Hvilket land skal du reise til?')
            .siblings()
            .should('contain', 'Søre franske territorier')
            .and('contain', 'De okkuperte palestinske områdene')

        cy.get('.oppsummering').contains('Har du arbeidsgiver?').siblings().should('contain', 'Ja')
        cy.get('.oppsummering').within(() => {
            cy.contains('Er du 100 % sykmeldt?').siblings().should('contain', 'Ja')

            cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
                .siblings()
                .should('contain', 'Nei')
        })
    })

    it('Sender søknaden', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.contains('Før du reiser ber vi deg bekrefte')
        cy.contains('Jeg bekrefter de to punktene ovenfor').click()

        cy.contains('Send søknaden').click()
    })

    it('Viser kvittering med knapp til neste søknad', function () {
        cy.url().should('include', `kvittering/${soknad.id}`)
        // Hva skjer videre
        cy.get('[data-cy="kvittering-alert"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får svar på om du kan reise')
            .and('contain', 'Risiko ved reise før du har mottatt svar')
            .and('contain', 'Les mer om sykepenger når du er på reise.')
            .and('contain', 'Du søker om sykepenger')

        cy.contains('Gå til neste søknad')
    })

    it('Sender inn søknad som ikke har påfølgende søknader', function () {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/4?testperson=bare-utland`)

        cy.url().should('include', `${soknad.id}/4`)
        cy.contains('Jeg bekrefter de to punktene ovenfor').click()
        cy.contains('Send søknaden').click()
    })

    it('Viser kvittering med Ferdig-knapp', function () {
        cy.url().should('include', `kvittering/${soknad.id}`)
        cy.contains('Ferdig')
    })
})
