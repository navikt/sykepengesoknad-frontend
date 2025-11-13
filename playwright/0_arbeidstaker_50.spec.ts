import { test, expect, Page } from '@playwright/test'

import { arbeidstakerGradert } from '../src/data/mock/data/soknad/arbeidstaker-gradert'

import { validerAxeUtilityWrapper } from './uuvalidering'
const fillTextFieldByLabel = async (page: Page, labelText: string, value: string, fallbackSelector?: string) => {
    try {
        await page.getByLabel(labelText).fill(value)
    } catch (error) {
        if (fallbackSelector) {
            await page.locator(fallbackSelector).fill(value)
        } else {
            throw error
        }
    }
}

const setPeriodeFraTil = async (page: Page, fom: number, tom: number, periodeIndex = 0) => {
    const periodeComponent = page.locator(`[data-cy="periode"]`).nth(periodeIndex)

    await periodeComponent.locator('.navds-date__field-button').nth(0).click()

    await periodeComponent.locator('.rdp-cell').filter({ hasText: fom.toString() }).click()

    await periodeComponent.locator('.rdp-cell').filter({ hasText: tom.toString() }).click()
}

test.describe('Tester arbeidstakersøknad - gradert 50%', () => {
    test('Full søknadsflyt', async ({ page }) => {
        test.setTimeout(60000)

        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
        const soknadId = arbeidstakerGradert.id

        await test.step('Laster startside', async () => {
            await page.waitForLoadState('load')

            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator(`a[href*="${soknadId}"]`).click()
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await page.waitForLoadState('load')
            await expect(page.getByRole('heading', { name: 'Før du søker' })).toBeVisible()

            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/1`))

            await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check()

            await expect(page.getByRole('button', { name: 'Start søknad' })).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Start søknad' }).click()
        })

        await test.step('Tilbake til ANSVARSERKLARING og frem igjen', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/2`))
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Tilbake' }).click()
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/1`))
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Start søknad' }).click()
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/2`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når begynte du å jobbe igjen?')).toBeVisible()
            await page.locator('.navds-date__field-button').click()
            await page.locator('.rdp-day').getByText('20', { exact: true }).click()
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad FERIE_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/3`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når tok du ut feriedager?')).toBeVisible()
            await setPeriodeFraTil(page, 16, 23)
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/4`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når tok du permisjon?')).toBeVisible()
            await setPeriodeFraTil(page, 14, 22)
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad JOBBET_DU_GRADERT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/5`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Antall timer du skrev inn, betyr at du har jobbet')).toBeHidden()

            await expect(
                page.locator(
                    'text=Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                ),
            ).toBeVisible()
            await fillTextFieldByLabel(
                page,
                'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                '12',
            )

            await expect(page.locator('text=Hvor mye jobbet du tilsammen 1. - 24. april 2020?')).toBeVisible()
            await expect(page.locator('text=Velg timer eller prosent')).toBeVisible()

            await page.locator('.undersporsmal input[value="Prosent"]').click()
            await fillTextFieldByLabel(page, 'Oppgi prosent', '51')

            await page.locator('.undersporsmal input[value="Timer"]').click()

            await fillTextFieldByLabel(page, 'Oppgi timer totalt', '10.7')

            // First attempt (should show validation messages on same page)
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()

            await expect(
                page.locator('.navds-read-more__button').filter({ hasText: 'Er prosenten lavere enn du forventet?' }),
            ).toBeVisible()

            await expect(
                page.locator('[data-cy="feil-lokal"]').filter({ hasText: 'Timene utgjør mindre enn 50 %.' }),
            ).toBeVisible()
            await expect(
                page.locator(
                    'text=Antall timer du skrev inn, betyr at du har jobbet 49 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
                ),
            ).toBeVisible()
            await expect(
                page.locator(
                    'text=Antall timer du skrev inn, betyr at du har jobbet 49% av det du gjør når du er frisk.',
                ),
            ).toBeVisible()

            await fillTextFieldByLabel(page, 'Oppgi timer totalt', '11')

            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad ARBEID_UTENFOR_NORGE', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/6`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Har du arbeidet i utlandet i løpet av de siste 12 månedene?')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/7`))
            await expect(page.locator('text=Har du andre inntektskilder enn nevnt over?')).toBeVisible()
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(
                page.locator(
                    'text=Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei',
                ),
            ).toBeVisible()
            await expect(
                page.locator('.undersporsmal .navds-checkbox label[for="d9ac4359-5519-34f1-b59d-b5ab24e55821"]'),
            ).toHaveText(/ansatt et annet sted enn nevnt over/)
            await page.locator('input[type="checkbox"]#d9ac4359-5519-34f1-b59d-b5ab24e55821').check()
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/8`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når var du utenfor EU/EØS?')).toBeVisible()
            await setPeriodeFraTil(page, 14, 22)
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/9`))
            await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden' })).toBeVisible()
            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            await expect(oppsummering).toContainText('Søknaden sendes til')
            await expect(oppsummering).toContainText('Posten Norge AS, Bærum')
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('button').filter({ hasText: 'Send søknaden' }).click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`.*\/kvittering\/${soknadId}`))
            const kvittering = page.locator('[data-cy="kvittering"]')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Du får sykepengene fra arbeidsgiveren din')
            await expect(kvittering).not.toContainText('Vi trenger inntektsopplysninger fra deg')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
