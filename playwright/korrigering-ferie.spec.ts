import { test, expect } from './fixtures'
import {
    checkViStolerPaDeg,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    setPeriodeFraTil,
    klikkGaVidere,
    harSynligTittel,
    neiOgVidere,
} from './utilities'

test.describe('Tester korrigering av ferie', () => {
    const soknadId = '5b769c04-e171-47c9-b79b-23ab8fce331e'
    const testpersonQuery = '?testperson=arbeidstaker-gradert'
    const baseUrl = `/syk/sykepengesoknad/soknader/${soknadId}${testpersonQuery}`

    test('Sender inn søknad med ja på ferie spørsmålet', async ({ page }) => {
        await test.step('Starter søknad og svarer nei på første spørsmål', async () => {
            await page.goto(baseUrl)
            await checkViStolerPaDeg(page)
            await harSynligTittel(page, 'Tilbake i fullt arbeid', 2)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Svarer nei på ferie, så ja og fyller periode', async () => {
            await harSynligTittel(page, 'Ferie', 2)
            await svarNeiHovedsporsmal(page)
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toContainText('Ferie')
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()
            await expect(page.locator('[data-cy="feriekorrigeringvarsel"]')).toBeHidden()
            await klikkGaVidere(page)
        })

        await test.step('Besvarer resten av søknaden med nei', async () => {
            await neiOgVidere(page, [
                'Permisjon',
                'Jobb underveis',
                'Arbeid utenfor Norge',
                'Andre inntektskilder',
                'Reise utenfor EU/EØS',
            ])
            await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Starter korrigering', async () => {
            await page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()
            await page.getByRole('button', { name: 'Ok' }).click()
        })

        await test.step('Endrer ferie fra NEI til JA', async () => {
            await checkViStolerPaDeg(page)
            await harSynligTittel(page, 'Tilbake i fullt arbeid', 2)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
            await harSynligTittel(page, 'Ferie', 2, true)
            await svarJaHovedsporsmal(page)
            await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()
            await expect(page.locator('[data-cy="feriekorrigeringvarsel"]')).toBeVisible()
        })
    })
})
