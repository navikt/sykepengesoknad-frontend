import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'

import { harSynligTittel } from './utils/utilities'

test.describe('Tester direktenavigering til søknad som ikke eksisterer', () => {
    test('Prøver å laste søknaden og blir redirectet til listevisning', async ({ page }) => {
        const nonExistentId = uuidv4()

        await page.goto(`/syk/sykepengesoknad/soknader/${nonExistentId}`)

        // bør redirecte til listevisning
        await expect(page).toHaveURL('/syk/sykepengesoknad')

        await harSynligTittel(page, 'Søknader', 1)
        await expect(await harSynligTittel(page, 'Søknader', 1)).toHaveText('Søknader')
    })
})
