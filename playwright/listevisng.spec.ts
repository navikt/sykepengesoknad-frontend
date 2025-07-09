import { test, expect } from './fixtures'

test.describe('Tester visning av forside', () => {
    test('Laster startside', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepengesoknad/soknader/d9ac193d-9b67-4a51-80c2-fe4289214878/1')

        const header = page.locator('main').locator('h1').first()
        await expect(header).toBeVisible()

        await expect(header).toContainText('Søknad om sykepenger')
        await expect(page.locator('text=Før du søker')).toBeVisible()
    })
})
