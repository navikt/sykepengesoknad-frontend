import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'

import { test, expect } from './utils/fixtures'
import { klikkGaVidere, setPeriodeFraTil, svarJaHovedsporsmal, harSynligTekst } from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester at datovelger viser korrekt feilmelding, og at man ikke kan gå videre uten å velge datoer', () => {
    const soknad = arbeidstaker
    const testpersonQuery = ''

    test.beforeEach(async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/3${testpersonQuery}`)
    })

    test('Trigger feilmelding', async ({ page }) => {
        await svarJaHovedsporsmal(page)
        await harSynligTekst(page, 'Når tok du ut feriedager?')

        await setPeriodeFraTil(page, 16, 23)
        await page
            .getByRole('textbox', { name: /Fra og med/i })
            .first()
            .fill('')

        await klikkGaVidere(page, true)

        const periodeMedFeil = page.getByRole('group', { name: /Tidsperiode/ }).first()
        await expect(periodeMedFeil.getByText('Du må oppgi en fra og med dato i formatet dd.mm.åååå')).toBeVisible()
        await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/3`))

        await validerAxeUtilityWrapper(page, test.info())
    })

    test('Fyller inn korrekt dato, og går videre', async ({ page }) => {
        await svarJaHovedsporsmal(page)
        const periodeLocator = page.getByRole('group', { name: /Tidsperiode/ }).first()
        await periodeLocator
            .getByRole('button', { name: /Åpne datovelger/i })
            .first()
            .click()
        await periodeLocator.getByRole('grid').getByRole('button').filter({ hasText: /^16$/ }).click()
        await periodeLocator.getByRole('grid').getByRole('button').filter({ hasText: /^17$/ }).click()
        await klikkGaVidere(page)

        await expect(page.getByText('Du må oppgi en fra og med dato i formatet dd.mm.åååå')).toBeHidden()
        await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/4`))

        await validerAxeUtilityWrapper(page, test.info())
    })
})
