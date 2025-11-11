import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'

import { test, expect } from './utils/fixtures'
import { klikkGaVidere, setPeriodeFraTil, svarJaHovedsporsmal } from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester at datovelger viser korrekt feilmelding, og at man ikke kan gå videre uten å velge datoer', () => {
    const soknad = arbeidstaker
    const testpersonQuery = ''

    test.beforeEach(async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/3${testpersonQuery}`)
    })

    test('Trigger feilmelding', async ({ page }) => {
        await svarJaHovedsporsmal(page)
        await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()

        await setPeriodeFraTil(page, 16, 23)
        await page.locator('.navds-date__field-input').first().fill('')

        await klikkGaVidere(page, true)

        await expect(page.locator('.navds-error-message')).toContainText(
            'Du må oppgi en fra og med dato i formatet dd.mm.åååå',
        )
        await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/3`))

        await validerAxeUtilityWrapper(page, test.info())
    })

    test('Fyller inn korrekt dato, og går videre', async ({ page }) => {
        await svarJaHovedsporsmal(page)
        await page.locator('[data-cy="periode"] .navds-date__field-button').first().click()
        await page.locator('[data-cy="periode"] .rdp-cell').getByText('16').click()
        await page.locator('[data-cy="periode"] .rdp-cell').getByText('17').click()
        await klikkGaVidere(page)

        await expect(page.locator('.navds-error-message')).toBeHidden()
        await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/4`))

        await validerAxeUtilityWrapper(page, test.info())
    })
})
