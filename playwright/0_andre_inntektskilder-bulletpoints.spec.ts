import { test, expect } from '@playwright/test'

import { validerAxeUtilityWrapper } from './uuvalidering'
import { harSynligTekst } from './utils/utilities'

test.describe('Tester andre inntektskilder bulletpoints', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
    })

    test('Viser liste med flere hvis vi har ghost inntekter', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/7?testperson=arbeidstaker-gradert',
        )

        await harSynligTekst(page, 'Andre arbeidsforhold vi har registrert på deg:')
        const list = page.getByRole('list').filter({ hasText: 'Blomsterbutikken' })
        await expect(list.locator('li')).toHaveCount(3)
        const expectedValues = ['Ruter', 'Blomsterbutikken', 'Bensinstasjonen']
        const items = await list.locator('li').all()
        for (let i = 0; i < items.length; i++) {
            await expect(items[i]).toContainText(expectedValues[i])
        }
        await validerAxeUtilityWrapper(page, test.info())
    })

    test('Viser ikke liste dersom vi kun har arbeidsgiver fra søknad', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad/soknader/d9ac193d-9b67-4a51-80c2-fe4289214878/6')

        await harSynligTekst(page, 'Har du hatt annen inntekt eller oppdrag?')
        const list = page.getByRole('list').filter({ hasText: 'Blomsterbutikken' })
        await expect(list).toHaveCount(0)
        await validerAxeUtilityWrapper(page, test.info())
    })

    test('Viser ikke liste når vi mangler ghost inntekter', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/214f6e73-8150-4261-8ce5-e2b41907fa58/10?testperson=integrasjon-soknader',
        )

        await harSynligTekst(page, 'Har du andre inntektskilder enn Posten Norge AS, Bærum?')
        const list = page.getByRole('list').filter({ hasText: 'Blomsterbutikken' })
        await expect(list).toHaveCount(0)
        await validerAxeUtilityWrapper(page, test.info())
    })
})
