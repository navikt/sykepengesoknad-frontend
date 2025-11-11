import { test, expect } from './utils/fixtures'

test.describe('Tester søknader tilhørende person over 70', () => {
    const testpersonQuery = '?testperson=over-70'
    const soknadId = 'df1371a4-2773-41c2-a895-49f56142496c'

    test('Person over 70', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/1${testpersonQuery}`)
        const alert = page.locator('.navds-alert', { hasText: 'Viktig informasjon' })
        await expect(alert).toBeVisible()
        await expect(alert).toContainText('Viktig informasjon')
        await expect(alert).toContainText('Når du har passert 70 år, har du ikke lenger rett til sykepenger.')
        await expect(alert).toContainText(
            'Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden. Hvis du likevel ønsker å søke, kan vi ikke hindre deg i dette.',
        )
    })
})
