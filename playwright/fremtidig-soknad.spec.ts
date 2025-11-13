import { test, expect } from './utils/fixtures'
import { harSoknaderlisteHeading, harSynligTittel } from './utils/utilities'

test.describe('Tester fremtidig søknad', () => {
    const testpersonQuery = '?testperson=fremtidig'

    test('Ved klikk så åpnes popup', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad' + testpersonQuery)
        await harSoknaderlisteHeading(page)

        const button = page.getByRole('button', { name: '23. mai – 7. juni 3020 Søknad' })
        await expect(button).toContainText('23. mai – 7. juni 3020')
        await expect(button).toContainText('Aktiveres 8. juni 3020')

        await button.click()
        await harSynligTittel(page, 'Du er litt tidlig ute', 1)
        await expect(page.getByText('Hvorfor kan jeg ikke søke nå?')).toBeVisible()
    })
})
