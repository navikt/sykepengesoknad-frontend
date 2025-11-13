import { test, expect } from '@playwright/test'

import { nyttReisetilskudd } from '../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

import {
    klikkGaVidere,
    klikkTilbake,
    lastOppKvittering,
    velgCheckbox,
    svarFritekst,
    hentFritekst,
    svarRadioClickOption,
} from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Teste førsteside i reisetilskuddsøknaden', () => {
    test.setTimeout(180 * 1000) // Increased timeout to 3 minutes for slow navigation
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=reisetilskudd')
    })

    test('Complete reisetilskudd søknad flow', async ({ page }) => {
        const steg = { value: 1 }

        await test.step('Landingside og listevisning', async () => {
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
            await page.getByRole('link', { name: 'Søknad om reisetilskudd' }).click()

            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/1`))
        })

        await test.step('Ansvarserklæring - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/1`))

            await page.locator('[data-cy="om-reisetilskudd"]').click()
            await expect(page.locator('.navds-label').filter({ hasText: 'Hva dekker reisetilskuddet' })).toBeVisible()
            await expect(
                page
                    .locator('p.navds-body-long')
                    .filter({ hasText: 'Reisetilskuddet dekker nødvendige ekstra reiseutgifter' }),
            ).toBeVisible()

            await expect(page.locator('.navds-label').filter({ hasText: 'De første 16 dagene' })).toBeVisible()
            await expect(page.locator('.navds-label').filter({ hasText: 'Legg ved kvitteringer' })).toBeVisible()
            await expect(
                page.locator('p.navds-body-long').filter({ hasText: 'Du må legge ved bilde av kvitteringene dine' }),
            ).toBeVisible()

            await page.locator('.navds-checkbox__label').click()
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Start søknad').click()
            steg.value++
        })

        await test.step('Før du fikk sykmelding - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/2`))
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Før du fikk sykmelding')

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            velgCheckbox(page, 'Offentlig transport')
            await expect(
                page.getByText('Hvor mye betaler du vanligvis i måneden for offentlig transport?'),
            ).toBeVisible()
            svarFritekst(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '1000')
            await validerAxeUtilityWrapper(page, test.info())

            await klikkGaVidere(page)

            await klikkTilbake(page)
            const fritekstValue = await hentFritekst(
                page,
                'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
            )
            expect(fritekstValue).toBe('1000')
            await validerAxeUtilityWrapper(page, test.info())

            await klikkGaVidere(page)
            steg.value++
        })

        await test.step('Reise med bil - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/3`))
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Reise med bil')

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await expect(page.locator('.undersporsmal > :nth-child(1) > :nth-child(1)')).toHaveText(
                'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page, true)
            await expect(page.locator('[data-cy="feil-lokal"]').nth(0)).toContainText('Du må oppgi minst en dag')

            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()

            await expect(page.locator('[aria-label="mandag 4"]')).toHaveAttribute('aria-pressed', 'true')
            await expect(page.locator('[aria-label="tirsdag 5"]')).toHaveAttribute('aria-pressed', 'true')
            await expect(page.locator('[aria-label="onsdag 6"]')).toHaveAttribute('aria-pressed', 'true')

            await svarRadioClickOption(page, 'Hadde du utgifter til bompenger?', 'Ja')
            await svarFritekst(page, 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?', '1000')
            await svarFritekst(page, 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?', '42')

            await expect(
                page.getByRole('textbox', { name: 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?' }),
            ).toHaveValue('1000')
            await expect(
                page.getByRole('textbox', {
                    name: 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?',
                }),
            ).toHaveValue('42')

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
            steg.value++
        })

        await test.step('Opplasting - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/4`))

            await lastOppKvittering(page)

            const table = page.locator('.navds-table')
            await expect(table).toContainText('Taxi')
            await expect(table).toContainText('1 234 kr')
            await expect(table).toContainText('1 utgift på til sammen')
            await expect(table).toContainText('1 234 kr')

            await table.locator('.navds-table__toggle-expand-button').click()
            await expect(
                page.locator('.navds-table__expanded-row-content img[alt="kvittering for taxi"]'),
            ).toBeVisible()

            await table.getByRole('button', { name: 'Slett' }).click()
            await expect(page.getByRole('dialog').filter({ hasText: 'Vil du slette kvitteringen?' })).toBeVisible()
            await page.getByRole('button', { name: 'Ja, jeg er sikker' }).click()
            await expect(page.getByText('Vil du slette kvitteringen?')).toBeHidden()
            await expect(page.locator('.sumlinje')).toBeHidden()

            await page.getByText('Legg til reiseutgift').click()
            await expect(page.getByRole('dialog', { name: 'Legg til reiseutgift' })).toHaveAttribute('open')
            // todo fix uu feil her await validerAxeUtilityWrapper(page, test.info())
            await page
                .locator('[data-cy="filopplasteren"] input[type=file]')
                .setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.locator('input[name=belop_input]').fill('99')
            await page.locator('select[name=transportmiddel]').selectOption('PARKERING')

            await page.getByText('Bekreft').click()

            await expect(table).toContainText('Parkering')
            await expect(table).toContainText('99 kr')
            await expect(table).toContainText('1 utgift på til sammen')
            await validerAxeUtilityWrapper(page, test.info())

            await klikkGaVidere(page)
            await klikkTilbake(page)
            await expect(table).toContainText('Parkering')
            await expect(table).toContainText('99 kr')
            await expect(table).toContainText('1 utgift på til sammen')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
            steg.value++
        })

        await test.step('Utbetaling - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/5`))
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Utbetaling')

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
            steg.value++
        })

        await test.step('Oppsummering - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/6`))
            await expect(page.locator('.navds-guide-panel__content')).toContainText(
                'Nå kan du se over at alt er riktig før du sender inn søknaden.',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Send søknaden').click()
        })

        await test.step('Kvittering - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`kvittering/${nyttReisetilskudd.id}`))

            const kvitteringPanel = page.locator('[data-cy="kvittering-panel"]')
            await expect(kvitteringPanel).toContainText('Hva skjer videre?')
            await expect(kvitteringPanel).toContainText('NAV behandler søknaden din')
            await expect(kvitteringPanel).toContainText(
                'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon.',
            )
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
