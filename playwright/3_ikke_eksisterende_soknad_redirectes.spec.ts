import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'

test.describe('Tester direktenavigering til søknad som ikke eksisterer', () => {
    test('Prøver å laste søknaden og blir redirectet til listevisning', async ({ page }) => {
        // Generate a random UUID for a non-existing søknad
        const nonExistentId = uuidv4()
        
        // Try to visit the non-existent søknad
        await page.goto(`/syk/sykepengesoknad/soknader/${nonExistentId}`)
        
        // Should be redirected to the list view
        await expect(page).toHaveURL('/syk/sykepengesoknad')
        
        // Verify we're on the list page
        await expect(page.locator('.navds-heading--large')).toBeVisible()
        await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
    })
})
