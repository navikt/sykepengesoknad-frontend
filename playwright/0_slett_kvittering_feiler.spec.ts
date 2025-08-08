import path from 'path'

import { test, expect } from '@playwright/test'

test.describe('Test sletting av kvittering som feiler', () => {
    const soknadId = 'd4ce1c57-1f91-411b-ab64-beabbba29b65' // feilVedSlettingAvKvittering.id

    test.beforeEach(async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/4?testperson=reisetilskudd-test`)
    })

    test('Full flyt - sletting av kvittering som feiler', async ({ page }) => {
        await test.step('URL er riktig', async () => {
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknadId}/4`))
            await expect(page.locator('h2[data-cy="sporsmal-tittel"]')).toBeVisible()
            await expect(page.locator('h2[data-cy="sporsmal-tittel"]')).toHaveText('Kvitteringer')
        })

        await test.step('Laster opp Taxi-kvittering', async () => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

            await page.locator('select[name=transportmiddel]').selectOption('TAXI')
            await page.locator('input[name=belop_input]').fill('1234')

            const fileInput = page.locator('[data-cy="filopplasteren"] input[type=file]')
            const filePath = path.join(test.info().project.testDir, 'fixtures', 'kvittering.jpg')
            await fileInput.setInputFiles(filePath)

            await page.getByRole('button', { name: 'Bekreft' }).click()
        })

        await test.step('Liste med kvitteringer er oppdatert', async () => {
            const table = page.locator('.navds-table')
            await expect(table.getByText('Taxi')).toBeVisible()
            await expect(table.getByText('1 234 kr').first()).toBeVisible()
            await expect(table.getByText('1 utgift på til sammen')).toBeVisible()
        })

        await test.step('Sletting av kvittering fra liste', async () => {
            await page.locator('.navds-table').getByRole('button', { name: 'Slett' }).click()
            await page.getByRole('button', { name: 'Ja, jeg er sikker' }).click()

            await expect(page.getByText('Det skjedde en feil ved sletting av kvitteringen')).toBeVisible()

            await page.getByLabel('Vil du slette kvitteringen?').getByRole('button', { name: 'Nei' }).click()
        })
    })
})
