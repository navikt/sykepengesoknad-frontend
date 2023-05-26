import { arbeidstakerGradert } from '../../../src/data/mock/data/opplaering'
import { RSSoknad } from '../../../src/types/rs-types/rs-soknad'

describe('Tester feilmeldinger', () => {
    function gaTilSoknad(soknad: RSSoknad, steg: string) {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/${steg}`)
    }

    function gaVidere() {
        cy.contains('Gå videre').click()
    }

    function feilmeldingHandteringForNyDatepicker(
        lokalFeilmelding: string,
        globalFeilmelding: string,
        focusTarget: string,
        antallForventedeFeil = 1,
    ) {
        //        const errorColorRgb = 'rgb(195, 0, 0) 0px 0px 0px 1px inset, rgb(0, 52, 125) 0px 0px 0px 3px'

        cy.get('[data-cy="feil-oppsumering"]').should('exist')
        cy.get('[data-cy="feil-oppsumering"]').contains(globalFeilmelding)

        cy.get('[data-cy="feil-lokal"]').should('exist')
        cy.get('[data-cy="feil-lokal"]').contains(lokalFeilmelding)

        cy.get('[data-cy="feil-oppsumering"]')
            .should('exist')
            .within(() => {
                cy.contains(`Det er ${antallForventedeFeil} feil i skjemaet`)
                cy.contains(globalFeilmelding).click()
            })

        cy.focused().should('have.attr', 'id', focusTarget)
        //      cy.focused().should('have.css', 'box-shadow', errorColorRgb)
    }

    //Denne erstatter feilmeldingHandtering funksjonen ettersom vi bytter ut komponentene med de fra designsystemet
    function feilmeldingHandteringForNyeKomponenter(
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
        cy.focused().should('have.attr', 'name', focusTarget)
    }

    function ingenFeilmeldinger() {
        cy.get('.skjemaelement__input--harFeil').should('not.exist')
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

        cy.get('.navds-confirmation-panel__inner').should('exist')
        cy.get('.navds-error-message').contains(
            'Du må bekrefte at du har lest og forstått informasjonen før du kan gå videre',
        )
        cy.get('[data-cy="feil-oppsumering"]')
            .should('exist')
            .within(() => {
                cy.contains('Det er 1 feil i skjemaet')
                cy.contains('Du må bekrefte at du har lest og forstått informasjonen før du kan gå videre').click()
            })
        cy.focused().should('have.attr', 'name', arbeidstakerGradert.sporsmal[0].id)
        cy.focused().click()

        ingenFeilmeldinger()
    })

    it('JA_NEI ingen valg', () => {
        gaTilSoknad(arbeidstakerGradert, '3')
        gaVidere()

        cy.get('[data-cy="feil-lokal"]').contains('Du må velge et alternativ')
        cy.get('[data-cy="feil-oppsumering"]')
            .should('exist')
            .within(() => {
                cy.contains('Det er 1 feil i skjemaet')
                cy.contains('Du må oppgi om du var tilbake i arbeid før friskmeldingsperioden utløp').click()
            })
        cy.focused().should('have.attr', 'name', arbeidstakerGradert.sporsmal[2].id).click()

        ingenFeilmeldinger()
    })

    it('DATO ingen dato', () => {
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Datoen følger ikke formatet dd.mm.åååå',
            'Datoen følger ikke formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO mindre enn min', () => {
        cy.get('.navds-text-field__input').type('01.01.1900')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Datoen kan ikke være før 01.04.2020',
            'Datoen kan ikke være før 01.04.2020',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO større enn max', () => {
        cy.get('.navds-text-field__input').clear()
        cy.get('.navds-text-field__input').type('01.01.5000')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Datoen kan ikke være etter 24.04.2020',
            'Datoen kan ikke være etter 24.04.2020',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO ugyldig format', () => {
        cy.get('.navds-text-field__input').clear()
        cy.get('.navds-text-field__input').type('abc')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Datoen følger ikke formatet dd.mm.åååå',
            'Datoen følger ikke formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('DATO ugyldig format', () => {
        cy.get('.navds-text-field__input').clear()
        cy.get('.navds-text-field__input').type('2020')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Datoen følger ikke formatet dd.mm.åååå',
            'Datoen følger ikke formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[2].undersporsmal[0].id,
        )
    })

    it('PERIODER ingen fom', () => {
        gaTilSoknad(arbeidstakerGradert, '4')
        cy.get('input[value=JA]').click()
        gaVidere()

        feilmeldingHandteringForNyDatepicker(
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_fom',
        )
    })

    it('PERIODER ingen tom', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '15.04.2020')
        // cy.focused().type('15.04.2020')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER ugyldig format', () => {
        cy.focused().clear()
        cy.focused().type('abc')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER tom før fom', () => {
        cy.focused().clear()
        cy.focused().type('10.04.2020')
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Til og med må være etter fra og med',
            'Til og med må være etter fra og med',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_tom',
        )
    })

    it('PERIODER legges til uten å besvares', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(1, '01.04.2020')
        cy.contains('Legg til ekstra periode').click()
        gaVidere()
        feilmeldingHandteringForNyDatepicker(
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_0_fom',
            2,
        )
    })

    it('PERIODER overlapper', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '05.04.2020')
        setPeriodeDateFieldMedIndex(1, '20.04.2020')
        setPeriodeDateFieldMedIndex(2, '21.04.2020')
        cy.focused().blur()
        feilmeldingHandteringForNyDatepicker(
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            'Du må oppgi en til og med dato i formatet dd.mm.åååå',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_1_tom',
        )

        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '04.04.2020')
        setPeriodeDateFieldMedIndex(1, '21.04.2020')
        setPeriodeDateFieldMedIndex(2, '20.04.2020')
        setPeriodeDateFieldMedIndex(3, '24.04.2020')
        cy.focused().blur()
        feilmeldingHandteringForNyDatepicker(
            'Perioder kan ikke overlappe',
            'Du kan ikke legge inn perioder som overlapper med hverandre',
            arbeidstakerGradert.sporsmal[3].undersporsmal[0].id + '_1_fom',
            1,
        )
    })

    it('PERIODER slett', () => {
        resetAllePeriodeDateFelter()
        setPeriodeDateFieldMedIndex(0, '04.04.2020')
        setPeriodeDateFieldMedIndex(1, '19.04.2020')
        setPeriodeDateFieldMedIndex(2, '20.04.2020')
        setPeriodeDateFieldMedIndex(3, '24.04.2020')
        cy.focused().blur()

        ingenFeilmeldinger()

        cy.contains('Slett periode').click()
        ingenFeilmeldinger()
    })

    it('TALL validering på onSubmit og onChange', function () {
        gaTilSoknad(arbeidstakerGradert, '7')
        cy.get('input[value=JA]').click()
        cy.get(`input[name=${arbeidstakerGradert.sporsmal[6].undersporsmal[0].id}]`).type('37.5')
        cy.get('.undersporsmal input[value=Timer]').click()
        cy.get(
            `input[name=${arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[1].undersporsmal[0].id}]`,
        ).type('1')
        cy.get('[data-cy="feil-lokal"]').should('not.exist')
        gaVidere()
        feilmeldingHandteringForNyeKomponenter(
            'Timene utgjør mindre enn 50 %.',
            'Antall timer du skrev inn, betyr at du har jobbet 0 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
            arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[1].undersporsmal[0].id,
        )
    })

    it('TALL ingen valg', () => {
        gaTilSoknad(arbeidstakerGradert, '7')
        cy.get('input[value=JA]').click()
        cy.get('.undersporsmal input[value=Prosent]').click()
        cy.get(`input[name=${arbeidstakerGradert.sporsmal[6].undersporsmal[0].id}]`).type('37.5')
        gaVidere()

        feilmeldingHandteringForNyeKomponenter(
            'Du må oppgi en verdi',
            'Du må svare på hvor mye du jobbet totalt',
            arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('TALL mindre enn min', () => {
        cy.focused().type('-10')
        gaVidere()
        feilmeldingHandteringForNyeKomponenter(
            'Må være minimum 51',
            'Vennligst fyll ut et tall mellom 51 og 99',
            arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('TALL større enn max', () => {
        cy.focused().clear()
        cy.focused().type('1000')
        gaVidere()
        feilmeldingHandteringForNyeKomponenter(
            'Må være maksimum 99',
            'Vennligst fyll ut et tall mellom 51 og 99',
            arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[0].undersporsmal[0].id,
        )
    })

    it('TALL grad mindre enn sykmeldingsgrad', () => {
        cy.get(`input[id=${arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[1].id}]`).click()
        gaVidere()
        feilmeldingHandteringForNyeKomponenter(
            'Du må oppgi en verdi',
            'Du må svare på hvor mye du jobbet totalt',
            arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[1].undersporsmal[0].id,
        )
        cy.focused().type('1')
        gaVidere()
        feilmeldingHandteringForNyeKomponenter(
            'Timene utgjør mindre enn 50 %.',
            'Antall timer du skrev inn, betyr at du har jobbet 0 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
            arbeidstakerGradert.sporsmal[6].undersporsmal[1].undersporsmal[1].undersporsmal[0].id,
        )
    })

    it('TALL grad feilmelding går bort', () => {
        cy.focused().clear()
        cy.focused().type('67.5')
        ingenFeilmeldinger()
    })

    it('CHECKBOX_GRUPPE ingen valgt', () => {
        gaTilSoknad(arbeidstakerGradert, '9')
        cy.get('input[value=JA]').click()
        gaVidere()

        cy.get('.navds-error-message').should('exist')
        cy.get('.navds-error-message').contains('Du må velge minst et alternativ')
        cy.get('[data-cy="feil-oppsumering"]')
            .should('exist')
            .within(() => {
                cy.contains('Det er 1 feil i skjemaet')
                cy.contains('Du må oppgi hvilke inntektskilder du har').click()
            })
        cy.focused().should('have.attr', 'id', arbeidstakerGradert.sporsmal[8].undersporsmal[0].undersporsmal[0].id)
    })

    it('CHECKBOX_GRUPPE feilmelding går bort', () => {
        cy.focused().click()
        ingenFeilmeldinger()
    })
})
