import { test, expect } from '@playwright/test'

// Helper function to check main element height
async function mainSkalHaHoyde(page: any, expectedHeight: number) {
    const mainElement = page.locator('main')
    const box = await mainElement.boundingBox()
    expect(box?.height).toBe(expectedHeight)
}

test.describe('Tester cummulative-layout-shift', () => {
    test('Høyden endres ikke i happy case i listevisninga etter at dataene er lastet', async ({ page }) => {
        // Clear cookies and visit the page
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=cummulative-layout-shift')
        
        // Wait for h1 to be visible
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        
        // Check main height initially
        await mainSkalHaHoyde(page, 388)
        
        // Verify no skeleton elements are present
        await expect(page.locator('.navds-skeleton')).toHaveCount(0)

        // Wait for data to be fetched and rendered
        await expect(page.getByText('Nye søknader')).toBeVisible()
        await expect(page.locator('.navds-skeleton')).toHaveCount(0)

        // Verify main height hasn't changed
        await mainSkalHaHoyde(page, 388)
    })

    test('Høyden endres ikke i happy case i et vanlig spørsmål etter at dataene er lastet', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/3?testperson=cummulative-layout-shift'
        )
        
        // Check main height initially
        await mainSkalHaHoyde(page, 1148)
        await expect(page.locator('.navds-skeleton')).toHaveCount(0)

        // Wait for data to be fetched and rendered
        await expect(page.getByRole('heading', { level: 2, name: 'Ferie' })).toBeVisible()
        await expect(page.locator('.navds-skeleton')).toHaveCount(0)

        // Verify main height hasn't changed
        await mainSkalHaHoyde(page, 1148)
    })

    test('Høyden endres ikke i første spørsmålet etter at dataene er lastet', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/1?testperson=cummulative-layout-shift'
        )
        
        // Check main height initially
        await mainSkalHaHoyde(page, 1657)
        await expect(page.locator('.navds-skeleton')).toHaveCount(0)

        // Wait for data to be fetched and rendered
        await expect(page.getByText('Jeg bekrefter at jeg vil svare så riktig som jeg kan.')).toBeVisible()
        await expect(page.locator('.navds-skeleton')).toHaveCount(0)

        // Verify main height hasn't changed
        await mainSkalHaHoyde(page, 1657)
    })
})
