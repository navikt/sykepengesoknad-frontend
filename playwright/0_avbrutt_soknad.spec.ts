import { test, expect } from '@playwright/test'

import { avbruttSoknad } from '../src/data/mock/data/soknad/arbeidstaker-avbrutt'

import { checkViStolerPaDeg, modalAktiv, avbryterSoknad, harSynligTekst } from './utilities' // Adjust the import path if these are in a separate file

test.describe('Tester avbryting av søknad', () => {
    test('Full flow for avbryting av søknad', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')

        await test.step('Laster startside', async () => {
            const heading = page.locator('.navds-heading--large')
            await expect(heading).toBeVisible()
            await expect(heading).toHaveText('Søknader')
        })

        const avbruttLink = page.locator(`a[href*="${avbruttSoknad.id}"]`)
        await test.step('Avbrutt søknad har forventa tekst', async () => {
            await expect(avbruttLink).toContainText('1. – 24. april')
            await expect(avbruttLink).toContainText('Avbrutt av deg')
        })

        await test.step('Ved klikk så åpnes avbrutt søknad visning', async () => {
            await avbruttLink.click()
            await expect(
                page.getByText(
                    'Du har fjernet søknaden, som betyr at du ikke vil få sykepenger basert på denne søknaden.',
                ),
            ).toBeVisible()
            await expect(page).toHaveURL(new RegExp(`avbrutt/${avbruttSoknad.id}`))
        })

        await test.step('Avbrutt tekster stemmer', async () => {
            await harSynligTekst(page, 'Søknaden ble avbrutt og fjernet av deg')
            await harSynligTekst(page, '12. juni 2020')
            await harSynligTekst(
                page,
                'Du har fjernet søknaden, som betyr at du ikke vil få sykepenger basert på denne søknaden',
            )
            await harSynligTekst(
                page,
                'For å få sykepenger fra NAV, må du søke. Så hvis du ikke har sendt inn søknad som gjelder samme periode og samme arbeidsgiver på papir, vil du ikke få sykepenger fra NAV for denne perioden.',
            )
            await harSynligTekst(
                page,
                'Hvis du er sykmeldt fra flere arbeidsgivere, må du sende én søknad for hver arbeidsgiver.',
            )
            await harSynligTekst(
                page,
                'Hvis du vil søke om sykepenger basert på denne søknaden likevel, må du gjenåpne søknaden, fylle den ut og sende den inn.',
            )
        })

        await test.step('Søknad kan gjenåpnes', async () => {
            await page.getByRole('button', { name: 'Jeg vil bruke denne søknaden likevel' }).click()
            await expect(page).toHaveURL(new RegExp(`${avbruttSoknad.id}/1`))
            await checkViStolerPaDeg(page)
        })

        await test.step('Søknad kan avsluttes og fortsette senere', async () => {
            await expect(page.getByRole('heading', { name: 'Fravær før sykmeldingen' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Avslutt og fortsett senere' })).toBeVisible()
            await page.getByRole('button', { name: 'Avslutt og fortsett senere' }).click()
            await modalAktiv(page)
            await harSynligTekst(page, 'Vi lagrer søknaden din på Ditt sykefravær i listen med søknader om sykepenger.')
            await harSynligTekst(page, 'Ja, fortsett senere')
            await page.getByRole('button', { name: 'Nei' }).first().click()
        })

        await test.step('Søknad kan avbrytes', async () => {
            await avbryterSoknad(page)
            await expect(page).toHaveURL(new RegExp(`avbrutt/${avbruttSoknad.id}`))
            await harSynligTekst(page, 'Jeg vil bruke denne søknaden likevel')
        })
    })
})
