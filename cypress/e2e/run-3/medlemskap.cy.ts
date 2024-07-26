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

describe('Søknad med alle opprinnelige spørsmål om medlemskap', () => {
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
        cy.contains('Oppsummering')
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

describe('Søknad med nytt spørsmål om oppholdstillatelse og kjent permanent oppholdstillatelse', () => {
    const soknad = medlemskapPerson.soknader[1]

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/11?testperson=medlemskap`)
        cy.get('.navds-heading--large')
            .should('be.visible')
            .and('have.text', 'Søknad om sykepenger8. – 21. september 2022')
    })

    it('Har kjent permanent oppholdstillatelse', () => {
        cy.contains('Oppholdstillatelse')
        cy.contains('Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:')
        cy.contains('Permanent oppholdstillatelse')
        cy.contains('Fra 1. mai 2024.')
        cy.contains('Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?')

        svarJaHovedsporsmal()
        cy.contains('Fra og med')
        cy.contains('Til og med')

        velgDato(1)
        setPeriodeFraTil(10, 25)
        klikkGaVidere()
    })

    it('Oppsumering av søknad', () => {
        cy.contains('Oppsummering')

        cy.findByRole('region', { name: 'Oppsummering fra søknaden' }).within(() => {
            cy.contains('Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?')
                .siblings()
                .should('contain', 'Ja')
            cy.contains('Hvilken dato fikk du denne oppholdstillatelsen?').siblings().should('contain', '01.')
            cy.contains('Hvilken periode gjelder denne oppholdstillatelsen?').siblings().should('contain', '10. – 25.')
        })
    })
})

describe('Søknad med nytt spørsmål om oppholdstillatelse og kjent midlertidig oppholdstillatelse', () => {
    const soknad = medlemskapPerson.soknader[2]

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/11?testperson=medlemskap`)
        cy.get('.navds-heading--large')
            .should('be.visible')
            .and('have.text', 'Søknad om sykepenger8. – 21. september 2022')
    })

    it('Har kjent midlertidig oppholdstillatelse', () => {
        cy.contains('Oppholdstillatelse')
        cy.contains('Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:')
        cy.contains('Midlertidig oppholdstillatelse')
        cy.contains('Fra 1. mai 2024 til 31. desember 2024.')
        cy.contains('Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?')

        cy.contains('Spørsmålet forklart').click()
        cy.contains(
            'Når du ikke er norsk statsborger, må du ha oppholdstillatelse i Norge for å være medlem i folketrygden og ha rett til sykepenger.',
        )
        cy.contains(
            'Har du ikke hatt en oppholdstillatelse som gjelder for en periode før den vi har mottatt fra Utlendingsdirektoratet, svarer du nei.',
        )
        cy.contains(
            'Har du hatt én eller flere tidligere oppholdstillatelser, svarer du ja. Vi ber deg oppgi den siste tillatelsen før perioden vi har mottatt fra Utlendingsdirektoratet.',
        )

        svarJaHovedsporsmal()
        cy.contains('Fra og med')
        cy.contains('Til og med')

        velgDato(1)
        setPeriodeFraTil(10, 20)

        klikkGaVidere()
    })

    it('Oppsumering av søknad', () => {
        cy.contains('Oppsummering')
        cy.findByRole('region', { name: 'Oppsummering fra søknaden' }).within(() => {
            cy.contains('Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?')
                .siblings()
                .should('contain', 'Ja')
            cy.contains('Hvilken dato fikk du denne oppholdstillatelsen?').siblings().should('contain', '01.')
            cy.contains('Hvilken periode gjelder denne oppholdstillatelsen?').siblings().should('contain', '10. – 20.')
        })
    })
})
