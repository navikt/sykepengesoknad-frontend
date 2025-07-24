import { test, expect } from '@playwright/test'

import {
    checkViStolerPaDeg,
    harFeilISkjemaet,
    klikkGaVidere,
    neiOgVidere,
    sporsmalOgSvar,
    svarJaHovedsporsmal,
    harSynligTittel,
    harSynligTekst,
} from './utilities'

test.describe('Tester yrkesskadesspørsmål', () => {
    test('Full flow for yrkesskadesspørsmål', async ({ page }) => {
        // Setup: Clear cookies and navigate to the test page
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=yrkesskade-v2')

        // Laster listevisng
        await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
        await page.getByRole('link', { name: /søknad om sykepenger/i }).click()

        // Svarer på spørsmål før yrkesskade
        await checkViStolerPaDeg(page)

        await neiOgVidere(page, [
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Jobb underveis i sykefraværet',
            'Arbeid utenfor Norge',
        ])

        await neiOgVidere(page, ['Andre inntektskilder', 'Reise til utlandet'])

        // Kommer til spørsmål om yrkesskade
        const main = page.locator('main')
        await expect(main.getByRole('heading', { name: 'Yrkesskade', level: 2 })).toBeVisible()

        const registrerteYrkesskaderText = page.getByText('Registrerte yrkesskader:')
        await expect(registrerteYrkesskaderText).toBeVisible()

        // Check the list exists and has 2 items
        const listLocator = registrerteYrkesskaderText.locator('xpath=following-sibling::ul').first()
        await expect(listLocator).toBeVisible()

        const listItems = listLocator.locator('li')
        await expect(listItems).toHaveCount(2)

        const expectedTexts = [
            'Skadedato 1. januar 2020 (Vedtaksdato 5. april 2021)',
            'Skadedato 2. april 1997 (Vedtaksdato 3. desember 1999)',
        ]

        // Check each list item contains the expected text
        for (let i = 0; i < expectedTexts.length; i++) {
            await expect(listItems.nth(i)).toContainText(expectedTexts[i])
            await expect(listItems.nth(i)).toBeVisible()
        }

        // Har forventa hjelpetekst
        const helpButton = main.getByRole('button', { name: 'Spørsmålet forklart' })
        await helpButton.click()

        const helpContent = helpButton.locator('xpath=following-sibling::*').first()
        await expect(
            helpContent.getByText(
                'Svar ja, hvis det nylig er sendt inn en skademelding som påvirker dette sykefraværet.',
            ),
        ).toBeVisible()

        // Svarer ja og går videre
        await svarJaHovedsporsmal(page)
        await klikkGaVidere(page, true) // forventFeil = true

        // Men får feilmelding
        await harFeilISkjemaet(page, 'Du må velge minst en skadedato')
        const errorLink = page.getByRole('link', { name: /Du må velge minst en skadedato/i })
        await expect(errorLink).toBeVisible()
        await errorLink.click()

        // Vi velger to med keyboard og går videre med enter
        await page.keyboard.press('Space')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Space')
        await page.keyboard.press('Enter')

        // Vi ser de valgte skadedatoene i oppsummeringa
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
