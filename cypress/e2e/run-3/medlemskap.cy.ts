import { medlemskapPerson } from '../../../src/data/mock/data/personas/medlemskap'
import 'cypress-real-events'
import {
    klikkGaVidere,
    setPeriodeFraTil,
    svarCombobox,
    svarFritekst,
    svarJaHovedsporsmal,
    svarRadioGruppe,
    velgDato,
} from '../../support/utilities'

describe('Tester medlemskap spørsmål', () => {
    const soknad = medlemskapPerson.soknader[0]

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/9?testperson=medlemskap`)
        cy.get('.navds-heading--large')
            .should('be.visible')
            .and('have.text', 'Søknad om sykepenger8. – 21. september 2022')
    })

    it('Arbeid utenfor Norge', () => {
        cy.contains('Arbeid utenfor Norge')
        svarJaHovedsporsmal()
        svarCombobox('I hvilket land utførte du arbeidet?', 'Fra', 'Frankrike')
        svarFritekst('Hvilken arbeidsgiver jobbet du for?', 'Croissant AS')
        setPeriodeFraTil(12, 20)
        klikkGaVidere()
    })

    it('Opphold utenfor EØS', () => {
        cy.contains('Opphold utenfor EØS')

        svarJaHovedsporsmal()
        svarCombobox('I hvilket land utenfor EØS har du oppholdt deg?', 'Fra', 'Fransk Polynesia')
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
        klikkGaVidere()
    })

    it('Opphold utenfor Norge', () => {
        cy.contains('Opphold utenfor Norge')

        svarJaHovedsporsmal()
        svarCombobox('I hvilket land utenfor Norge har du oppholdt deg?', 'Sve', 'Sveits')
        svarRadioGruppe('Hva var årsaken til oppholdet?', 'Studier')
        setPeriodeFraTil(12, 20)
        klikkGaVidere()
    })

    it('Oppholdstillatelse', () => {
        cy.contains('Oppholdstillatelse')

        svarJaHovedsporsmal()
        velgDato(22)
        svarRadioGruppe('Har du fått permanent oppholdstillatelse?', 'Ja')
        klikkGaVidere()
    })

    it('Oppsumering av søknad', () => {
        cy.contains('Til slutt')

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
