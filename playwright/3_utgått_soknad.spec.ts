import { test, expect } from '@playwright/test'

import { utgattSoknad } from '../src/data/mock/data/soknad/arbeidstaker-utgatt'

import { harSynligTittel } from './utils/utilities'

test.describe('Tester utgått søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        await harSynligTittel(page, 'Søknader', 1)
        await expect(await harSynligTittel(page, 'Søknader', 1)).toHaveText('Søknader')
    })

    test('Utgått søknad har forventa tekst', async ({ page }) => {
        await expect(page.locator(`[data-testid="button-listevisning-${utgattSoknad.id}"]`)).toContainText(
            '23. mai – 7. juni 2020',
        )
        await expect(page.locator(`[data-testid="button-listevisning-${utgattSoknad.id}"]`)).toContainText('Utgått')
    })

    test('Ved klikk så åpnes popup', async ({ page }) => {
        await page.locator(`[data-testid="button-listevisning-${utgattSoknad.id}"]`).click()
        await expect(page.getByRole('dialog', { name: 'Søknaden er utgått' })).toContainText('Søknaden er utgått')

        await harSynligTittel(page, 'Søknaden er utgått', 1)

        await expect(
            page.getByText('Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.'),
        ).toBeVisible()
    })
})
