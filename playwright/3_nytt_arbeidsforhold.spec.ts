import { test, expect } from '@playwright/test'

import {
    harSynligTittel,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    klikkGaVidere,
    setPeriodeFraTil,
    harSynligTekst,
} from './utils/utilities'

test.describe('Tester nytt arbeidsforhold', () => {
    test('Åpner nytt arbeidsforhold sporsmål', async ({ page }) => {
        await test.step('Navigerer til nytt arbeidsforhold spørsmål', async () => {
            await page.goto(
                '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/7?testperson=nytt-arbeidsforhold',
            )

            await harSynligTittel(page, 'Nytt arbeidsforhold', 2)
        })

        await test.step('Verifiserer Kaffebrenneriet element og styling', async () => {
            const kaffebrennerietElement = page.getByText('Kaffebrenneriet', { exact: true })
            await expect(kaffebrennerietElement).toBeVisible()
            await expect(kaffebrennerietElement).toHaveCSS('background-color', 'rgb(236, 238, 240)')
        })
    })

    test('Svarer ja på hovedspørsmål', async ({ page }) => {
        await test.step('Navigerer til nytt arbeidsforhold spørsmål', async () => {
            await page.goto(
                '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/7?testperson=nytt-arbeidsforhold',
            )
        })

        await test.step('Svarer ja og verifiserer hjelpetekst', async () => {
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Hvor mye har du tjent i perioden 8. – 21. september 2022?')
        })
    })

    test('Får spesifikk hjelpetekst ved ja på ferie', async ({ page }) => {
        await test.step('Navigerer til ferie spørsmål', async () => {
            await page.goto(
                '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold',
            )
            await harSynligTittel(page, 'Ferie', 2)
        })

        await test.step('Svarer ja på ferie og setter periode', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 17, 18)
            await klikkGaVidere(page)
        })

        await test.step('Navigerer gjennom påfølgende spørsmål med nei', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Svarer ja på nytt arbeidsforhold og verifiserer hjelpetekst', async () => {
            await svarJaHovedsporsmal(page)
            await harSynligTekst(
                page,
                'Ikke ta med det du eventuelt tjente de dagene du hadde ferie fra MATBUTIKKEN AS.',
            )
        })
    })

    test('Får spesifikk hjelpetekst ved ja på permisjon', async ({ page }) => {
        await test.step('Navigerer til ferie spørsmål og svarer nei', async () => {
            await page.goto(
                '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold',
            )
            await harSynligTittel(page, 'Ferie', 2)

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Svarer ja på permisjon og setter periode', async () => {
            await harSynligTittel(page, 'Permisjon', 2)

            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 15, 16)
            await klikkGaVidere(page)
        })

        await test.step('Navigerer gjennom påfølgende spørsmål med nei', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Svarer ja på nytt arbeidsforhold og verifiserer hjelpetekst', async () => {
            await svarJaHovedsporsmal(page)
            await harSynligTekst(
                page,
                'Ikke ta med det du eventuelt tjente de dagene du hadde permisjon fra MATBUTIKKEN AS.',
            )
        })
    })

    test('Får spesifikk hjelpetekst ved ja på ferie og permisjon', async ({ page }) => {
        await test.step('Navigerer til ferie spørsmål og svarer ja', async () => {
            await page.goto(
                '/syk/sykepengesoknad/soknader/260f06b5-9fd0-4b30-94d2-4f90851b4cac/3?testperson=nytt-arbeidsforhold',
            )
            await harSynligTittel(page, 'Ferie', 2)

            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 17, 18)
            await klikkGaVidere(page)
        })

        await test.step('Svarer ja på permisjon og setter periode', async () => {
            await harSynligTittel(page, 'Permisjon', 2)

            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 15, 16)
            await klikkGaVidere(page)
        })

        await test.step('Navigerer gjennom påfølgende spørsmål med nei', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Svarer ja på nytt arbeidsforhold og verifiserer kombinert hjelpetekst', async () => {
            await svarJaHovedsporsmal(page)
            await harSynligTekst(
                page,
                'Ikke ta med det du eventuelt tjente de dagene du hadde ferie eller permisjon fra MATBUTIKKEN AS.',
            )
        })
    })
})
