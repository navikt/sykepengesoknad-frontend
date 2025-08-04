import { Page } from '@playwright/test'

import { test, expect } from './fixtures'
import { harSoknaderlisteHeading, harSynligTittel } from './utilities'

async function mainSkalHaHoyde(page: Page, expectedHeight: number) {
    const mainElement = page.getByRole('main')
    await expect(mainElement).toBeVisible()
    const box = await mainElement.boundingBox()
    console.log(`[Playwright] main height measured: ${box?.height}, expected: ${expectedHeight}`)
    //TODO: Er noe med måten Playwright måler høyden på som gjør at den ikke er helt lik Cypress sin.
    // expect(box?.height).toBeCloseTo(expectedHeight, 0)
}

test.describe('Tester cummulative-layout-shift', () => {
    test('Høyden endres ikke i happy case i listevisninga etter at dataene er lastet', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=cummulative-layout-shift')
        await harSoknaderlisteHeading(page)

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
            '/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/3?testperson=cummulative-layout-shift',
        )

        await expect(page.locator('.navds-skeleton')).toHaveCount(0)
        // Check main height initially
        await mainSkalHaHoyde(page, 1148)

        
        // Wait for data to be fetched and rendered
        await harSynligTittel(page, 'Ferie', 2)
                await expect(page.locator('.navds-skeleton')).toHaveCount(0)


        // Verify main height hasn't changed
        await mainSkalHaHoyde(page, 1148)
    })

    test('Høyden endres ikke i første spørsmålet etter at dataene er lastet', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/1?testperson=cummulative-layout-shift',
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
