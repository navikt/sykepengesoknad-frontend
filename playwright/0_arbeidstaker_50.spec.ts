import { test, expect, Page } from '@playwright/test'

import { arbeidstakerGradert } from '../src/data/mock/data/soknad/arbeidstaker-gradert'

import {
    apneReadmore,
    checkViStolerPaDeg,
    svarJaHovedsporsmal,
    harSynligTittel,
    harSynligTekst,
} from './utils/utilities'
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
    const periodeComponent = page.getByRole('group', { name: /Tidsperiode/ }).nth(periodeIndex)

    await periodeComponent
        .getByRole('button', { name: /Åpne datovelger/i })
        .first()
        .click()

    await periodeComponent
        .getByRole('grid')
        .getByRole('button')
        .filter({ hasText: new RegExp(`^${fom}$`) })
        .click()

    await periodeComponent
        .getByRole('grid')
        .getByRole('button')
        .filter({ hasText: new RegExp(`^${tom}$`) })
        .click()
}

test.describe('Tester arbeidstakersøknad - gradert 50%', () => {
    test('Full søknadsflyt', async ({ page }) => {
        test.setTimeout(60000)

        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
        const soknadId = arbeidstakerGradert.id

        await test.step('Laster startside', async () => {
            await page.waitForLoadState('load')

            await harSynligTittel(page, 'Søknader', 1)
            await expect(await harSynligTittel(page, 'Søknader', 1)).toHaveText('Søknader')
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator(`a[href*="${soknadId}"]`).click()
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await page.waitForLoadState('load')
            await harSynligTittel(page, 'Før du søker', 2)

            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/1`))

            await expect(page.locator('strong', { hasText: 'Sykmeldt fra:' })).toBeVisible()
            await expect(page.getByText('Posten Norge AS, Bærum')).toBeVisible()

            const soknadPerioder = page.locator('[data-cy="soknad-perioder"]')
            await expect(soknadPerioder.locator('strong', { hasText: 'Perioder:' })).toBeVisible()
            const listeItems = soknadPerioder.locator('li')
            await expect(listeItems).toHaveCount(2)
            await expect(listeItems.first()).toContainText('april 2020')
            await expect(listeItems.first()).toContainText('50%')

            await checkViStolerPaDeg(page, false)

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
            await page.getByRole('button', { name: /Start søknad/i }).click()
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/2`))
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når begynte du å jobbe igjen?')
            await page.getByRole('button', { name: /Åpne datovelger/i }).click()
            await page.getByRole('grid').getByRole('button').filter({ hasText: /^20$/ }).click()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad FERIE_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/3`))
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når tok du ut feriedager?')
            await setPeriodeFraTil(page, 16, 23)
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/4`))
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når tok du permisjon?')
            await setPeriodeFraTil(page, 14, 22)
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad JOBBET_DU_GRADERT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/5`))

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Du kan avtale med lederen din å jobbe mer enn det som står i sykmeldingen.',
                'Dersom du har gjort færre arbeidsoppgaver enn vanlig, men brukt lengre tid på dem',
            ])

            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Antall timer du skrev inn, betyr at du har jobbet')).toBeHidden()

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

            await harSynligTekst(page, 'Hvor mye jobbet du tilsammen 1. - 24. april 2020?')
            await harSynligTekst(page, 'Velg timer eller prosent')

            await page.locator('.undersporsmal input[value="Prosent"]').click()
            await fillTextFieldByLabel(page, 'Oppgi prosent', '51')

            await page.locator('.undersporsmal input[value="Timer"]').click()

            await fillTextFieldByLabel(page, 'Oppgi timer totalt', '10.7')

            // First attempt (should show validation messages on same page)
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()

            await expect(page.getByRole('button', { name: /Er prosenten lavere enn du forventet/i })).toBeVisible()

            await harSynligTekst(page, 'Timene utgjør mindre enn 50 %.')
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
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad ARBEID_UTENFOR_NORGE', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/6`))
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Har du arbeidet i utlandet i løpet av de siste 12 månedene?')
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/7`))
            await harSynligTekst(page, 'Har du andre inntektskilder enn nevnt over?')
            await svarJaHovedsporsmal(page)
            await expect(
                page.locator(
                    'text=Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei',
                ),
            ).toBeVisible()
            await expect(page.getByRole('checkbox', { name: /ansatt et annet sted enn nevnt over/ })).toBeVisible()
            await page.locator('input[type="checkbox"]#d9ac4359-5519-34f1-b59d-b5ab24e55821').check()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/8`))
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når var du utenfor EU/EØS?')
            await setPeriodeFraTil(page, 14, 22)
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Gå videre/i }).click()
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\/9`))
            await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
            const oppsummering = page.locator('[role="region"][aria-label="Oppsummering fra søknaden"]')
            await expect(oppsummering).toContainText('Søknaden sendes til')
            await expect(oppsummering).toContainText('Posten Norge AS, Bærum')
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: /Send søknaden/i }).click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`.*\/kvittering\/${soknadId}`))
            const kvittering = page.getByRole('main')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Du får sykepengene fra arbeidsgiveren din')
            await expect(kvittering).not.toContainText('Vi trenger inntektsopplysninger fra deg')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
