import { test, expect, Page } from '@playwright/test'

import { tabUntilFocusedContainsText } from './utilities'

async function sjekkMainContentFokus(page: Page) {
    const mainContent = page.locator('main')
    await expect(mainContent).toBeFocused()
}

const soknad = {
    id: '934f39f4-cb47-459f-8209-0dbef6d30059',
}

test.describe('Arbeidsledigsøknad med tastaturnavigasjon', () => {
    test('Full arbeidsledigsøknad flow', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=arbeidsledig')

        await expect(page.locator('.navds-heading--large')).toBeVisible()
        await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
        await page.locator(`a[href*="${soknad.id}"]`).click()

        await sjekkMainContentFokus(page)
        await expect(page.getByRole('heading', { name: 'Før du søker' })).toBeVisible()
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Space')
        await expect(page.getByText('Les mer om hvordan NAV behandler personopplysningene dine')).toBeVisible()
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Space')
        await expect(
            page.getByText(
                'Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser underveis. Søknader som ikke blir sendt inn lagrer vi i 4 måneder før de slettes automatisk.',
            ),
        ).toBeVisible()

        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        const bekreftLabel = page
            .locator('label')
            .filter({ hasText: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.' })
            .locator('..')
        await expect(bekreftLabel).toHaveCSS('box-shadow', /./)

        await page.keyboard.press('Space')
        await page.keyboard.press('Tab')
        const startButton = page.getByRole('button', { name: 'Start søknad' })
        await expect(startButton).toHaveCSS('box-shadow', /./)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByRole('heading', { name: 'Friskmeldt' })).toBeVisible()
        await expect(page.locator('form').getByRole('radio', { name: 'Nei' })).toHaveCount(1)

        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Space')

        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        const focusedFriskmeldt = page.locator(':focus')
        await expect(focusedFriskmeldt).toHaveText('Gå videre')
        await expect(focusedFriskmeldt).toHaveCSS('box-shadow', /.+/)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByRole('heading', { name: 'Andre inntektskilder' })).toBeVisible()
        await expect(page.getByText('Hva mener vi med andre inntektskilder?')).toBeVisible()
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Space')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')

        const focusedAi = page.locator(':focus')

        await expect(focusedAi).toHaveText('Gå videre')
        await expect(focusedAi).toHaveCSS('box-shadow', /.+/)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByRole('heading', { name: 'Reise utenfor EU/EØS' })).toBeVisible()

        for (let i = 0; i < 8; i++) {
            await page.keyboard.press('Tab')
        }
        await page.keyboard.press('Space')
        await page.keyboard.press('ArrowRight')
        tabUntilFocusedContainsText('chromium', page, 'Gå videre', { maxTabs: 50 })
        const focusedReise = page.locator(':focus')
        await expect(focusedReise).toHaveText('Gå videre')
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden' })).toBeVisible()
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        const focused = page.locator(':focus')
        await expect(focused).toHaveText('Send søknaden')
        await expect(focused).toHaveCSS('box-shadow', /.+/)
        await page.keyboard.press('Enter')
        await sjekkMainContentFokus(page)

        await expect(page.getByText('Søknaden er sendt til NAV')).toBeVisible()

        await expect(page.getByText(/Mottatt.*kl/, { exact: false })).toBeVisible()
    })
})
