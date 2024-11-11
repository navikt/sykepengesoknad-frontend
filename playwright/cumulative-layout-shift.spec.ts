import { expect } from '@playwright/test'

import { test } from './fixtures'

test.describe.skip('Tester cumulative-layout-shift', () => {
    test('Height does not change in happy case after data is loaded', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykefravaer?testperson=cummulative-layout-shift')
        await page.waitForSelector('h1', { timeout: 10000 })
        await expect(page.locator('h1').first()).toBeVisible()
        const skeletons = page.locator('.navds-skeleton')
        await expect(skeletons).toHaveCount(6)

        // Sjekk dokumentets høyde
        const expectedHeight = 1325
        const initialHeight = await page.evaluate(() => document.documentElement.scrollHeight)
        expect(initialHeight).toBe(expectedHeight)

        // Venter på at alle dataene er fetchet og rendret
        await expect(page.locator('text=Du har en ny sykmelding')).toBeVisible()
        await expect(skeletons).toHaveCount(0)

        const finalHeight = await page.evaluate(() => document.documentElement.scrollHeight)
        expect(finalHeight).toBe(expectedHeight)
    })
})
