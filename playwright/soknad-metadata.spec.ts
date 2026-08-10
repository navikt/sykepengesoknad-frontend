import { test, expect } from '@playwright/test'

import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'
import { arbeidstakerToPerioder } from '../src/data/mock/data/soknad/arbeidstaker-to-perioder'
import { arbeidstakerTrePerioder } from '../src/data/mock/data/soknad/arbeidstaker-tre-perioder'
import { arbeidstakerMangePerioder } from '../src/data/mock/data/soknad/arbeidstaker-mange-perioder'
import { apneReadmore, checkViStolerPaDeg } from './utils/utilities'

test.describe('SoknadMetadata', () => {
    test('viser én periode inline med strong label', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker`)

        await page.locator(`a[href*="${arbeidstaker.id}"]`).click()
        await checkViStolerPaDeg(page)

        await expect(page.getByText('Periode:', { exact: true })).toBeVisible()
        await expect(page.getByRole('list', { name: 'Sykmeldingsperioder' })).toHaveCount(0)
    })

    test('viser 2 perioder som bullet-liste i samme måned', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-periode-varianter`)

        await page.locator(`a[href*="${arbeidstakerToPerioder.id}"]`).click()
        await checkViStolerPaDeg(page)

        await expect(page.getByText('Perioder:', { exact: true })).toBeVisible()

        const liste = page.getByRole('list', { name: 'Sykmeldingsperioder' })
        await expect(liste.getByRole('listitem')).toHaveCount(2)
        await expect(liste.getByRole('listitem').first()).toContainText('april 2020')
        await expect(liste.getByRole('listitem').last()).toContainText('april 2020')
    })

    test('viser 3 perioder som bullet-liste i samme måned', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-periode-varianter`)

        await page.locator(`a[href*="${arbeidstakerTrePerioder.id}"]`).click()
        await checkViStolerPaDeg(page)

        await expect(page.getByText('Perioder:', { exact: true })).toBeVisible()

        const liste = page.getByRole('list', { name: 'Sykmeldingsperioder' })
        await expect(liste.getByRole('listitem')).toHaveCount(3)
        await expect(liste.getByRole('listitem').first()).toContainText('april 2020')
        await expect(liste.getByRole('listitem').last()).toContainText('april 2020')
    })

    test('viser 4+ perioder i ReadMore dropdown', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-periode-varianter`)

        await page.locator(`a[href*="${arbeidstakerMangePerioder.id}"]`).click()
        await checkViStolerPaDeg(page)

        await apneReadmore(page, 'Perioder', [
            '1. – 7. april 2020 (100%)',
            '8. – 14. april 2020 (60%)',
            '15. – 21. april 2020 (80%)',
            '22. – 30. april 2020 (100%)',
        ])
    })
})
