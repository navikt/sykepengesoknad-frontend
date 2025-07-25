import { test, expect } from '@playwright/test'
import { arbeidstakerGradert } from '../src/data/mock/data/soknad/arbeidstaker-gradert'
import { checkViStolerPaDeg, klikkGaVidere, svarNeiHovedsporsmal } from './utilities'

// Helper function to get heading locator
function harSynligTittel(page: any, heading: string, level = 2) {
    return page.getByRole('heading', { name: heading, level })
}

test.describe('Tester flexjar', () => {
    const soknad = arbeidstakerGradert

    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
    })

    test('Laster startside', async ({ page }) => {
        await page.locator(`a[href*="${soknad.id}"]`).click()
    })

    test('Naviger til tilbake i arbeid', async ({ page }) => {
        await expect(harSynligTittel(page, 'Tilbakemeldingen din er viktig for oss!')).toHaveCount(0)
        await checkViStolerPaDeg(page)
    })

    test('Test å gi feedback', async ({ page }) => {
        await checkViStolerPaDeg(page)
        await expect(page.getByText('Tilbake i fullt arbeid')).toBeVisible()
        await expect(page.getByText('Tilbakemeldingen din er viktig for oss!')).toBeVisible()

        const feedbackRegion = page.getByRole('region').filter({ 
            has: page.getByText('Tilbakemeldingen din er viktig for oss!')
        })

        const yesButton = feedbackRegion.getByRole('button', { name: 'Ja' })
        await yesButton.click()
        await expect(yesButton).toHaveCSS('background-color', 'rgb(35, 38, 42)')
        
        await expect(page.getByText('Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger.')).toBeVisible()
        
        await feedbackRegion.getByRole('textbox').fill('Dette er en test')
        
        await feedbackRegion.getByRole('button', { name: 'Send tilbakemelding' }).click()
        
        await expect(page.getByText('Takk for tilbakemeldingen!')).toBeVisible()
    })

    test('Navigerer til siste side', async ({ page }) => {
        await checkViStolerPaDeg(page)
        
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
        
        await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()
        
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
        
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
    })

    test('Har ikke spørsmål flexjar på de siste sidene', async ({ page }) => {
        await checkViStolerPaDeg(page)
        
        // Navigate to the last page by answering "Nei" to all questions
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

        await expect(harSynligTittel(page, 'Tilbakemeldingen din er viktig for oss!')).toHaveCount(0)
        
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        
        await expect(page.getByText('Søknaden er sendt')).toBeVisible()
        await expect(harSynligTittel(page, 'Tilbakemeldingen din er viktig for oss!')).toHaveCount(1)
    })

    test('Har emoji flexjar på kvitteringa', async ({ page }) => {
        await checkViStolerPaDeg(page)
        
        // Navigate to the final submission page
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

        await page.getByRole('button', { name: 'Send søknaden' }).click()

        await expect(page.getByText('Hva synes du om denne søknaden?')).toBeVisible()
        
        const feedbackRegion = page.getByRole('region').filter({ 
            has: page.getByText('Tilbakemeldingen din er viktig for oss!')
        })

        const braButton = feedbackRegion.getByRole('button', { name: 'Bra' })
        await expect(braButton).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
        await braButton.click()
        await expect(braButton).toHaveCSS('background-color', 'rgb(236, 238, 240)')
        
        await expect(page.getByText('Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger.')).toBeVisible()
        
        await feedbackRegion.getByRole('textbox').fill('Dette er en test')
        
        await feedbackRegion.getByRole('button', { name: 'Send tilbakemelding' }).click()
        
        await expect(page.getByText('Takk for tilbakemeldingen!')).toBeVisible()
    })
})
