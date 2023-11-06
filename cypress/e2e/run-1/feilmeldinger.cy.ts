/* eslint-disable cypress/unsafe-to-chain-command */
import { RSSoknad } from '../../../src/types/rs-types/rs-soknad'
import { svarCombobox, svarFritekst } from '../../support/utilities'
import 'cypress-real-events'
import { arbeidstakerGradert } from '../../../src/data/mock/data/soknad/arbeidstaker-gradert'

describe('Tester feilmeldinger', () => {
    function gaTilSoknad(soknad: RSSoknad, steg: string) {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/${steg}`)
    }

    function gaVidere() {
        cy.contains('Gå videre').click()
    }

    function feilmeldingHandtering(
        lokalFeilmelding: string,
        globalFeilmelding: string,
        focusTarget: string,
        antallForventedeFeil = 1,
    ) {
        cy.get('.navds-error-message').should('exist')
        cy.get('.navds-error-message').contains(lokalFeilmelding)

        cy.get('[data-cy="feil-oppsumering"]')
            .should('exist')
            .within(() => {
                cy.contains(`Det er ${antallForventedeFeil} feil i skjemaet`)
                cy.contains(globalFeilmelding).click()
            })

        cy.focused().should('have.attr', 'id', focusTarget)
    }
    function feilmeldingHandteringMedLokalFeilmelding(
        lokalFeilmelding: string,
        globalFeilmelding: string,
        focusTarget: string,
    ) {
        cy.get('.navds-form-field__error').should('exist')
        cy.get('[data-cy="feil-lokal"]').contains(lokalFeilmelding)
        cy.get('[data-cy="feil-oppsumering"]')
            .should('exist')
            .within(() => {
                cy.contains('Det er 1 feil i skjemaet')
                cy.contains(globalFeilmelding).click()
            })
        cy.focused().should('have.attr', 'id', focusTarget)
    }

    function ingenFeilmeldinger() {
        cy.get('.skjemaelement__input--harFeil').should('not.exist')
        cy.get('.navds-error-message').should('not.exist')
        cy.get('[data-cy="feil-lokal"]').should('not.exist')
        cy.get('[data-cy="feil-oppsumering"]').should('not.exist')
    }

    function resetAllePeriodeDateFelter() {
        cy.get('[data-cy="perioder"]')
            .find('.navds-text-field__input')
            .each(($el) => {
                cy.wrap($el).clear()
            })
    }

    function setPeriodeDateFieldMedIndex(index: number, datestring: string) {
        /*  Fra og med felter er 0 eller partall og til og med felter er oddetall. */
        cy.get('[data-cy="perioder"]').find('.navds-text-field__input').eq(index).type(datestring)
    }

    it('CHECKBOX_PANEL ingen valg', () => {
        gaTilSoknad(arbeidstakerGradert, '1')
        gaVidere()

        feilmeldingHandtering(
            'Du må bekrefte dette',
            'Du må bekrefte at du har lest og forstått informasjonen før du kan gå videre',
            arbeidstakerGradert.sporsmal[0].id,
        )
        cy.focused().should('have.attr', 'name', arbeidstakerGradert.sporsmal[0].id).click()

        ingenFeilmeldinger()
    })

    it('JA_NEI ingen valg', () => {
        gaTilSoknad(arbeidstakerGradert, '3')
        gaVidere()

        feilmeldingHandtering(
            'Du må velge et alternativ',
            'Du må oppgi om du var tilbake i arbeid før friskmeldingsperioden utløp',
            arbeidstakerGradert.sporsmal[2].id + '_0',
        )
        cy.focused().should('have.attr', 'name', arbeidstakerGradert.sporsmal[2].id).click()

        ingenFeilmeldinger()
    })

    it('DATO ingen dato', () => {
        gaVidere()
        feilmeldingHandtering(
            'Datoen følger ikke formatet dd.mm.åååå',
            'Datoen følger ikke formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO mindre enn min', () => {
        cy.get('.navds-text-field__input').type('01.01.1900')
        gaVidere()
        feilmeldingHandtering(
            'Datoen kan ikke være før 01.04.2020',
            'Datoen kan ikke være før 01.04.2020',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO større enn max', () => {
        cy.get('.navds-text-field__input').clear()
        cy.get('.navds-text-field__input').type('01.01.5000')
        gaVidere()
        feilmeldingHandtering(
            'Datoen kan ikke være etter 24.04.2020',
            'Datoen kan ikke være etter 24.04.2020',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO ugyldig format', () => {
        cy.get('.navds-text-field__input').clear()
        cy.get('.navds-text-field__input').type('abc')
        gaVidere()
        feilmeldingHandtering(
            'Datoen følger ikke formatet dd.mm.åååå',
            'Datoen følger ikke formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO ugyldig format', () => {
        cy.get('.navds-text-field__input').clear()
        cy.get('.navds-text-field__input').type('2020')
        gaVidere()
        feilmeldingHandtering(
            'Datoen følger ikke formatet dd.mm.åååå',
            'Datoen følger ikke formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('PERIODER ingen fom', () => {
        gaTilSoknad(arbeidstakerGradert, '4')
        cy.get('input[value=JA]').click()

        gaVidere()
        feilmeldingHandtering(
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_fom',
        )
    })

    it('PERIODER ingen tom', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '15.04.2020')

        gaVidere()
        feilmeldingHandtering(
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER mindre enn fom', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '01.01.2000')
        setPeriodeDateFieldMedIndex(1, '10.04.2020')

        gaVidere()
        feilmeldingHandtering(
            'Fra og med kan ikke være før 01.04.2020',
            'Fra og med kan ikke være før 01.04.2020',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_fom',
        )
    })

    it('PERIODER større enn tom', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '01.04.2020')
        setPeriodeDateFieldMedIndex(1, '30.12.2050')

        gaVidere()
        feilmeldingHandtering(
            'Til og med kan ikke være etter 24.04.2020',
            'Til og med kan ikke være etter 24.04.2020',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER ugyldig format', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '15.04.2020')
        setPeriodeDateFieldMedIndex(1, 'abc')

        gaVidere()
        feilmeldingHandtering(
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER tom før fom', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '15.04.2020')
        setPeriodeDateFieldMedIndex(1, '10.04.2020')

        gaVidere()
        feilmeldingHandtering(
            'Til og med må være etter fra og med',
            'Til og med må være etter fra og med',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER legges til uten å besvares', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '15.04.2020')
        setPeriodeDateFieldMedIndex(1, '20.04.2020')
        cy.contains('Legg til ekstra periode').click()

        gaVidere()
        feilmeldingHandtering(
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_1_fom',
        )
    })

    it('PERIODER overlapper', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '04.04.2020')
        setPeriodeDateFieldMedIndex(1, '21.04.2020')
        setPeriodeDateFieldMedIndex(2, '20.04.2020')
        setPeriodeDateFieldMedIndex(3, '24.04.2020')

        gaVidere()
        feilmeldingHandtering(
            'Du kan ikke legge inn perioder som overlapper med hverandre',
            'Du kan ikke legge inn perioder som overlapper med hverandre',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_1_tom',
        )
    })

    it('PERIODER slett', () => {
        cy.contains('Slett periode').click()
        gaVidere()
        ingenFeilmeldinger()
    })

    it('TALL ingen valg', () => {
        gaTilSoknad(arbeidstakerGradert, '6')
        cy.get('input[value=JA]').click()
        cy.get('.undersporsmal input[value=Prosent]').click()
        cy.get(`input[name=${arbeidstakerGradert.sporsmal[5].undersporsmal[0].id}]`).type('37.5')
        gaVidere()

        feilmeldingHandteringMedLokalFeilmelding(
            'Du må oppgi en verdi',
            'Du må svare på hvor mye du jobbet totalt',
            arbeidstakerGradert.sporsmal[5].undersporsmal[1].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('TALL mindre enn min', () => {
        cy.focused().type('-10')
        gaVidere()
        feilmeldingHandteringMedLokalFeilmelding(
            'Må være minimum 51',
            'Vennligst fyll ut et tall mellom 51 og 99',
            arbeidstakerGradert.sporsmal[5].undersporsmal[1].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('TALL større enn max', () => {
        cy.focused().clear()
        cy.focused().type('1000')
        gaVidere()
        feilmeldingHandteringMedLokalFeilmelding(
            'Må være maksimum 99',
            'Vennligst fyll ut et tall mellom 51 og 99',
            arbeidstakerGradert.sporsmal[5].undersporsmal[1].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('TALL grad mindre enn sykmeldingsgrad', () => {
        cy.get('.undersporsmal input[value=Timer]').click()
        cy.get(
            `input[name=${arbeidstakerGradert.sporsmal[5].undersporsmal[1].undersporsmal[1].undersporsmal[0].id}]`,
        ).type('1')
        gaVidere()
        feilmeldingHandteringMedLokalFeilmelding(
            'Timene utgjør mindre enn 50 %.',
            'Antall timer du skrev inn, betyr at du har jobbet 2 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
            arbeidstakerGradert.sporsmal[5].undersporsmal[1].undersporsmal[1].undersporsmal[0].id,
        )
    })

    it('TALL grad feilmelding går bort', () => {
        cy.focused().clear()
        cy.focused().type('67.5')
        ingenFeilmeldinger()
    })

    it('CHECKBOX_GRUPPE ingen valgt', () => {
        gaTilSoknad(arbeidstakerGradert, '8')
        cy.get('input[value=JA]').click()
        gaVidere()
        feilmeldingHandtering(
            'Du må velge minst et alternativ',
            'Du må oppgi hvilke inntektskilder du har',
            arbeidstakerGradert.sporsmal[7].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('CHECKBOX_GRUPPE feilmelding går bort', () => {
        cy.focused().click()
        ingenFeilmeldinger()
    })

    it('COMBOBOX_SINGLE ingen valg', () => {
        cy.visit(`/syk/sykepengesoknad/soknader/7fdc72b9-30a9-435c-9eb1-f7cc68a8b429/7?testperson=medlemskap`)
        cy.get('input[value=JA]').click()
        svarFritekst('Hvilken arbeidsgiver jobbet du for?', 'jobben')
        setPeriodeDateFieldMedIndex(0, '01.04.2020')
        setPeriodeDateFieldMedIndex(1, '24.04.2020')

        gaVidere()
        feilmeldingHandtering(
            'Du må velge et alternativ fra menyen',
            'Du må oppgi i hvilket land du har jobbet',
            'e5366d4e-65cf-34a0-bbf6-0e40230f8245',
        )

        svarCombobox('I hvilket land arbeidet du?', 'Fra', 'Frankrike')
        ingenFeilmeldinger()
    })

    it('COMBOBOX_SINGLE legg til og slett', () => {
        cy.contains('Legg til nytt opphold').click()
        cy.findAllByRole('button', { name: 'Slett' }).should('have.length', 2)

        gaVidere()
        cy.get('.navds-error-message').contains('Du må velge et alternativ fra menyen')
        cy.get('.navds-error-message').contains('Du må oppgi arbeidsgiveren du har jobbet hos utenfor Norge')
        cy.get('.navds-error-message').contains('Du må oppgi en fra og med dato i formatet dd.mm.åååå')
        cy.get('[data-cy="feil-oppsumering"]').contains(`Det er 3 feil i skjemaet`)

        cy.findAllByRole('button', { name: 'Slett' }).should('have.length', 2).last().click()
        ingenFeilmeldinger()
    })
})
