import { test, expect } from '@playwright/test'

import { utgattSoknad } from '../src/data/mock/data/soknad/arbeidstaker-utgatt'

test.describe('Tester utgått søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        await expect(page.locator('.navds-heading--large')).toBeVisible()
        await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
    })

    test('Utgått søknad har forventa tekst', async ({ page }) => {
        await expect(page.locator(`[data-cy="button-listevisning-${utgattSoknad.id}"]`)).toContainText(
            '23. mai – 7. juni 2020',
        )
        await expect(page.locator(`[data-cy="button-listevisning-${utgattSoknad.id}"]`)).toContainText('Utgått')
    })

    test('Ved klikk så åpnes popup', async ({ page }) => {
        await page.locator(`[data-cy="button-listevisning-${utgattSoknad.id}"]`).click()
        await expect(page.getByRole('dialog', { name: 'Søknaden er utgått' })).toContainText('Søknaden er utgått')

        await expect(page.getByRole('heading', { name: 'Søknaden er utgått' })).toBeVisible()

        await expect(
            page.getByText('Du får ikke åpnet denne søknaden fordi den ikke ble sendt innen fristen.'),
        ).toBeVisible()
    })
})
