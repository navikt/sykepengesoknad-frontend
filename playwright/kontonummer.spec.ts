import { test, expect } from './utils/fixtures'
import { checkViStolerPaDeg, svarNeiHovedsporsmal, klikkGaVidere, harSynligTittel } from './utils/utilities'

test.describe('Tester kontonummer i kvittering', () => {
    test('Har kontonummer', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=har-kontonummer')
        await page.getByRole('link').first().click()
        await checkViStolerPaDeg(page)
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await expect(page).toHaveURL(/\/kvittering\//)
        await harSynligTittel(page, 'Kontonummer for utbetaling', 2)
        const kontonummer = page.locator('[data-cy="kontonummer"]')
        await expect(kontonummer).toContainText('1234 00 12345')
        await expect(kontonummer).toContainText(
            'Dersom du vil benytte et annet kontonummer for utbetaling fra NAV, kan du endre det på Min side',
        )
    })

    test('Har ikke kontonummer', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=har-ikke-kontonummer')
        await page.getByRole('link').first().click()
        await checkViStolerPaDeg(page)
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await expect(page).toHaveURL(/\/kvittering\//)
        await harSynligTittel(page, 'Kontonummer for utbetaling', 2)
        const kontonummer = page.locator('[data-cy="kontonummer"]')
        await expect(kontonummer).toContainText(
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side',
        )
    })
})
