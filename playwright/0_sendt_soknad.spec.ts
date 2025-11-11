import { test, expect } from '@playwright/test'

import { harSynligTittel, trykkPaSoknadMedId, harSynligTekst } from './utils/utilities'

test.describe('Tester sendt søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        await page.waitForLoadState('load')
        await harSynligTittel(page, 'Søknader', 1)
    })

    test('Sendt søknad har forventa tekst', async ({ page }) => {
        const sendtArbeidsledigId = '3848e75e-4069-4076-95c0-3f9f0b63e498'

        const soknadLink = page.locator(`[data-cy="link-listevisning-${sendtArbeidsledigId}"]`)

        await expect(soknadLink).toContainText('27. mai – 11. juni 2020')
        await expect(soknadLink).toContainText('Sendt til NAV')
    })

    test('Ved klikk så åpnes kvittering søknad visning', async ({ page }) => {
        const sendtArbeidsledigId = '3848e75e-4069-4076-95c0-3f9f0b63e498'

        await trykkPaSoknadMedId(page, sendtArbeidsledigId)

        await expect(page).toHaveURL(new RegExp(`.*\\/sendt\\/${sendtArbeidsledigId}.*testperson=integrasjon-soknader`))
        await harSynligTekst(page, 'Søknaden er sendt til NAV')
    })

    test('Siden kan refreshes', async ({ page }) => {
        const sendtArbeidsledigId = '3848e75e-4069-4076-95c0-3f9f0b63e498'

        await page.goto(`/syk/sykepengesoknad/sendt/${sendtArbeidsledigId}?testperson=integrasjon-soknader`)
        await harSynligTekst(page, 'Søknaden er sendt til NAV')

        await page.reload()
        await harSynligTekst(page, 'Søknaden er sendt til NAV')

        await expect(page).toHaveURL(new RegExp(`.*\\/sendt\\/${sendtArbeidsledigId}.*testperson=integrasjon-soknader`))
    })
})
