import { test, expect } from '@playwright/test'

import { nyttReisetilskudd } from '../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

test.describe('Tester feilmeldinger i reisetilskudd', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await page.goto(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4?testperson=reisetilskudd`)
        await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`))
    })

    test('Feilmeldinger når ingenting er valgt', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('.navds-modal').getByText('Bekreft').click()

        await expect(page.locator('[data-cy="opplasting-form"]').getByText('Du må velge transportmiddel')).toBeVisible()
        await expect(page.locator('[data-cy="opplasting-form"]').getByText('Du må skrive inn beløp')).toBeVisible()
        await expect(page.locator('[data-cy="opplasting-form"]').getByText('Du må laste opp kvittering')).toBeVisible()
    })

    test('Ugyldig valg', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('select[name=transportmiddel]').selectOption('')
        await page.locator('.navds-modal').getByText('Bekreft').click()

        await expect(page.getByRole('dialog', { name: 'Legg til reiseutgift' })).toHaveAttribute('open')
        await expect(page.locator('[data-cy="opplasting-form"]').getByText('Du må velge transportmiddel')).toBeVisible()

        await page.locator('select[name=transportmiddel]').selectOption('PARKERING')
        await expect(page.locator('#transportmiddel')).toContainText('Parkering')
        await page.locator('.navds-modal').getByText('Bekreft').click()
        await expect(page.locator('[data-cy="opplasting-form"]').getByText('Du må velge transportmiddel')).toBeHidden()
    })

    test('Negative beløp', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('input[name=belop_input]').fill('-100')
        await page.locator('.navds-modal').getByText('Bekreft').click()
        await expect(
            page.locator('[data-cy="opplasting-form"]').getByText('Beløp kan ikke være negativt'),
        ).toBeVisible()
    })

    test('Høyere beløp enn maks', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('input[name=belop_input]').clear()
        await page.locator('input[name=belop_input]').fill('1000000000')
        await page.locator('.navds-modal').getByText('Bekreft').click()
        await expect(
            page.locator('[data-cy="opplasting-form"]').getByText('Beløp kan ikke være større enn 1 000 000'),
        ).toBeVisible()
    })

    test('Kan ikke skrive inn med 3 desimaler', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('input[name=belop_input]').clear()
        await page.locator('input[name=belop_input]').fill('100.253')
        await page.locator('.navds-modal').getByText('Bekreft').click()

        const inputValue = page.locator('input[name=belop_input]')
        await expect(inputValue).toHaveValue('100.25')
    })

    test('Gyldig beløp med 2 desimaler', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('input[name=belop_input]').clear()
        await page.locator('input[name=belop_input]').fill('100.30')
        await page.locator('.navds-modal').getByText('Bekreft').click()
        await expect(
            page.locator('[data-cy="opplasting-form"]').getByText('Beløp kan ikke være større enn 10 000'),
        ).toBeHidden()
    })

    test('Gyldig beløp uten desimaler', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('input[name=belop_input]').clear()
        await page.locator('input[name=belop_input]').fill('99')
        await page.locator('.navds-modal').getByText('Bekreft').click()
        await expect(
            page.locator('[data-cy="opplasting-form"]').getByText('Beløp kan ikke være større enn 10 000'),
        ).toBeHidden()
    })

    test('Legger inn taxi kvittering', async ({ page }) => {
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()

        await page.locator('select[name=transportmiddel]').selectOption('TAXI')
        await expect(page.locator('#transportmiddel')).toContainText('Taxi')

        // Upload invalid file first
        await page
            .locator('[data-cy="filopplasteren"] input[type=file]')
            .setInputFiles('./playwright/fixtures/kvittering.pdf')
        await page.getByRole('button', { name: 'Bekreft' }).click()
        await expect(page.locator('.navds-modal').getByText('Filtypen til kvittering.pdf er ugyldig')).toBeVisible()
        await page.locator('.navds-modal').getByRole('button', { name: 'Slett filen' }).click()

        // Try multiple files - upload first file
        await page
            .locator('[data-cy="filopplasteren"] input[type=file]')
            .setInputFiles('./playwright/fixtures/kvittering.jpg')
        // Then try to upload second file to trigger multiple files error
        await page
            .locator('[data-cy="filopplasteren"] input[type=file]')
            .setInputFiles('./playwright/fixtures/kvittering2.jpg')
        await page.getByRole('button', { name: 'Bekreft' }).click()

        // TODO can I make this work?
        // await expect(page.locator('.navds-modal').getByText('Du kan ikke laste opp mer enn en fil')).toBeVisible()
        await page.locator('.navds-modal').getByRole('button', { name: 'Slett filen' }).click()

        // Upload valid single file
        await page
            .locator('[data-cy="filopplasteren"] input[type=file]')
            .setInputFiles('./playwright/fixtures/kvittering.jpg')
        await page.getByRole('button', { name: 'Bekreft' }).click()
        await expect(page.locator('.navds-modal').getByText('Du kan ikke laste opp mer enn en fil')).toBeHidden()
    })

    test('Fil list oppdateres med kvittering', async ({ page }) => {
        // First add a taxi receipt following the complete flow
        await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
        await page.locator('select[name=transportmiddel]').selectOption('TAXI')
        await page.locator('input[name=belop_input]').fill('99')
        await page
            .locator('[data-cy="filopplasteren"] input[type=file]')
            .setInputFiles('./playwright/fixtures/kvittering.jpg')
        await page.getByRole('button', { name: 'Bekreft' }).click()

        // Verify the table is updated
        const table = page.locator('.navds-table')
        await expect(table.getByText('Taxi')).toBeVisible()
        await expect(table.getByText('99 kr').first()).toBeVisible()
        await expect(table.getByText('1 utgift på til sammen')).toBeVisible()
        await expect(table.getByText('99 kr').first()).toBeVisible()
    })
})
