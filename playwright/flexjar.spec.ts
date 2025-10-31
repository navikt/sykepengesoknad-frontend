import { Page } from '@playwright/test'

import { checkViStolerPaDeg, klikkGaVidere, svarNeiHovedsporsmal } from './utilities'
import { test, expect } from './fixtures'

test.describe('Tester flexjar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')

        const link = page.getByRole('link', { name: 'Søknad Om Sykepenger' })
        await expect(link).toBeVisible()
        await link.click()
    })

    test('Naviger til tilbake i arbeid', async ({ page }) => {
        const heading = page.getByText('Vil du hjelpe oss å gjøre søknaden bedre?')
        await expect(heading).toHaveCount(0)
        await checkViStolerPaDeg(page)
    })

    test('å gi feedback', async ({ page }) => {
        await checkViStolerPaDeg(page)
        await page.getByText('Tilbake i fullt arbeid').isVisible()
        await page.getByText('Vil du hjelpe oss å gjøre søknaden bedre?').isVisible()

        const feedbackTittel = page.getByText('Vil du hjelpe oss å gjøre søknaden bedre?')
        const feedbackSection = page.getByRole('region').filter({ has: feedbackTittel })

        const yesButton = feedbackSection.getByRole('button', { name: 'Ja' })
        await yesButton.click()
        await expect(yesButton).toHaveCSS('background-color', 'rgb(35, 38, 42)')

        await feedbackSection
            .getByText('Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger.')
            .isVisible()

        const feedbackTextbox = page.getByRole('textbox')
        await feedbackTextbox.fill('Dette er en test')

        const sendButton = page.getByRole('button', { name: 'Send tilbakemelding' })
        await sendButton.click()

        await page.getByText('Takk for tilbakemeldingen!').isVisible()
    })

    test('Har ikke spørsmål flexjar på de siste sidene', async ({ page }) => {
        await checkViStolerPaDeg(page)
        await navigerTilOppsummeringSide(page)

        const feedbackTittel = page.getByText('Vil du hjelpe oss å gjøre søknaden bedre?')
        await expect(feedbackTittel).toHaveCount(0) // Should not exist

        await page.getByText('Send søknaden').click()
        await page.getByText('Søknaden er sendt').isVisible()

        await expect(feedbackTittel).toHaveCount(1) // Should exist
    })

    test('Har emoji flexjar på kvitteringa', async ({ page }) => {
        await checkViStolerPaDeg(page)
        await navigerTilOppsummeringSide(page)
        await page.getByText('Send søknaden').click()

        await page.getByText('Hva synes du om denne søknaden?').isVisible()

        const feedbackTittel = page.getByText('Vil du hjelpe oss å gjøre søknaden bedre?')
        const feedbackSection = page.getByRole('region').filter({ has: feedbackTittel })

        const braButton = feedbackSection.getByRole('button', { name: 'Bra', exact: true })
        await expect(braButton).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
        await braButton.click()

        await expect(braButton).toHaveCSS('background-color', 'rgb(236, 238, 240)')

        await feedbackSection
            .getByText('Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger.')
            .isVisible()

        const feedbackTextbox = page.getByRole('textbox')
        await feedbackTextbox.fill('Dette er en test')

        const sendButton = page.getByRole('button', { name: 'Send tilbakemelding' })
        await sendButton.click()

        await page.getByText('Takk for tilbakemeldingen!').isVisible()
    })
})

async function navigerTilOppsummeringSide(page: Page) {
    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)

    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)

    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)

    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)

    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)

    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)

    await svarNeiHovedsporsmal(page)
    await klikkGaVidere(page)
}
