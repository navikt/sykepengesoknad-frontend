import { test, expect } from '@playwright/test'

import {
    checkViStolerPaDeg,
    harFeilISkjemaet,
    klikkGaVidere,
    neiOgVidere,
    sporsmalOgSvar,
    svarJaHovedsporsmal,
} from './utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester yrkesskadesspørsmål', () => {
    test('Full flow for yrkesskadesspørsmål', async ({ page }) => {
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=yrkesskade-v2')

        await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
        await page.getByRole('link', { name: /søknad om sykepenger/i }).click()

        await checkViStolerPaDeg(page)

        await validerAxeUtilityWrapper(page, test.info())

        await neiOgVidere(page, [
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Jobb underveis i sykefraværet',
            'Arbeid utenfor Norge',
        ])

        await neiOgVidere(page, ['Andre inntektskilder', 'Reise utenfor EU/EØS'])

        const main = page.locator('main')
        await expect(main.getByRole('heading', { name: 'Yrkesskade', level: 2 })).toBeVisible()

        const registrerteYrkesskaderText = page.getByText('Registrerte yrkesskader:')
        await expect(registrerteYrkesskaderText).toBeVisible()

        const listLocator = registrerteYrkesskaderText.locator('xpath=following-sibling::ul').first()
        await expect(listLocator).toBeVisible()

        const listItems = listLocator.locator('li')
        await expect(listItems).toHaveCount(2)

        await validerAxeUtilityWrapper(page, test.info())

        const expectedTexts = [
            'Skadedato 1. januar 2020 (Vedtaksdato 5. april 2021)',
            'Skadedato 2. april 1997 (Vedtaksdato 3. desember 1999)',
        ]

        for (const [i, text] of expectedTexts.entries()) {
            await expect(listItems.nth(i)).toContainText(text)
            await expect(listItems.nth(i)).toBeVisible()
        }

        const helpButton = main.getByRole('button', { name: 'Spørsmålet forklart' })
        await helpButton.click()

        const helpContent = helpButton.locator('xpath=following-sibling::*').first()
        await expect(
            helpContent.getByText(
                'Svar ja, hvis det nylig er sendt inn en skademelding som påvirker dette sykefraværet.',
            ),
        ).toBeVisible()

        await svarJaHovedsporsmal(page)

        await validerAxeUtilityWrapper(page, test.info())
        await klikkGaVidere(page, true)

        await harFeilISkjemaet(page, 'Du må velge minst en skadedato')
        const errorLink = page.getByRole('link', { name: /Du må velge minst en skadedato/i })
        await expect(errorLink).toBeVisible()
        await errorLink.click()

        await page.keyboard.press('Space')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Space')
        await page.keyboard.press('Enter')

        const oppsummeringContainer = page.locator('[data-cy="oppsummering-fra-søknaden"]')

        await sporsmalOgSvar(
            oppsummeringContainer,
            'Hvilken skadedato skyldes dette sykefraværet? Du kan velge flere.',
            'Skadedato 2. april 1997 (Vedtaksdato 3. desember 1999)',
        )
        await sporsmalOgSvar(
            oppsummeringContainer,
            'Hvilken skadedato skyldes dette sykefraværet? Du kan velge flere.',
            'Skadedato 1. januar 2020 (Vedtaksdato 5. april 2021)',
        )
    })
})
