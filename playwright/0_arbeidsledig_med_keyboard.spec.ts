import { test, expect, Page } from '@playwright/test'

import { validerAxeUtilityWrapper } from './uuvalidering'
import { tabUntilFocusedContainsText, tabUntilFocusedLocator } from './utils/tastaturSnarvei'
import { harSynligTittel, harSynligTekst } from './utils/utilities'

async function sjekkMainContentFokus(page: Page) {
    const mainContent = page.locator('main')
    await expect(mainContent).toBeFocused()
}

const soknad = {
    id: '934f39f4-cb47-459f-8209-0dbef6d30059',
}

test.describe('Arbeidsledigsøknad med tastaturnavigasjon', () => {
    test('Full arbeidsledigsøknad flow', async ({ page, browserName }) => {
        await page.goto('/syk/sykepengesoknad?testperson=arbeidsledig')

        await harSynligTittel(page, 'Søknader', 1)
        await expect(await harSynligTittel(page, 'Søknader', 1)).toHaveText('Søknader')
        await page.locator(`a[href*="${soknad.id}"]`).click()

        await sjekkMainContentFokus(page)
        await harSynligTittel(page, 'Før du søker', 2)
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))
        await tabUntilFocusedContainsText(browserName, page, 'Hvordan behandler vi personopplysninger')
        await page.keyboard.press('Space')
        await harSynligTekst(page, 'Les mer om hvordan NAV behandler personopplysningene dine')
        await tabUntilFocusedContainsText(browserName, page, 'Vi lagrer svarene underveis')
        await page.keyboard.press('Space')
        await expect(
            page.getByText('Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser underveis'),
        ).toBeVisible()

        if (browserName === 'webkit') {
            await page.keyboard.press('Alt+Tab')
            await page.keyboard.press('Alt+Tab')
        } else {
            await page.keyboard.press('Tab')
            await page.keyboard.press('Tab')
        }
        const bekreftLabel = page
            .locator('label')
            .filter({ hasText: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.' })
            .locator('..')
        await expect(bekreftLabel).toHaveCSS('box-shadow', /./)

        await page.keyboard.press('Space')

        const startButton = await tabUntilFocusedContainsText(browserName, page, 'Start søknad')
        await expect(startButton).toHaveCSS('box-shadow', /./)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await harSynligTittel(page, 'Friskmeldt', 2)
        await expect(page.locator('form').getByRole('radio', { name: 'Nei' })).toHaveCount(1)
        await validerAxeUtilityWrapper(page, test.info())

        await tabUntilFocusedLocator(browserName, page, page.getByRole('radio', { name: 'Ja' }))
        await page.keyboard.press('Space')

        await tabUntilFocusedLocator(browserName, page, page.getByRole('button', { name: 'Gå videre' }))
        const focusedFriskmeldt = page.locator(':focus')
        await expect(focusedFriskmeldt).toHaveText('Gå videre')
        await expect(focusedFriskmeldt).toHaveCSS('box-shadow', /.+/)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await harSynligTittel(page, 'Andre inntektskilder', 2)
        await harSynligTekst(page, 'Hva mener vi med andre inntektskilder?')
        await validerAxeUtilityWrapper(page, test.info())

        await tabUntilFocusedLocator(browserName, page, page.getByRole('radio', { name: 'Ja' }))
        await page.keyboard.press('Space')
        await page.keyboard.press('ArrowRight')

        await tabUntilFocusedLocator(browserName, page, page.getByRole('button', { name: 'Gå videre' }))

        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await harSynligTittel(page, 'Reise utenfor EU/EØS', 2)
        await validerAxeUtilityWrapper(page, test.info())

        await tabUntilFocusedLocator(browserName, page, page.getByRole('radio', { name: 'Ja' }))
        await page.keyboard.press('Space')
        await page.keyboard.press('ArrowRight')

        await tabUntilFocusedContainsText(browserName, page, 'Gå videre')
        const focusedReise = page.locator(':focus')
        await expect(focusedReise).toHaveText('Gå videre')
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
        await validerAxeUtilityWrapper(page, test.info())

        const sendSoknad = await tabUntilFocusedLocator(
            browserName,
            page,
            page.getByRole('button', { name: 'Send søknaden' }),
        )
        await expect(sendSoknad).toHaveText('Send søknaden')
        await expect(sendSoknad).toHaveCSS('box-shadow', /.+/)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await harSynligTekst(page, 'Søknaden er sendt til NAV')

        await expect(page.getByText(/Mottatt.*kl/, { exact: false })).toBeVisible()

        await validerAxeUtilityWrapper(page, test.info())
    })
})
