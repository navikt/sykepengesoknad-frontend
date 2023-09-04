import { medlemskapPerson } from '../../../src/data/mock/data/medlemskap'
import 'cypress-real-events'
import {
    klikkGaVidere,
    setPeriodeFraTil,
    svarComboboxSingle,
    svarFritekst,
    svarJaHovedsporsmal,
    svarRadioGruppe,
    velgDato,
} from '../../support/utilities'

describe('Tester medlemskap spørsmål', () => {
    const soknad = medlemskapPerson().soknader[0]

    before(() => {
        cy.clearCookies()
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/9?testperson=medlemskap`)
        cy.get('.navds-heading--large')
            .should('be.visible')
            .and('have.text', 'Søknad om sykepenger8. – 21. september 2022')
    })

    it('Arbeid utenfor Norge', () => {
        svarJaHovedsporsmal()
        svarComboboxSingle('I hvilket land utførte du arbeidet?', 'Fra', 'Frankrike')
        svarFritekst('Hvilken arbeidsgiver jobbet du for?', 'Croissant AS')
        setPeriodeFraTil(12, 20)
    })

    it('Opphold utenfor EØS', () => {
        klikkGaVidere()

        svarJaHovedsporsmal()
        svarComboboxSingle('I hvilket land utenfor EØS har du oppholdt deg?', 'Fra', 'Fransk Polynesia')
        svarRadioGruppe('Hva var årsaken til oppholdet?', 'Ferie')
        setPeriodeFraTil(12, 20, 0)

        cy.contains('Legg til nytt opphold').click()

        cy.findAllByRole('combobox', { name: 'I hvilket land utenfor EØS har du oppholdt deg?' })
            .should('have.length', 2)
            .last()
            .type('Ba')
        cy.findByRole('option', { name: 'Barbados' }).click()

        cy.findAllByRole('group', { name: 'Hva var årsaken til oppholdet?' })
            .should('have.length', 2)
            .last()
            .findByRole('radio', { name: 'Ferie' })
            .check()

        setPeriodeFraTil(12, 20, 1)
    })

    it('Opphold utenfor Norge', () => {
        klikkGaVidere()

        svarJaHovedsporsmal()
        svarComboboxSingle('I hvilket land utenfor Norge har du oppholdt deg?', 'Sve', 'Sveits')
        svarRadioGruppe('Hva var årsaken til oppholdet?', 'Studier')
        setPeriodeFraTil(12, 20)
    })

    it('Oppholdstillatelse', () => {
        klikkGaVidere()

        svarJaHovedsporsmal()
        velgDato(22)
        svarRadioGruppe('Har du fått permanent oppholdstillatelse?', 'Ja')
    })

    it('Oppsumering av søknad', () => {
        klikkGaVidere()

        cy.findByRole('region', { name: 'Oppsummering fra søknaden' }).click()
        cy.findByRole('region', { name: 'Oppsummering fra søknaden' }).within(() => {
            cy.contains('Har du utført arbeid utenfor Norge i løpet av de siste 12 månedene?')
                .siblings()
                .should('contain', 'Ja')
            cy.contains('I hvilket land utførte du arbeidet?').siblings().should('contain', 'Frankrike')
            cy.contains('Hvilken arbeidsgiver jobbet du for?').siblings().should('contain', 'Croissant AS')
            cy.contains('I hvilken periode ble arbeidet utført?').siblings().should('contain', '12. – 20.')
        })
    })
})
