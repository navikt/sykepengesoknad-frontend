import { test, expect } from '@playwright/test'

import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'
import { arbeidstakerGradert } from '../src/data/mock/data/soknad/arbeidstaker-gradert'
import { arbeidstakerMangePerioder } from '../src/data/mock/data/soknad/arbeidstaker-mange-perioder'

test.describe('SoknadMetadata', () => {
    test('viser én periode inline med strong label', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker`)
        await page.waitForLoadState('load')

        await page.locator(`a[href*="${arbeidstaker.id}"]`).click()
        await page.waitForLoadState('load')

        await expect(page.getByText('Periode:', { exact: true })).toBeVisible()
        await expect(page.getByRole('list', { name: 'Sykmeldingsperioder' })).toHaveCount(0)
    })

    test('viser 2 perioder som bullet-liste med strong label', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-gradert`)
        await page.waitForLoadState('load')

        await page.locator(`a[href*="${arbeidstakerGradert.id}"]`).click()
        await page.waitForLoadState('load')

        await expect(page.getByText('Perioder:', { exact: true })).toBeVisible()

        const liste = page.getByRole('list', { name: 'Sykmeldingsperioder' })
        await expect(liste.getByRole('listitem')).toHaveCount(2)
        await expect(liste.getByRole('listitem').first()).toContainText('april 2020')
        await expect(liste.getByRole('listitem').first()).toContainText('50%')
    })

    test('viser 4+ perioder i ReadMore dropdown', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-mange-perioder`)
        await page.waitForLoadState('load')

        await page.locator(`a[href*="${arbeidstakerMangePerioder.id}"]`).click()
        await page.waitForLoadState('load')

        await expect(page.getByText('Perioder:', { exact: true })).toBeVisible()

        const readMoreKnapp = page.getByRole('button', { name: 'Vis alle 4 perioder' })
        await expect(readMoreKnapp).toBeVisible()

        const liste = page.getByRole('list', { name: 'Sykmeldingsperioder' })
        await expect(liste).toBeHidden()

        await readMoreKnapp.click()

        await expect(liste).toBeVisible()
        await expect(liste.getByRole('listitem')).toHaveCount(4)
    })
})
