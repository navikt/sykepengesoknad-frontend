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

        const perioder = page.locator('[data-cy="soknad-perioder"]')
        await expect(perioder).toBeVisible()
        await expect(perioder.locator('strong', { hasText: 'Periode:' })).toBeVisible()
        await expect(perioder.locator('ul')).toHaveCount(0)
    })

    test('viser 2 perioder som bullet-liste med strong label', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-gradert`)
        await page.waitForLoadState('load')

        await page.locator(`a[href*="${arbeidstakerGradert.id}"]`).click()
        await page.waitForLoadState('load')

        const perioder = page.locator('[data-cy="soknad-perioder"]')
        await expect(perioder.locator('strong', { hasText: 'Perioder:' })).toBeVisible()

        const listeItems = perioder.locator('li')
        await expect(listeItems).toHaveCount(2)
        await expect(listeItems.first()).toContainText('april 2020')
        await expect(listeItems.first()).toContainText('50%')
    })

    test('viser 4+ perioder i ReadMore dropdown', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-mange-perioder`)
        await page.waitForLoadState('load')

        await page.locator(`a[href*="${arbeidstakerMangePerioder.id}"]`).click()
        await page.waitForLoadState('load')

        const perioder = page.locator('[data-cy="soknad-perioder"]')
        await expect(perioder.locator('strong', { hasText: 'Perioder:' })).toBeVisible()

        const readMoreKnapp = perioder.getByRole('button', { name: 'Vis alle 4 perioder' })
        await expect(readMoreKnapp).toBeVisible()
        await expect(perioder.locator('ul')).not.toBeVisible()

        await readMoreKnapp.click()

        await expect(perioder.locator('ul')).toBeVisible()
        await expect(perioder.locator('li')).toHaveCount(4)
    })
})
