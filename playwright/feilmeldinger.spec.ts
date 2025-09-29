import { Page } from '@playwright/test'

import { arbeidstakerGradert } from '../src/data/mock/data/soknad/arbeidstaker-gradert'

import { test, expect } from './fixtures'
import { klikkGaVidere, svarCombobox, svarJaHovedsporsmal } from './utilities'
import { validerAxeUtilityWrapper } from "./uuvalidering";

test.describe('Tester feilmeldinger', () => {
    const soknad = arbeidstakerGradert
    const testpersonQuery = '?testperson=arbeidstaker-gradert'

    async function verifiserFeilmelding(
        page: Page,
        lokalFeilmelding: string,
        globalFeilmelding: string,
        forventetFokusId: string,
        antallFeil = 1,
    ) {
        await expect(page.locator('.navds-error-message')).toContainText(lokalFeilmelding)
        await expect(page.getByText(`Det er ${antallFeil} feil i skjemaet`)).toBeVisible()
        await page.getByRole('link', { name: globalFeilmelding }).click()
        await expect(page.locator(`[id="${forventetFokusId}"]`)).toBeFocused()
    }

    async function verifiserIngenFeilmeldinger(page: Page) {
        await expect(page.locator('.navds-error-message')).toHaveCount(0)
        await expect(page.getByTestId('feil-oppsumering')).toBeHidden()
    }

    test('CHECKBOX_PANEL ingen valg', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/1` + testpersonQuery)

        await test.step('Validerer feilmelding for manglende bekreftelse', async () => {
            await page.getByRole('button', { name: 'Start søknad' }).click()

            await verifiserFeilmelding(
                page,
                'Du må bekrefte dette',
                'Du må bekrefte at du vil svare så riktig du kan',
                soknad.sporsmal[0].id,
            )

            await page.getByRole('checkbox').click()
            await verifiserIngenFeilmeldinger(page)
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('JA_NEI ingen valg', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/2` + testpersonQuery)

        await test.step('Validerer feilmelding for JA_NEI spørsmål', async () => {
            await klikkGaVidere(page, true)

            await verifiserFeilmelding(
                page,
                'Du må velge et alternativ',
                'Du må oppgi om du var tilbake i arbeid før friskmeldingsperioden utløp',
                soknad.sporsmal[1].id + '_0',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('radio', { name: 'Ja' }).click()
            await verifiserIngenFeilmeldinger(page)

        })
    })

    test('DATO validering', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/2` + testpersonQuery)
        await svarJaHovedsporsmal(page)
        const datofelt = page.getByLabel('Når begynte du å jobbe igjen?')
        const sporsmalId = soknad.sporsmal[1].undersporsmal[0].id

        await test.step('Ingen dato', async () => {
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Datoen følger ikke formatet dd.mm.åååå',
                'Datoen følger ikke formatet dd.mm.åååå',
                sporsmalId,
            )
        })

        await test.step('Ugyldig format "abc"', async () => {
            await datofelt.fill('abc')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Datoen følger ikke formatet dd.mm.åååå',
                'Datoen følger ikke formatet dd.mm.åååå',
                sporsmalId,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Ugyldig format "2020"', async () => {
            await datofelt.fill('2020')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Datoen følger ikke formatet dd.mm.åååå',
                'Datoen følger ikke formatet dd.mm.åååå',
                sporsmalId,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Dato mindre enn min', async () => {
            await datofelt.fill('01.01.1900')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Datoen kan ikke være før 01.04.2020',
                'Datoen kan ikke være før 01.04.2020',
                sporsmalId,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Dato større enn max', async () => {
            await datofelt.fill('01.01.5000')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Datoen kan ikke være etter 24.04.2020',
                'Datoen kan ikke være etter 24.04.2020',
                sporsmalId,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('PERIODER validering', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/3` + testpersonQuery)
        await svarJaHovedsporsmal(page)
        const sporsmalId = soknad.sporsmal[2].undersporsmal[0].id
        const fomInput = page.getByRole('textbox', { name: 'Fra og med' })
        const tomInput = page.getByRole('textbox', { name: 'Til og med' })

        const resetPerioder = async () => {
            await fomInput.clear()
            await tomInput.clear()
        }

        await test.step('Ingen fom', async () => {
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
                'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
                `${sporsmalId}_0_fom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Ingen tom', async () => {
            await fomInput.fill('15.04.2020')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du må oppgi en til og med dato i formatet dd.mm.åååå',
                'Du må oppgi en til og med dato i formatet dd.mm.åååå',
                `${sporsmalId}_0_tom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Fom før min', async () => {
            await resetPerioder()
            await fomInput.fill('01.01.2000')
            await tomInput.fill('10.04.2020')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Fra og med kan ikke være før 01.04.2020',
                'Fra og med kan ikke være før 01.04.2020',
                `${sporsmalId}_0_fom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Tom etter max', async () => {
            await resetPerioder()
            await fomInput.fill('01.04.2020')
            await tomInput.fill('30.12.2050')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Til og med kan ikke være etter 24.04.2020',
                'Til og med kan ikke være etter 24.04.2020',
                `${sporsmalId}_0_tom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Ugyldig format', async () => {
            await resetPerioder()
            await fomInput.fill('15.04.2020')
            await tomInput.fill('abc')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du må oppgi en til og med dato i formatet dd.mm.åååå',
                'Du må oppgi en til og med dato i formatet dd.mm.åååå',
                `${sporsmalId}_0_tom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Tom før fom', async () => {
            await resetPerioder()
            await fomInput.fill('15.04.2020')
            await tomInput.fill('10.04.2020')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Til og med må være etter fra og med',
                'Til og med må være etter fra og med',
                `${sporsmalId}_0_tom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Legg til periode uten å fylle ut', async () => {
            await resetPerioder()
            await fomInput.fill('15.04.2020')
            await tomInput.fill('20.04.2020')
            await page.getByRole('button', { name: 'Legg til ekstra periode' }).click()
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
                'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
                `${sporsmalId}_1_fom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Overlappende perioder', async () => {
            await page.getByRole('textbox', { name: 'Fra og med' }).nth(1).fill('20.04.2020')
            await page.getByRole('textbox', { name: 'Til og med' }).nth(1).fill('24.04.2020')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du kan ikke legge inn perioder som overlapper med hverandre',
                'Du kan ikke legge inn perioder som overlapper med hverandre',
                `${sporsmalId}_1_tom`,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Slett periode', async () => {
            await page.getByRole('button', { name: 'Slett periode' }).click()
            await verifiserIngenFeilmeldinger(page)
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('TALL validering', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/5` + testpersonQuery)
        await svarJaHovedsporsmal(page)
        await page.getByRole('textbox', { name: 'Hvor mange timer i uken jobber du vanligvis' }).fill('37.5')

        const prosentInput = page.getByLabel('Oppgi prosent')
        const timerInput = page.getByLabel('Oppgi timer totalt')

        await test.step('Prosent: Ingen verdi', async () => {
            await page.getByRole('radio', { name: 'Prosent' }).click()
            await klikkGaVidere(page, true)
            await expect(page.getByText('Du må oppgi en verdi')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Prosent: Mindre enn min', async () => {
            await prosentInput.fill('-10')
            await klikkGaVidere(page, true)
            await expect(page.getByText('Må være minimum 51')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Prosent: Større enn max', async () => {
            await prosentInput.fill('1000')
            await klikkGaVidere(page, true)
            await expect(page.getByText('Må være maksimum 99')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Timer: Grad mindre enn sykmeldingsgrad', async () => {
            await page.getByRole('radio', { name: 'Timer' }).click()
            await timerInput.fill('4')
            await klikkGaVidere(page, true)
            await expect(page.getByRole('alert').filter({ hasText: 'Timene utgjør mindre enn 50 %.' })).toBeVisible()
            await expect(
                page.getByRole('alert').filter({
                    hasText: 'Antall timer du skrev inn, betyr at du har jobbet 2 % av det du gjør når du er frisk.',
                }),
            ).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Timer: Feilmelding går bort', async () => {
            await timerInput.fill('67.5')
            await verifiserIngenFeilmeldinger(page)
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('CHECKBOX_GRUPPE validering', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/7` + testpersonQuery)
        await svarJaHovedsporsmal(page)

        await test.step('Ingen valg', async () => {
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du må velge minst et alternativ',
                'Du må oppgi hvilke inntektskilder du har',
                soknad.sporsmal[6].undersporsmal[0].undersporsmal[0].id,
            )
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Feilmelding går bort', async () => {
            await page
                .getByRole('group', { name: 'Velg inntektskildene som' })
                .getByRole('checkbox', { name: 'Dagmamma' })
                .check()

            await verifiserIngenFeilmeldinger(page)
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('COMBOBOX_SINGLE validering', async ({ page }) => {
        const medlemskapSoknadId = '7fdc72b9-30a9-435c-9eb1-f7cc68a8b429'
        await page.goto(`/syk/sykepengesoknad/soknader/${medlemskapSoknadId}/7?testperson=medlemskap`)
        await svarJaHovedsporsmal(page)

        await test.step('Ingen valg i combobox', async () => {
            await page.getByRole('textbox', { name: 'Hvilken arbeidsgiver jobbet du for?' }).fill('jobben')
            await page.getByRole('textbox', { name: 'Fra og med' }).fill('01.04.2020')
            await page.getByRole('textbox', { name: 'Til og med' }).fill('24.04.2020')
            await klikkGaVidere(page, true)
            await verifiserFeilmelding(
                page,
                'Du må velge et alternativ fra menyen',
                'Du må oppgi i hvilket land du har jobbet',
                'e5366d4e-65cf-34a0-bbf6-0e40230f8245',
            )
            await svarCombobox(page, 'I hvilket land arbeidet du?', 'Fra', 'Frankrike')
            await verifiserIngenFeilmeldinger(page)
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Legg til og slett', async () => {
            await page.getByRole('button', { name: 'Legg til nytt opphold' }).click()
            await expect(page.getByRole('button', { name: 'Slett', exact: true })).toHaveCount(2)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page, true)
            await expect(page.locator('.navds-error-message').first()).toContainText(
                'Du må velge et alternativ fra menyen',
            )
            await expect(page.locator('.navds-error-message').nth(1)).toContainText(
                'Du må oppgi arbeidsgiveren du har jobbet hos utenfor Norge',
            )
            await expect(page.locator('.navds-error-message').nth(2)).toContainText(
                'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
            )
            await expect(page.getByText('Det er 3 feil i skjemaet')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Slett', exact: true }).last().click()
            await verifiserIngenFeilmeldinger(page)
        })
    })
})
