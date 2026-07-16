import { test, expect } from '@playwright/test'

const soknadId = '528a8b46-949f-330d-aac8-1e6cbe08d024'

test.describe('Tester fisker metadata', () => {
    test('Viser metadata for fisker med lott og hyre', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/1?testperson=fisker`)

        await expect(page.getByText('Sykmeldt som: fisker med lott og hyre')).toBeVisible()
        await expect(page.getByText('Periode: 16. – 22. januar 2024 (100%)')).toBeVisible()
    })
})
