import { test, expect } from '@playwright/test'

import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'
import { arbeidsledigKvittering } from '../src/data/mock/data/soknad/soknader-integration'

import { checkViStolerPaDeg, harSoknaderlisteHeading, trykkPaSoknadMedId } from './utils/utilities'

/**
 * Tidssone-tester som verifiserer at datoer håndteres korrekt i vest-tidssoner.
 *
 * Kjerneproblemet: `new Date('2020-01-01')` = UTC midnight.
 * I UTC-5 (New York): getDate() = 31 (desember 2019), getFullYear() = 2019.
 *
 * Buggen: DatePicker brukte `new Date(sporsmal.min)` for fromDate.
 * Med min='2020-01-01' i NYC ble fromDate = 2019-12-31 → desember navigerbar.
 * Fix: Bruker TZDate med eksplisitt Europe/Oslo tidssone.
 */

const arbeidstakerId = arbeidstaker.id
const arbeidsledigId = arbeidsledigKvittering.id

test.describe('Tidssone: periodevisning', () => {
    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('Periodevisning i søknadslisten er korrekt', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)

            const soknadLink = page.locator(`[data-cy="link-listevisning-${arbeidstakerId}"]`)
            await expect(soknadLink).toContainText('1. april – 24. mai 2020')
        })

        test('Manuell dato-input viser riktig periode', async ({ page }) => {
            test.setTimeout(60000)
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)
            await trykkPaSoknadMedId(page, arbeidstakerId)

            await checkViStolerPaDeg(page)

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()

            const datoInput = page.locator('.navds-date__field-input')
            await datoInput.fill('01.04.2020')
            await datoInput.blur()

            await expect(page.getByText('1. – 24. april 2020', { exact: false })).toBeVisible()
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('Periodevisning i søknadslisten er korrekt', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)

            const soknadLink = page.locator(`[data-cy="link-listevisning-${arbeidstakerId}"]`)
            await expect(soknadLink).toContainText('1. april – 24. mai 2020')
        })
    })
})

test.describe('Tidssone: DatePicker fromDate-grense', () => {
    /**
     * Verifiserer at DatePicker korrekt begrenser navigering til måneder
     * utenfor min/max-intervallet, uavhengig av brukerens tidssone.
     *
     * Mock: arbeidsledigKvittering → FRISKMELDT_START (min='2020-01-01', max='2020-01-10')
     */
    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('DatePicker blokkerer navigering forbi januar 2020', async ({ page }) => {
            test.setTimeout(60000)

            await page.goto(`/syk/sykepengesoknad/soknader/${arbeidsledigId}/1?testperson=integrasjon-soknader`)

            await checkViStolerPaDeg(page)

            await page.getByRole('radio', { name: 'Nei' }).click()
            await expect(page.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()

            const openButton = page.getByRole('button', { name: 'Åpne datovelger' })
            await openButton.click()

            await expect(page.getByRole('grid')).toBeVisible()

            // fromDate skal være 1. januar 2020 → forrige-knapp skal være deaktivert
            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('DatePicker blokkerer navigering forbi januar 2020', async ({ page }) => {
            test.setTimeout(60000)

            await page.goto(`/syk/sykepengesoknad/soknader/${arbeidsledigId}/1?testperson=integrasjon-soknader`)

            await checkViStolerPaDeg(page)

            await page.getByRole('radio', { name: 'Nei' }).click()
            await expect(page.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()

            const openButton = page.getByRole('button', { name: 'Åpne datovelger' })
            await openButton.click()

            await expect(page.getByRole('grid')).toBeVisible()

            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })
})
