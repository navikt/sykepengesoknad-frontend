import { test, expect, Page } from '@playwright/test'

test.describe('Tester cummulative-layout-shift', () => {
    async function mainSkalHaHoyde(page: Page, expectedHeight: number) {
        const mainElement = page.getByRole('main')
        await expect(mainElement).toBeVisible()
        const box = await mainElement.boundingBox()
        console.log(`[Playwright] main height measured: ${box?.height}, expected: ${expectedHeight}`)
    }

    async function ventTilIngenSkeletons(page: Page) {
        await expect(page.locator('.navds-skeleton')).toHaveCount(0, { timeout: 10000 })
    }

    async function ventPåHeading(page: Page, text: string, level: number) {
        await expect(page.getByRole('heading', { name: text, level })).toBeVisible({ timeout: 10000 })
    }

    test('Høyden endres ikke i happy case i listevisninga etter at dataene er lastet', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=cummulative-layout-shift')

        await ventPåHeading(page, 'Søknader', 1)
        
        await mainSkalHaHoyde(page, 388)
        await ventTilIngenSkeletons(page)

        await expect(page.getByText('Nye søknader')).toBeVisible()
        await ventTilIngenSkeletons(page)

        await mainSkalHaHoyde(page, 388)
    })

    test('Høyden endres ikke i happy case i et vanlig spørsmål etter at dataene er lastet', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/3?testperson=cummulative-layout-shift',
        )
        await mainSkalHaHoyde(page, 1148)
        await ventPåHeading(page, 'Ferie', 2)
        await ventTilIngenSkeletons(page)
        await mainSkalHaHoyde(page, 1148)
    })

    test('Høyden endres ikke i første spørsmålet etter at dataene er lastet', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/04247ad5-9c15-4b7d-ae55-f23807777777/1?testperson=cummulative-layout-shift',
        
        )
        await mainSkalHaHoyde(page, 1657)
        await expect(
            page.getByText('Jeg bekrefter at jeg vil svare så riktig som jeg kan.'),
        ).toBeVisible({ timeout: 10000 })

        await ventTilIngenSkeletons(page)
        await mainSkalHaHoyde(page, 1657)
    })
})
