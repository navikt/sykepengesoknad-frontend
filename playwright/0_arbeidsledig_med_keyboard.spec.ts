import { test, expect, Page } from '@playwright/test'

// Utility function
async function sjekkMainContentFokus(page: Page) {
    const mainContent = page.locator('main')
    await expect(mainContent).toBeFocused()
}

const arbeidsledig = {
    id: '934f39f4-cb47-459f-8209-0dbef6d30059',
}

test('Full arbeidsledigsøknad flow', async ({ page }) => {
    // Gå til startside
    await page.goto('/syk/sykepengesoknad?testperson=arbeidsledig', {
        waitUntil: 'networkidle',
    })
    await expect(page.locator('.navds-heading--large')).toBeVisible()
    await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
    await page.locator(`a[href*="${arbeidsledig.id}"]`).click()

    // Første steg: les/vilkår
    await expect(page).toHaveURL(new RegExp(`${arbeidsledig.id}/1`))
    await page.keyboard.press('Tab') // ... repeat as needed
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

    expect(page.getByRole('heading', { name: 'Friskmeldt' })).toBeVisible()
    await expect(page.locator('form').getByRole('radio', { name: 'Nei' })).toHaveCount(1)

    // Neste steg
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const gaVidereButton1 = page.getByRole('button', { name: 'Gå videre' })
    await expect(gaVidereButton1).toHaveCSS('box-shadow', /./)
    await page.keyboard.press('Enter')
    await sjekkMainContentFokus(page)

    expect(page.getByRole('heading', { name: 'Andre inntektskilder' })).toBeVisible()

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
    const gaVidereButton2 = page.getByRole('button', { name: 'Gå videre' })
    await expect(gaVidereButton2).toHaveCSS('box-shadow', /./)
    await page.keyboard.press('Enter')
    await sjekkMainContentFokus(page)

    expect(page.getByRole('heading', { name: 'Reise' })).toBeVisible()

    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const gaVidereButton3 = page.getByRole('button', { name: 'Gå videre' })
    await expect(gaVidereButton3).toHaveCSS('box-shadow', /./)
    await page.keyboard.press('Enter')
    await sjekkMainContentFokus(page)

    await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden' })).toBeVisible()

    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const sendButton = page.getByRole('button', { name: 'Send søknaden' })
    await expect(sendButton).toHaveCSS('box-shadow', /./)
    await page.keyboard.press('Enter')
    await sjekkMainContentFokus(page)

    await expect(page.getByText('Søknaden er sendt til NAV')).toBeVisible()

    await expect(page.getByText(/Mottatt.*kl/, { exact: false })).toBeVisible()
})
