import { test, expect } from '@playwright/test'

import { validerAxeUtilityWrapper } from './uuvalidering'
import { harSynligTekst, svarJaHovedsporsmal } from './utils/utilities'

test.describe('Tester andre inntektskilder bulletpoints', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
    })

    test('Viser liste med flere hvis vi har data fra inntektskomponenten', async ({ page }) => {
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

    //TODO: Fikse denne testen, den feiler fordi vi ikke har metadata på spørsmålet i testdataen
    test('Viser ikke liste når vi mangler data fra inntektskomponenten', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/214f6e73-8150-4261-8ce5-e2b41907fa58/10?testperson=integrasjon-soknader',
        )

        await harSynligTekst(page, 'Har du hatt annen inntekt eller oppdrag?')
        const list = page.getByRole('list').filter({ hasText: 'Blomsterbutikken' })
        await expect(list).toHaveCount(0)
        await validerAxeUtilityWrapper(page, test.info())
    })

    test.skip('Viser data primært fra metadata på spørsmålet når vi har det', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/8?testperson=nytt-arbeidsforhold',
        )

        await harSynligTekst(page, 'Andre arbeidsforhold vi har registrert på deg:')
        await harSynligTekst(
            page,
            'Har du jobbet noe mer i disse enn du vanligvis gjør, mens du var sykemeldt i perioden 1. April - 24. Mai 2020?',
        )
        const list = page.getByRole('list').filter({ hasText: 'Matbutikken AS' })
        await expect(list.locator('li')).toHaveCount(3)
        const expectedValues = ['Matbutikken AS', 'Smørebussen AS', 'Kaffebrenneriet']

        const items = await list.locator('li').all()
        for (let i = 0; i < items.length; i++) {
            await expect(items[i]).toContainText(expectedValues[i])
        }
        //TODO: Fikse denne
        await svarJaHovedsporsmal(page)

        await harSynligTekst(page, 'Har du hatt annen inntekt eller oppdrag?')
        await validerAxeUtilityWrapper(page, test.info())
    })
})
