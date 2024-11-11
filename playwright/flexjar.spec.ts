import { expect } from '@playwright/test'

import { test } from './fixtures'

test.describe('Flexjar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykefravaer')
    })

    test('Kan gi ja feedback', async ({ page }) => {
        await expect(page.locator('text=Svar på søknader')).toBeVisible()
        const section = page.locator('section', {
            has: page.getByRole('heading', { name: 'Hjelp oss med å gjøre denne siden bedre', level: 3 }),
        })

        await section.getByRole('button', { name: 'Ja' }).click()
        await expect(section.getByRole('button', { name: 'Ja' })).toHaveCSS('background-color', 'rgb(35, 38, 42)')
        await section.getByRole('textbox').fill('Dette er en test')
        await section.getByRole('button', { name: 'Send tilbakemelding' }).click()
        await expect(section).toContainText('Takk for tilbakemeldingen din!')
    })

    test('Kan gi nei feedback', async ({ page }) => {
        await expect(page.locator('text=Svar på søknader')).toBeVisible()
        const section = page.locator('section', {
            has: page.getByRole('heading', { name: 'Hjelp oss med å gjøre denne siden bedre', level: 3 }),
        })

        await section.getByRole('button', { name: 'Nei' }).click()
        await expect(section.getByRole('button', { name: 'Nei' })).toHaveCSS('background-color', 'rgb(35, 38, 42)')
        await section.getByRole('textbox').fill('Dette er en test')
        await section.getByRole('button', { name: 'Send tilbakemelding' }).click()
        await expect(section).toContainText('Takk for tilbakemeldingen din!')
    })
})
