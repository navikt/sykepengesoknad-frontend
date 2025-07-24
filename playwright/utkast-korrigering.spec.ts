import { arbeidstakerTilKorrigering } from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './fixtures'
import { harSoknaderlisteHeading, trykkPaSoknadMedId } from './utilities'

test.describe('Tester utkast til korrigerte søknader', () => {
    const tilKorrigering = arbeidstakerTilKorrigering
    const testpersonQuery = '?testperson=integrasjon-soknader'

    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad' + testpersonQuery)
        await harSoknaderlisteHeading(page)
    })

    test('En søknad til korrigeringer er markert som til korrigering', async ({ page }) => {
        const link = page.getByRole('link', { name: /Utkast til endring/i })
        await expect(link).toHaveAttribute('href', expect.stringContaining(tilKorrigering.id))
        await expect(link).toContainText('Utkast til endring')
    })

    test('Korrigert første spørsmål er ubesvart', async ({ page }) => {
        await trykkPaSoknadMedId(page, tilKorrigering.id)
        await expect(page).toHaveURL(new RegExp(`${tilKorrigering.id}/1`))
        await expect(page.locator('.navds-checkbox__input')).not.toBeChecked()
    })
})
