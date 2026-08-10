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
    apneReadmore,
    svarJaHovedsporsmal,
    harSynligTittel,
    harSynligTekst,
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
            await harSynligTittel(page, 'Søknader', 1)
            await expect(await harSynligTittel(page, 'Søknader', 1)).toHaveText('Søknader')
            await page.getByRole('link', { name: 'Søknad om reisetilskudd' }).click()

            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/1`))
        })

        await test.step('Ansvarserklæring - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/1`))

            await page.getByLabel('Om reisetilskudd').click()
            await harSynligTekst(page, 'Hva dekker reisetilskuddet')
            await harSynligTekst(page, 'Reisetilskuddet dekker nødvendige ekstra reiseutgifter')

            await harSynligTittel(page, 'De første 16 dagene', 3)
            await harSynligTekst(page, 'Legg ved kvitteringer')
            await harSynligTekst(page, 'Du må legge ved bilde av kvitteringene dine')

            await page.getByRole('checkbox', { name: /Jeg bekrefter/i }).click()
            await validerAxeUtilityWrapper(page, test.info(), true)
            await page.getByText('Start søknad').click()
            steg.value++
        })

        await test.step('Før du fikk sykmelding - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/2`))
            await expect(await harSynligTittel(page, 'Før du fikk sykmelding', 2)).toHaveText('Før du fikk sykmelding')

            await apneReadmore(page, 'Hva mener vi med offentlig transport?', [
                'Offentlig transport er blant annet buss, tog og båt som går i fast rute.',
                'Det kan også være bysykkel og el-sparkesykkel.',
            ])

            await svarJaHovedsporsmal(page)
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
            await expect(await harSynligTittel(page, 'Reise med bil', 2)).toHaveText('Reise med bil')

            await svarJaHovedsporsmal(page)
            await expect(page.locator('.undersporsmal > :nth-child(1) > :nth-child(1)')).toHaveText(
                'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page, true)
            await expect(page.getByText('Du må oppgi minst en dag')).toContainText('Du må oppgi minst en dag')

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

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Du må laste opp kvitteringer, faktura eller annen dokumentasjon',
                'taxi',
                'offentlig transport',
                'parkering',
                'Kvitteringene må kunne leses av en saksbehandler',
            ])

            await lastOppKvittering(page)

            const table = page.getByRole('table')
            await expect(table).toContainText('Taxi')
            await expect(table).toContainText('1 234 kr')
            await expect(table).toContainText('1 utgift på til sammen')
            await expect(table).toContainText('1 234 kr')

            await table.locator('[aria-expanded]').click()
            await expect(page.getByRole('img', { name: 'kvittering for taxi' })).toBeVisible()

            await table.getByRole('button', { name: 'Slett' }).click()
            await expect(page.getByRole('dialog').filter({ hasText: 'Vil du slette kvitteringen?' })).toBeVisible()
            await page.getByRole('button', { name: 'Ja, jeg er sikker' }).click()
            await expect(page.getByText('Vil du slette kvitteringen?')).toBeHidden()
            await expect(page.locator('.sumlinje')).toBeHidden()

            await page.getByText('Legg til reiseutgift').click()
            await expect(page.getByRole('dialog', { name: 'Legg til reiseutgift' })).toHaveAttribute('open')
            await page
                .locator('[aria-label="Filopplasteren"] input[type=file]')
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
            await expect(await harSynligTittel(page, 'Utbetaling', 2)).toHaveText('Utbetaling')

            await svarJaHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
            steg.value++
        })

        await test.step('Oppsummering - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/6`))
            await harSynligTekst(page, 'Nå kan du se over at alt er riktig før du sender inn søknaden.')
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Send søknaden').click()
        })

        await test.step('Kvittering - Reisetilskudd', async () => {
            await expect(page).toHaveURL(new RegExp(`kvittering/${nyttReisetilskudd.id}`))

            const kvitteringPanel = page.locator('[role="region"][aria-label="Hva skjer videre?"]')
            await expect(kvitteringPanel).toContainText('Hva skjer videre?')
            await expect(kvitteringPanel).toContainText('NAV behandler søknaden din')
            await expect(kvitteringPanel).toContainText(
                'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon.',
            )
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
