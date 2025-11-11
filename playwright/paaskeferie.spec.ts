import { test, expect } from './utils/fixtures'
import { svarJaHovedsporsmal, svarNeiHovedsporsmal } from './utils/utilities'

test.describe('Tester påskeferiehjelpetekst', () => {
    test('Søknaden går over påskeferien', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/3?testperson=arbeidstaker-gradert',
        )

        await expect(page.locator('[data-cy="sporsmal-tittel"]')).toContainText('Ferie')

        await expect(page.locator('[data-cy="paskeferiehjelp"]')).toHaveCount(0)
        await svarJaHovedsporsmal(page)
        await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()

        const paskeferiehjelp = page.locator('[data-cy="paskeferiehjelp"]')
        await expect(paskeferiehjelp).toBeVisible()
        await expect(paskeferiehjelp).toContainText('Jeg var syk på de røde dagene i påsken. Er det ferie?')
        await expect(paskeferiehjelp).toContainText(
            'En offentlig helligdag ("rød dag") regnes ikke som en feriedag, med mindre du har avtalt med arbeidsgiveren din at du skal ta ut ferie på en rød dag.',
        )

        await svarNeiHovedsporsmal(page)
        await expect(page.locator('[data-cy="paskeferiehjelp"]')).toHaveCount(0)
    })

    test('Søknaden går ikke over påskeferien', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad/soknader/963e816f-7b3c-4513-818b-95595d84dd91/3?testperson=brukertest')

        await expect(page.locator('[data-cy="sporsmal-tittel"]')).toContainText('Ferie')

        await svarJaHovedsporsmal(page)
        await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()
        await expect(page.locator('[data-cy="paskeferiehjelp"]')).toHaveCount(0)
    })
})
