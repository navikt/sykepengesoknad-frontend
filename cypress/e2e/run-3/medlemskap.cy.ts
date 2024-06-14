import { medlemskapPerson } from '../../../src/data/mock/data/personas/medlemskap'
import 'cypress-real-events'
import {
    klikkGaVidere,
    setPeriodeFraTil,
    svarCombobox,
    svarFritekst,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarRadioGruppe,
    velgDato,
} from '../../support/utilities'

describe('Tester medlemskap spørsmål', () => {
    const soknad = medlemskapPerson.soknader[0]

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/7?testperson=medlemskap`)
        cy.get('.navds-heading--large')
            .should('be.visible')
            .and('have.text', 'Søknad om sykepenger8. – 21. september 2022')
    })

    it('Arbeid utenfor Norge', () => {
        cy.contains('Arbeid utenfor Norge')
        svarJaHovedsporsmal()
        svarCombobox('I hvilket land arbeidet du?', 'Fra', 'Frankrike')
        svarFritekst('Hvilken arbeidsgiver jobbet du for?', 'Croissant AS')
        setPeriodeFraTil(12, 20)
        klikkGaVidere()
    })

    it('Opphold utenfor Norge', () => {
        cy.contains('Opphold utenfor Norge')

        svarJaHovedsporsmal()
        svarCombobox('I hvilket land utenfor Norge har du oppholdt deg?', 'Sve', 'Sveits')
        svarRadioGruppe('Hva gjorde du i utlandet?', 'Jeg studerte')
        setPeriodeFraTil(12, 20)
        klikkGaVidere()
    })

    it('Opphold utenfor EØS', () => {
        cy.contains('Opphold utenfor EU/EØS')

        svarJaHovedsporsmal()
        svarCombobox('I hvilket land utenfor EU/EØS eller Sveits har du oppholdt deg?', 'Fra', 'Fransk Polynesia')
        svarRadioGruppe('Hva gjorde du i utlandet?', 'Jeg var på ferie')
        setPeriodeFraTil(12, 20, 0)

        cy.contains('Legg til nytt opphold').click()

        cy.findAllByRole('combobox', { name: 'I hvilket land utenfor EU/EØS eller Sveits har du oppholdt deg?' })
            .should('have.length', 2)
            .last()
            .type('Ba')
        cy.findByRole('option', { name: 'Barbados' }).click()

        cy.findAllByRole('group', { name: 'Hva gjorde du i utlandet?' })
            .should('have.length', 2)
            .last()
            .findByRole('radio', { name: 'Jeg bodde der' })
            .check()

        setPeriodeFraTil(12, 24, 1)

        klikkGaVidere()
    })

    it('Var du på reise utenfor EU/EØS mens du var sykmeldt', () => {
        cy.contains('Var du på reise utenfor EU/EØS mens du var sykmeldt')
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })

    it('Oppholdstillatelse', () => {
        cy.contains('Oppholdstillatelse')

        svarJaHovedsporsmal()
        velgDato(22)
        svarRadioGruppe('Er oppholdstillatelsen midlertidig eller permanent?', 'Midlertidig')
        setPeriodeFraTil(12, 24)
        klikkGaVidere()
    })

    it('Oppsumering av søknad', () => {
        cy.contains('Til slutt')

        cy.findByRole('region', { name: 'Oppsummering fra søknaden' }).click()
        cy.findByRole('region', { name: 'Oppsummering fra søknaden' }).within(() => {
            cy.contains('Har du arbeidet utenfor Norge i løpet av de siste 12 månedene før du ble syk?')
                .siblings()
                .should('contain', 'Ja')
            cy.contains('I hvilket land arbeidet du?').siblings().should('contain', 'Frankrike')
            cy.contains('Hvilken arbeidsgiver jobbet du for?').siblings().should('contain', 'Croissant AS')
            cy.contains('I hvilken periode arbeidet du i utlandet?').siblings().should('contain', '12. – 20.')
        })
    })
})
