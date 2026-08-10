import { test } from '@playwright/test'

import { harSynligTekst } from './utils/utilities'

const soknadId = '528a8b46-949f-330d-aac8-1e6cbe08d024'

test.describe('Tester fisker metadata', () => {
    test('Viser metadata for fisker med lott og hyre', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/2?testperson=fisker`)

        await harSynligTekst(page, 'Sykmeldt som: fisker med lott og hyre')
        await harSynligTekst(page, 'Periode: 16. – 22. januar 2024 (100%)')
    })
})
