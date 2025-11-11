import { test, expect } from '@playwright/test'

import { sendtArbeidsledig } from '../src/data/mock/data/soknad/arbeidsledig-sendt'

import { harSynligTittel, trykkPaSoknadMedId, harSynligTekst } from './utils/utilities'

const sendtArbeidsledigId = sendtArbeidsledig.id

test.describe('Tester sendt søknad', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        await page.waitForLoadState('load')
        await harSynligTittel(page, 'Søknader', 1)
    })

    test('Sendt søknad har forventa tekst', async ({ page }) => {
        const soknadLink = page.locator(`[data-cy="link-listevisning-${sendtArbeidsledigId}"]`)

        await expect(soknadLink).toContainText('27. mai – 11. juni 2020')
        await expect(soknadLink).toContainText('Sendt til NAV')
    })

    test('Ved klikk så åpnes kvittering søknad visning', async ({ page }) => {
        await trykkPaSoknadMedId(page, sendtArbeidsledigId)

        await expect(page).toHaveURL(new RegExp(`.*\\/sendt\\/${sendtArbeidsledigId}.*testperson=integrasjon-soknader`))
        await harSynligTekst(page, 'Søknaden er sendt til NAV')
    })

    test('Siden kan refreshes', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/sendt/${sendtArbeidsledigId}?testperson=integrasjon-soknader`)
        await harSynligTekst(page, 'Søknaden er sendt til NAV')

        await page.reload()
        await harSynligTekst(page, 'Søknaden er sendt til NAV')

        await expect(page).toHaveURL(new RegExp(`.*\\/sendt\\/${sendtArbeidsledigId}.*testperson=integrasjon-soknader`))
    })
})
