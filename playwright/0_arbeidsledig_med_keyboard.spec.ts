import { test, expect, Page } from '@playwright/test'

import { validerAxeUtilityWrapper } from './uuvalidering'
import { tabUntilFocusedContainsText, tabUntilFocusedLocator } from './utils/tastaturSnarvei'

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

        await expect(page.locator('.navds-heading--large')).toBeVisible()
        await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
        await page.locator(`a[href*="${soknad.id}"]`).click()

        await sjekkMainContentFokus(page)
        await expect(page.getByRole('heading', { name: 'Før du søker' })).toBeVisible()
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))
        await tabUntilFocusedContainsText(browserName, page, 'Hvordan behandler vi personopplysninger')
        await page.keyboard.press('Space')
        await expect(page.getByText('Les mer om hvordan NAV behandler personopplysningene dine')).toBeVisible()
        await tabUntilFocusedContainsText(browserName, page, 'Vi lagrer svarene underveis')
        await page.keyboard.press('Space')
        await expect(
            page.getByText('Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser underveis'),
        ).toBeVisible()

        // eslint-disable-next-line playwright/no-conditional-in-test
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

        await expect(page.getByRole('heading', { name: 'Friskmeldt' })).toBeVisible()
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

        await expect(page.getByRole('heading', { name: 'Andre inntektskilder' })).toBeVisible()
        await expect(page.getByText('Hva mener vi med andre inntektskilder?')).toBeVisible()
        await validerAxeUtilityWrapper(page, test.info())

        await tabUntilFocusedLocator(browserName, page, page.getByRole('radio', { name: 'Ja' }))
        await page.keyboard.press('Space')
        await page.keyboard.press('ArrowRight')

        await tabUntilFocusedLocator(browserName, page, page.getByRole('button', { name: 'Gå videre' }))

        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByRole('heading', { name: 'Reise utenfor EU/EØS' })).toBeVisible()
        await validerAxeUtilityWrapper(page, test.info())

        await tabUntilFocusedLocator(browserName, page, page.getByRole('radio', { name: 'Ja' }))
        await page.keyboard.press('Space')
        await page.keyboard.press('ArrowRight')

        await tabUntilFocusedContainsText(browserName, page, 'Gå videre')
        const focusedReise = page.locator(':focus')
        await expect(focusedReise).toHaveText('Gå videre')
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden' })).toBeVisible()
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

        await expect(page.getByText('Søknaden er sendt til NAV')).toBeVisible()

        await expect(page.getByText(/Mottatt.*kl/, { exact: false })).toBeVisible()

        await validerAxeUtilityWrapper(page, test.info())
    })
})
