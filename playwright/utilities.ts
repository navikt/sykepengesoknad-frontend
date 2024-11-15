import { expect, Page } from '@playwright/test'

export async function checkViStolerPaDeg(page: Page, gaVidere = true) {
    const checkbox = page
        .locator('form')
        .getByRole('checkbox', { name: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.' })
    await checkbox.click()

    if (gaVidere) {
        const startButton = page.getByText('Start søknad')
        await startButton.click()
    }
}
export async function svarNeiHovedsporsmal(page: Page) {
    const radioButton = page.locator('form').getByRole('radio', { name: 'Nei' }).first()
    await radioButton.click()

    await expect(radioButton).toBeChecked()
}

export async function klikkGaVidere(page: Page, forventFeil = false, skipFocusCheck = false) {
    const currentUrl = page.url()

    const currentPathParam = parseInt(currentUrl.split('/').pop()!)

    const nextButton = page.getByRole('button', { name: 'Gå videre' })
    await nextButton.click()

    if (forventFeil) return

    await page.waitForURL((url) => url.toString() !== currentUrl)

    const newUrl = page.url()

    const newPathParam = parseInt(newUrl.split('/').pop()!)

    expect(newPathParam).toBe(currentPathParam + 1)

    if (!skipFocusCheck) {
        await sjekkMainContentFokus(page)
    }
}

export async function sjekkMainContentFokus(page: Page) {
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toHaveAttribute('id', 'maincontent')
}
