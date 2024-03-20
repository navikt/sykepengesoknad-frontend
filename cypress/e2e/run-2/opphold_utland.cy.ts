import { klikkGaVidere, setPeriodeFraTil, sjekkMainContentFokus, svarCombobox } from '../../support/utilities'
import { oppholdUtland } from '../../../src/data/mock/data/soknad/opphold-utland'
import 'cypress-real-events'

describe('Tester søknad om å beholde sykepenger utenfor EØS', () => {
    const soknad = oppholdUtland

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=bare-utland')
    })

    it('Går til søknad som har påfølgende søknader som må fylles ut', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).should('include.text', 'Søknad om å beholde sykepenger utenfor EØS')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Velger periode for utenlandsopphold', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.findByRole('progressbar', { name: 'Søknadssteg' })
            .should('have.attr', 'aria-valuenow', '1')
            .and('have.attr', 'aria-valuemin', '1')
            .and('have.attr', 'aria-valuemax', '4')
            .and('have.attr', 'aria-valuetext', '1 av 4 steg')

        cy.get('body').findByRole('link', { name: 'Tilbake' }).should('not.exist')
        cy.contains('Opplysninger fra sykmeldingen').should('not.exist')
        cy.contains('Når skal du reise?')

        setPeriodeFraTil(17, 24)

        klikkGaVidere()
    })

    it('Velger land', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.get('body').findByRole('link', { name: 'Tilbake' }).should('exist')

        klikkGaVidere(true)
        cy.contains('Du må velge minst et alternativ fra menyen')
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppgi hvilket land du skal reise til')

        svarCombobox('Hvilket land skal du reise til?', 'Afg', 'Afghanistan')

        svarCombobox('Hvilket land skal du reise til?', 'Fransk', 'Fransk Polynesia')
        cy.contains('.navds-chips__chip-text', 'Fransk Polynesia').parent('button').click()

        cy.findAllByRole('combobox', { name: 'Hvilket land skal du reise til?' }).type('Sør-')
        cy.findByRole('option', { name: 'Sør-Korea' }).click()

        cy.get('.navds-combobox__button-toggle-list').click()

        klikkGaVidere()
    })

    it('Går tilbake og frem', function () {
        cy.get('body').findByRole('link', { name: 'Tilbake' }).click()
        sjekkMainContentFokus()
        klikkGaVidere()
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

        klikkGaVidere()
    })

    it('Søknad TIL_SLUTT', () => {
        cy.url().should('include', `${soknad.id}/4`)
        it('Bekreftelsespunktene er riktige', () => {
            const punkter = [
                'Jeg har avklart med legen at reisen ikke vil forlenge sykefraværet',
                'Reisen hindrer ikke planlagt behandling eller avtaler med NAV',
                'Reisen er avklart med arbeidsgiveren min',
            ]

            punkter.forEach((punkt) => {
                cy.contains(punkt)
            })
        })
    })

    it('Oppsummering fra søknaden', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.get('section[aria-label="Oppsummering fra søknaden"] button').click()

        cy.get('.oppsummering').contains('Når skal du reise?').siblings().should('contain', '17. – 24. desember 2020')

        cy.get('.oppsummering')
            .contains('Hvilket land skal du reise til?')
            .siblings()
            .should('contain', 'Afghanistan')
            .and('contain', 'Sør-Korea')

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

        cy.findByRole('progressbar', { name: 'Søknadssteg' })
            .should('have.attr', 'aria-valuenow', '4')
            .and('have.attr', 'aria-valuemin', '1')
            .and('have.attr', 'aria-valuemax', '4')
            .and('have.attr', 'aria-valuetext', '4 av 4 steg')

        cy.contains('Viktig å være klar over:')
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        ).click()

        cy.contains('Send søknaden').click()
    })

    it('Viser kvittering med Ferdig-knapp', function () {
        cy.url().should('include', `kvittering/${soknad.id}`)
        // Hva skjer videre
        cy.get('[data-cy="kvittering-panel"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får svar på om du kan reise')
            .and('contain', 'Risiko ved reise før du har mottatt svar')
            .and('contain', 'Les mer om sykepenger når du er på reise.')
            .and('contain', 'Du søker om sykepenger')

        cy.contains('Ferdig')
    })
})
