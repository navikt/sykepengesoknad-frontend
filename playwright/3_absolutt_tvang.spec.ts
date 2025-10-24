import { test, expect } from './fixtures'

test.describe('Tester at åpne sykmeldinger må sendes inn', () => {
    test.describe('Tester med en usendt sykmelding', () => {
        test('Laster søknader og viser advarsel om at det finnes sykmelding', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad?testperson=en-usendt-sykmelding')

            await page.locator(`a[href*="5d0bd29f-7803-4945-8426-49921284435e"]`).click()

            await expect(page).toHaveURL(/5d0bd29f-7803-4945-8426-49921284435e\/1/)

            await expect(
                page.getByText(
                    'Du har en sykmelding du må velge om du skal bruke, før du kan begynne på denne søknaden.',
                ),
            ).toBeVisible()

            await expect(page.getByText('Gå til sykmeldingen')).toBeVisible()
        })
    })

    test.describe('Tester med flere usendte sykmeldinger', () => {
        test('Laster søknader og viser advarsel om at det finnes sykmeldinger', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad?testperson=to-usendte-sykmeldinger')

            await page.locator(`a[href*="a7efa5f0-003c-41d5-ab33-5c9be9179721"]`).click()

            await expect(page).toHaveURL(/a7efa5f0-003c-41d5-ab33-5c9be9179721\/1/)

            await expect(
                page.getByText(
                    'Du har to sykmeldinger du må velge om du skal bruke, før du kan begynne på denne søknaden.',
                ),
            ).toBeVisible()

            const sykmeldingerKnapp = page.getByRole('button', { name: 'Gå til sykmeldingene' })
            await expect(sykmeldingerKnapp).toBeVisible()
            await expect(page.getByText('Gå til sykmeldingen', { exact: true })).toBeHidden()

            await sykmeldingerKnapp.click()
            await expect(page).toHaveURL(/\/sykmeldinger$/)
        })
    })
})
