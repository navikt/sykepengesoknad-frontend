import { test, expect } from '@playwright/test'

import { medlemskapPerson } from '../src/data/mock/data/personas/medlemskap'

import {
    klikkGaVidere,
    setPeriodeFraTil,
    svarCombobox,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarRadioGruppe,
    svarTekstboks,
    sporsmalOgSvar,
} from './utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

async function velgDato(page: any, dato = 10) {
    await page.locator('.navds-date__field-button').first().click()
    await page.locator('.rdp-day').getByText(dato.toString()).first().click()
}

async function svarFritekst(page: any, sporsmal: string, svar: string) {
    await svarTekstboks(page, sporsmal, svar)
}

test.describe('Søknad med alle opprinnelige spørsmål om medlemskap', () => {
    const soknad = medlemskapPerson.soknader[0]

    test('Gjennomfører hele søknadsflyten for medlemskap', async ({ page }) => {
        await test.step('Laster startside', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/7?testperson=medlemskap`)
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Arbeid utenfor Norge', async () => {
            await expect(page.getByRole('heading', { name: 'Arbeid utenfor Norge' })).toBeVisible()
            await svarJaHovedsporsmal(page)
            await svarCombobox(page, 'I hvilket land arbeidet du?', 'Fra', 'Frankrike')
            await svarFritekst(page, 'Hvilken arbeidsgiver jobbet du for?', 'Croissant AS')
            await setPeriodeFraTil(page, 12, 20)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Opphold utenfor Norge', async () => {
            await expect(page.getByRole('heading', { name: 'Opphold utenfor Norge', level: 2 })).toBeVisible()
            await svarJaHovedsporsmal(page)
            await svarCombobox(page, 'I hvilket land utenfor Norge har du oppholdt deg?', 'Sve', 'Sveits')
            await page.locator('.navds-combobox__button-toggle-list').click()
            await svarRadioGruppe(page, 'Hva gjorde du i utlandet?', 'Jeg studerte')
            await setPeriodeFraTil(page, 12, 20)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Opphold utenfor EØS', async () => {
            await expect(page.getByRole('heading', { name: 'Opphold utenfor EU/EØS', level: 2 })).toBeVisible()
            await svarJaHovedsporsmal(page)
            await svarCombobox(
                page,
                'I hvilket land utenfor EU/EØS eller Sveits har du oppholdt deg?',
                'Fra',
                'Fransk Polynesia',
            )
            await page.locator('.navds-combobox__button-toggle-list').click()
            await svarRadioGruppe(page, 'Hva gjorde du i utlandet?', 'Jeg var på ferie')
            await setPeriodeFraTil(page, 12, 20, 0)

            await page.getByText('Legg til nytt opphold').click()

            await expect(
                page.getByRole('combobox', { name: 'I hvilket land utenfor EU/EØS eller Sveits har du oppholdt deg?' }),
            ).toHaveCount(2)
            await page
                .getByRole('combobox', { name: 'I hvilket land utenfor EU/EØS eller Sveits har du oppholdt deg?' })
                .last()
                .type('Ba')
            await page.getByRole('option', { name: 'Barbados' }).click()

            await expect(page.getByRole('group', { name: 'Hva gjorde du i utlandet?' })).toHaveCount(2)
            await page
                .getByRole('group', { name: 'Hva gjorde du i utlandet?' })
                .last()
                .getByRole('radio', { name: 'Jeg bodde der' })
                .check()

            await setPeriodeFraTil(page, 12, 24, 1)
            await validerAxeUtilityWrapper(page, test.info())

            await klikkGaVidere(page)
        })

        await test.step('Var du på reise utenfor EU/EØS mens du var sykmeldt', async () => {
            await expect(page.getByText('Var du på reise utenfor EU/EØS mens du var sykmeldt')).toBeVisible()
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())

            await klikkGaVidere(page)
        })

        await test.step('Oppholdstillatelse', async () => {
            await expect(page.getByRole('heading', { name: 'Oppholdstillatelse', level: 2 })).toBeVisible()
            await svarJaHovedsporsmal(page)
            await velgDato(page, 14)
            await svarRadioGruppe(page, 'Er oppholdstillatelsen midlertidig eller permanent?', 'Midlertidig')
            await setPeriodeFraTil(page, 12, 13)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT (oppsummering)', async () => {
            await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden' })).toBeVisible()

            const oppsummeringContainer = page.locator('[data-cy="oppsummering-fra-søknaden"]')

            // Arbeid utenfor Norge
            await sporsmalOgSvar(
                oppsummeringContainer,
                'Har du arbeidet utenfor Norge i løpet av de siste 12 månedene før du ble syk?',
                'Ja',
            )
            await sporsmalOgSvar(oppsummeringContainer, 'I hvilket land arbeidet du?', 'Frankrike')
            await sporsmalOgSvar(oppsummeringContainer, 'Hvilken arbeidsgiver jobbet du for?', 'Croissant AS')
            await sporsmalOgSvar(oppsummeringContainer, 'I hvilken periode arbeidet du i utlandet?', '12. – 20.')

            // Oppholdstillatelse
            await sporsmalOgSvar(oppsummeringContainer, 'Har du oppholdstillatelse fra Utlendingsdirektoratet?', 'Ja')
            await sporsmalOgSvar(oppsummeringContainer, 'Hvilken dato fikk du denne oppholdstillatelsen?', '14.10.2023')

            const oppholdstillatelseAnswer = oppsummeringContainer
                .getByText('Er oppholdstillatelsen midlertidig eller permanent?')
                .locator('xpath=following-sibling::*')
            await expect(oppholdstillatelseAnswer.first()).toContainText('Midlertidig')
            await expect(oppholdstillatelseAnswer.first()).toContainText('12. – 13.')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})

test.describe('Søknad med nytt spørsmål om oppholdstillatelse og kjent permanent oppholdstillatelse', () => {
    const soknad = medlemskapPerson.soknader[1]

    test('Gjennomfører søknadsflyten med permanent oppholdstillatelse', async ({ page }) => {
        await test.step('Laster startside', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/11?testperson=medlemskap`)
            await expect(page.locator('.navds-heading--large')).toBeVisible()
        })

        await test.step('Har kjent permanent oppholdstillatelse', async () => {
            await expect(page.getByRole('heading', { name: 'Oppholdstillatelse', level: 2 })).toBeVisible()
            await expect(
                page.getByText('Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:'),
            ).toBeVisible()
            await expect(page.getByText('Permanent oppholdstillatelse')).toBeVisible()
            await expect(page.getByText('Fra 1. mai 2024.')).toBeVisible()
            await expect(
                page.getByText('Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?'),
            ).toBeVisible()

            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Fra og med')).toBeVisible()
            await expect(page.getByText('Til og med')).toBeVisible()

            await velgDato(page, 1)
            await setPeriodeFraTil(page, 10, 15)
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT (oppsummering)', async () => {
            await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden', level: 2 })).toBeVisible()

            const oppsummeringContainer = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            await sporsmalOgSvar(
                oppsummeringContainer,
                'Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?',
                'Ja',
            )
            await sporsmalOgSvar(oppsummeringContainer, 'Hvilken dato fikk du denne oppholdstillatelsen?', '01.')
            await sporsmalOgSvar(
                oppsummeringContainer,
                'Hvilken periode gjelder denne oppholdstillatelsen?',
                '10. – 15.',
            )
        })
    })
})

test.describe('Søknad med nytt spørsmål om oppholdstillatelse og kjent midlertidig oppholdstillatelse', () => {
    const soknad = medlemskapPerson.soknader[2]

    test('Gjennomfører søknadsflyten med midlertidig oppholdstillatelse', async ({ page }) => {
        await test.step('Laster startside', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/11?testperson=medlemskap`)
            await expect(page.locator('.navds-heading--large')).toBeVisible()
        })

        await test.step('Har kjent midlertidig oppholdstillatelse', async () => {
            await expect(page.getByRole('heading', { name: 'Oppholdstillatelse', level: 2 })).toBeVisible()
            await expect(
                page.getByText('Vi har mottatt denne oppholdstillatelsen fra Utlendingsdirektoratet:'),
            ).toBeVisible()
            await expect(page.getByText('Midlertidig oppholdstillatelse')).toBeVisible()
            await expect(page.getByText('Fra 1. mai 2024 til 31. desember 2024.')).toBeVisible()
            await expect(
                page.getByText('Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?'),
            ).toBeVisible()

            await page.getByText('Spørsmålet forklart').click()
            await expect(
                page.getByText(
                    'Når du ikke er norsk statsborger, må du ha oppholdstillatelse i Norge for å være medlem i folketrygden og ha rett til sykepenger.',
                ),
            ).toBeVisible()
            await expect(
                page.getByText(
                    'Har du ikke hatt en oppholdstillatelse som gjelder for en periode før den vi har mottatt fra Utlendingsdirektoratet, svarer du nei.',
                ),
            ).toBeVisible()
            await expect(
                page.getByText(
                    'Har du hatt én eller flere tidligere oppholdstillatelser, svarer du ja. Vi ber deg oppgi den siste tillatelsen før perioden vi har mottatt fra Utlendingsdirektoratet.',
                ),
            ).toBeVisible()

            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Fra og med')).toBeVisible()
            await expect(page.getByText('Til og med')).toBeVisible()

            await velgDato(page, 1)
            await setPeriodeFraTil(page, 10, 15)
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT (oppsummering)', async () => {
            await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden', level: 2 })).toBeVisible()

            const oppsummeringContainer = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            await sporsmalOgSvar(
                oppsummeringContainer,
                'Har Utlendingsdirektoratet gitt deg en oppholdstillatelse før 1. mai 2024?',
                'Ja',
            )
            await sporsmalOgSvar(oppsummeringContainer, 'Hvilken dato fikk du denne oppholdstillatelsen?', '01.')
            await sporsmalOgSvar(
                oppsummeringContainer,
                'Hvilken periode gjelder denne oppholdstillatelsen?',
                '10. – 15.',
            )
        })
    })
})
