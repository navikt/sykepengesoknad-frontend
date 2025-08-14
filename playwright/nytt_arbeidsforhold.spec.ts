import { test, expect } from '@playwright/test'

import {
    harSynligTittel,
    klikkGaVidere,
    setPeriodeFraTil,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
} from './utilities'

test.describe('Tester nytt arbeidsforhold', () => {
    test('Åpner nytt arbeidsforhold sporsmål', async ({ page }) => {
        await page.context().clearCookies()
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/7?testperson=nytt-arbeidsforhold',
        )

        await harSynligTittel(page, 'Nytt arbeidsforhold', 2)
        // todo make this test work
        // await expect(page.getByText('Kaffebrenneriet')).toHaveCSS('background-color', 'rgb(236, 238, 240)')
    })

    test('Svarer ja på hovedspørsmål', async ({ page }) => {
        await page.context().clearCookies()
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/7?testperson=nytt-arbeidsforhold',
        )

        await svarJaHovedsporsmal(page)
        await expect(page.getByText('Hvor mye har du tjent i perioden 8. – 21. september 2022?')).toBeVisible()
    })

    test('Får spesifikk hjelpetekst ved ja på ferie', async ({ page }) => {
        await page.context().clearCookies()
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold',
        )

        await harSynligTittel(page, 'Ferie', 2)

        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 17, 18)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarJaHovedsporsmal(page)
        await expect(
            page.getByText('Ikke ta med det du eventuelt tjente de dagene du hadde ferie fra MATBUTIKKEN AS.'),
        ).toBeVisible()
    })

    test('Får spesifikk hjelpetekst ved ja på permisjon', async ({ page }) => {
        await page.context().clearCookies()
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold',
        )

        await harSynligTittel(page, 'Ferie', 2)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await harSynligTittel(page, 'Permisjon', 2)

        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 15, 16)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarJaHovedsporsmal(page)
        await expect(
            page.getByText('Ikke ta med det du eventuelt tjente de dagene du hadde permisjon fra MATBUTIKKEN AS.'),
        ).toBeVisible()
    })

    test('Får spesifikk hjelpetekst ved ja på ferie og permisjon', async ({ page }) => {
        await page.context().clearCookies()
        await page.goto(
            '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold',
        )

        await harSynligTittel(page, 'Ferie', 2)

        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 17, 18)
        await klikkGaVidere(page)

        await harSynligTittel(page, 'Permisjon', 2)

        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 15, 16)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        await svarJaHovedsporsmal(page)
        await expect(
            page.getByText(
                'Ikke ta med det du eventuelt tjente de dagene du hadde ferie eller permisjon fra MATBUTIKKEN AS.',
            ),
        ).toBeVisible()
    })
})
