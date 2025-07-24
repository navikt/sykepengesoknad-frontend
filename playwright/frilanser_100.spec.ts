import { frilanser } from '../src/data/mock/data/soknad/frilanser'

import { test, expect } from './fixtures'
import {
    checkViStolerPaDeg,
    harSoknaderlisteHeading,
    klikkGaVidere,
    setPeriodeFraTil,
    svarJaHovedsporsmal,
    svarRadioGruppe,
    trykkPaSoknadMedId,
} from './utilities'

test.describe('Tester frilansersøknad', () => {
    const soknad = frilanser
    const testpersonQuery = '?testperson=frilanser'

    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad' + testpersonQuery)
    })

    test('Full flyt for frilansersøknad', async ({ page }) => {
        await test.step('Laster startside og åpner søknad', async () => {
            await harSoknaderlisteHeading(page)
            await trykkPaSoknadMedId(page, soknad.id)
        })

        await test.step('Søknad ANSVARSERKLARING - steg 1', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))
            await checkViStolerPaDeg(page)
        })

        await test.step('Søknad TILBAKE_I_ARBEID - steg 2', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()
            await page.getByRole('button', { name: 'Åpne datovelger' }).click()
            await page.getByRole('button', { name: 'mandag 20' }).click()
            await klikkGaVidere(page)
        })

        await test.step('Søknad ARBEID_UNDERVEIS_100_PROSENT - steg 3', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/3`))
            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Oppgi arbeidsmengde i timer eller prosent')).toBeVisible()
            await page.getByRole('radio', { name: 'Prosent' }).click()
            await expect(
                page.getByText(
                    'Oppgi hvor mange prosent av din normale arbeidstid du jobbet i perioden 1. - 24. april 2020?',
                ),
            ).toBeVisible()
            await page.getByRole('textbox', { name: 'Oppgi hvor mange prosent av' }).fill('21')
            await expect(page.getByText('Jobber du vanligvis 37,5 timer i uka?')).toBeVisible()
            await svarRadioGruppe(page, 'Jobber du vanligvis 37,5 timer i uka?', 'Ja')
            await klikkGaVidere(page)
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER - steg 4', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/4`))
            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Hvilke inntektskilder har du?')).toBeVisible()
            await page.getByRole('checkbox', { name: 'arbeidsforhold' }).click()
            await svarRadioGruppe(page, 'Er du sykmeldt fra dette?', 'Ja')
            await expect(
                page.getByText(
                    'Du må sende egen sykepengesøknad for dette. Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
                ),
            ).toBeVisible()
            await klikkGaVidere(page)
        })

        await test.step('Søknad UTLAND - steg 5', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/5`))
            await expect(
                page.getByText('Har du vært utenfor EU/EØS mens du var sykmeldt 1. - 24. april 2020?'),
            ).toBeVisible()
            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Når var du utenfor EU/EØS?')).toBeVisible()
            await setPeriodeFraTil(page, 14, 22)
            await klikkGaVidere(page)
        })

        await test.step('Søknad ARBEID_UTENFOR_NORGE - steg 6', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/6`))
            await expect(page.getByText('Har du arbeidet i utlandet i løpet av de siste 12 månedene?')).toBeVisible()
            await svarJaHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT - steg 7', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/7`))
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))
            const kvitteringPanel = page.locator('[data-cy="kvittering-panel"]')
            await expect(kvitteringPanel).toContainText('Hva skjer videre?')
            await expect(kvitteringPanel).toContainText('NAV behandler søknaden din')
            await expect(kvitteringPanel).toContainText('Når blir pengene utbetalt?')
        })
    })
})
