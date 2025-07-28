import { test, expect } from './fixtures'

test.describe('Tester at åpne sykmeldinger må sendes inn', () => {
    test.describe('Tester med en usendt sykmelding', () => {
        test('Laster søknader og viser advarsel om at det finnes sykmelding', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad?testperson=en-usendt-sykmelding')

            // Klikk på lenken som inneholder den spesifikke ID-en
            await page.locator(`a[href*="5d0bd29f-7803-4945-8426-49921284435e"]`).click()

            // Verifiser at URL inneholder forventet ID og steg
            await expect(page).toHaveURL(/5d0bd29f-7803-4945-8426-49921284435e\/1/)

            // Verifiser at advarselsteksten vises
            await expect(
                page.getByText(
                    'Du har en sykmelding du må velge om du skal bruke, før du kan begynne på denne søknaden.',
                ),
            ).toBeVisible()

            // Verifiser at lenken til sykmeldingen vises
            await expect(page.getByText('Gå til sykmeldingen')).toBeVisible()
        })
    })

    test.describe('Tester med flere usendte sykmeldinger', () => {
        test('Laster søknader og viser advarsel om at det finnes sykmeldinger', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad?testperson=to-usendte-sykmeldinger')

            // Klikk på lenken som inneholder den spesifikke ID-en
            await page.locator(`a[href*="a7efa5f0-003c-41d5-ab33-5c9be9179721"]`).click()

            // Verifiser at URL inneholder forventet ID og steg
            await expect(page).toHaveURL(/a7efa5f0-003c-41d5-ab33-5c9be9179721\/1/)

            // Verifiser at advarselsteksten for flere sykmeldinger vises
            await expect(
                page.getByText(
                    'Du har to sykmeldinger du må velge om du skal bruke, før du kan begynne på denne søknaden.',
                ),
            ).toBeVisible()

            // Verifiser at lenken til sykmeldingen vises
            await expect(page.getByText('Gå til sykmeldingen')).toBeVisible()
        })
    })
})
