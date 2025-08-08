import { test, expect } from '@playwright/test'

test.describe('Tester andre inntektskilder bulletpoints', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
    })

    test('Viser liste med flere hvis vi har data fra inntektskomponenten', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/7?testperson=arbeidstaker-gradert',
        )

        await expect(page.getByText('Arbeidsforhold vi har registrert på deg:')).toBeVisible()
        const list = page.locator('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]')
        await expect(list.locator('li')).toHaveCount(4)
        const expectedValues = ['Posten Norge AS, Bærum', 'Ruter', 'Blomsterbutikken', 'Bensinstasjonen']

        const items = await list.locator('li').all()
        for (let i = 0; i < items.length; i++) {
            await expect(items[i]).toContainText(expectedValues[i])
        }
    })

    test('Viser liste med en hvis vi har data fra inntektskomponenten, men ingen ekstra', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad/soknader/d9ac193d-9b67-4a51-80c2-fe4289214878/6')

        await expect(page.getByText('Arbeidsforhold vi har registrert på deg:')).toBeVisible()
        await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()
        const list = page.locator('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]')
        await expect(list.locator('li')).toHaveCount(1)
        const expectedValues = ['Posten Norge AS, Bærum']

        const items = await list.locator('li').all()
        for (let i = 0; i < items.length; i++) {
            await expect(items[i]).toContainText(expectedValues[i])
        }
    })

    test('Viser ikke liste når vi mangler data fra inntektskomponenten', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/214f6e73-8150-4261-8ce5-e2b41907fa58/10?testperson=integrasjon-soknader',
        )

        await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toHaveCount(0)

        await expect(page.getByText('Har du andre inntektskilder enn Posten Norge AS, Bærum?')).toBeVisible()
        await expect(page.locator('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]')).toHaveCount(0)
    })

    test('Viser data primært fra metadata på spørsmålet når vi har det', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/8?testperson=nytt-arbeidsforhold',
        )

        await expect(page.getByText('Arbeidsforhold vi har registrert på deg:')).toBeVisible()
        await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()
        const list = page.locator('[data-cy="inntektskilder--fra-inntektskomponenten-liste"]')
        await expect(list.locator('li')).toHaveCount(3)
        const expectedValues = ['Matbutikken AS', 'Smørebussen AS', 'Kaffebrenneriet']

        const items = await list.locator('li').all()
        for (let i = 0; i < items.length; i++) {
            await expect(items[i]).toContainText(expectedValues[i])
        }
    })
})
