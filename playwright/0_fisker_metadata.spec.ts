import { test } from '@playwright/test'

import { harSynligTekst } from './utils/utilities'
import { fiskerLottOgHyre } from '../src/data/mock/data/soknad/fisker-lott-og-hyre'

const soknadId = fiskerLottOgHyre.id

test.describe('Tester fisker metadata', () => {
    test('Viser metadata for fisker med lott og hyre', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/2?testperson=fisker`)

        await harSynligTekst(page, 'Sykmeldt som: fisker med lott og hyre')
        await harSynligTekst(page, 'Periode: 1. – 24. april 2020 (100%)')
    })
})
