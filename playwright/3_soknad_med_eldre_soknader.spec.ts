import { test, expect } from '@playwright/test'

import { svarNeiHovedsporsmal, klikkGaVidere } from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Eldre søknader', () => {
    // ------- CASE 1: Søknad med EN eldre søknad -------
    test('Bruker må velge mellom to søknader (én eldre)', async ({ page }) => {
        await test.step('Gå til startsiden og klikk på riktig søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=en-eldre-usendt-soknad')
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('a[href*="e6e53c43-3b64-48be-b9d1-39d95198e528"]').click()
        })

        await test.step('Vis advarsel om eldre søknad og klikk videre', async () => {
            await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e528\/1/)
            await expect(
                page.getByText('Du har en eldre søknad du må velge om du skal bruke, før du kan begynne på denne.'),
            ).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå til eldste søknad').click()
        })

        await test.step('Brukeren havner på den eldste søknaden', async () => {
            await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e523\/1/)
        })
    })

    test('Bruker må gå gjennom tre søknader (to eldre)', async ({ page }) => {
        await test.step('Gå til startsiden og klikk på riktig søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=to-eldre-usendte-soknader')
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator('a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]').click()
        })

        await test.step('Vis advarsel om to eldre søknader og klikk videre', async () => {
            await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e521\/1/)
            await expect(
                page.getByText('Du har to eldre søknader du må velge om du skal bruke, før du kan begynne på denne.'),
            ).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå til eldste søknad').click()
        })

        await test.step('Første eldste søknad: fyll ut', async () => {
            await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e529\/1/)
            await validerAxeUtilityWrapper(page, test.info())
            await fyllUtSoknad(page)
        })

        await test.step('Vi har lenke til neste søknad', async () => {
            await expect(page.getByText('Du har to søknader du må velge om du skal bruke.')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå til neste søknad').click()
        })

        await test.step('Andre eldste søknad: fyll ut', async () => {
            await fyllUtSoknad(page)
        })

        await test.step('Vi har lenke til siste søknad', async () => {
            await expect(page.getByText('Du har en søknad du må velge om du skal bruke.')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå til søknaden').click()
        })

        await test.step('Siste søknad: fyll ut og forvent Ferdig-knapp', async () => {
            await fyllUtSoknad(page)
            await validerAxeUtilityWrapper(page, test.info())
            await expect(page.getByRole('button', { name: 'Ferdig' })).toBeVisible()
        })
    })
})

// Felles hjelpefunksjon – async!
async function fyllUtSoknad(page) {
    await page.getByText('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').click()
    await page.getByText('Start søknad').click()
    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)
    await page.getByText('Send søknaden').click()
}
