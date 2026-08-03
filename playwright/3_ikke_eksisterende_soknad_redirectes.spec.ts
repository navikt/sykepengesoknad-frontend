import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'

test.describe('Tester direktenavigering til søknad som ikke eksisterer', () => {
    test('Prøver å laste søknaden og blir redirectet til listevisning', async ({ page }) => {
        const nonExistentId = uuidv4()

        await page.goto(`/syk/sykepengesoknad/soknader/${nonExistentId}`)

        // bør redirecte til listevisning
        await expect(page).toHaveURL('/syk/sykepengesoknad')

        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Søknader')
    })
})
