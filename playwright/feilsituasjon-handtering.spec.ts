import { Page } from '@playwright/test'

import {
    soknadSomTrigger401ForOppdaterSporsmal,
    soknadSomTriggerFeilStatusForOppdaterSporsmal,
    soknadSomTriggerSporsmalFinnesIkkeISoknad,
} from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './fixtures'
import {
    checkViStolerPaDeg,
    harSoknaderlisteHeading,
    klikkGaVidere,
    svarNeiHovedsporsmal,
    trykkPaSoknadMedId,
} from './utilities'

const OOPS_ERROR = 'Ooops! Her har det skjedd noe rart'
const BACK_TO_LIST = 'Gå tilbake til listen over alle søknader'
const REFRESH_PAGE = 'Last inn siden på nytt'
const SEND_SOKNADEN = 'Send søknaden'
const SOKNAD_OM_SYKEPENGER = 'Søknad om sykepenger'

async function gaTilListeOgApneSoknad(page: Page, url: string, soknadId: string) {
    await page.goto(url)
    await harSoknaderlisteHeading(page)
    await harSoknaderlisteHeading(page)
    await trykkPaSoknadMedId(page, soknadId)
    await expect(page).toHaveURL(new RegExp(`${soknadId}/1`))
    await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()
}

async function forventOopsOgRefresh(page: Page, soknadId: string) {
    await test.step('Valider feilmelding og refresh', async () => {
        await expect(page.getByText(OOPS_ERROR)).toBeVisible({ timeout: 10_000 })
        await expect(page.getByText(BACK_TO_LIST)).toBeHidden()
        await page.getByText(REFRESH_PAGE).click()
        await expect(page).toHaveURL(new RegExp(`${soknadId}/1`))
        await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()
    })
}

async function forventOopsOgTilbakeTilListen(page: Page) {
    await test.step('Validate error message and go back to list', async () => {
        await expect(page.getByText(OOPS_ERROR)).toBeVisible({ timeout: 10_000 })
        await expect(page.getByText(REFRESH_PAGE)).toBeHidden()
        await page.getByText(BACK_TO_LIST).click()
        await expect(page).toHaveURL(/\/syk\/sykepengesoknad/)
        await harSoknaderlisteHeading(page)
    })
}

test.describe('Tester feilsituasjoner', () => {
    test.describe('SPORSMAL_FINNES_IKKE_I_SOKNAD', () => {
        const testpersonQuery = '?testperson=integrasjon-soknader'
        const soknad = soknadSomTriggerSporsmalFinnesIkkeISoknad

        test('Feil fra backend gir refresh-mulighet', async ({ page }) => {
            await test.step('Gå til søknad og trigger feil', async () => {
                await gaTilListeOgApneSoknad(page, '/syk/sykepengesoknad' + testpersonQuery, soknad.id)
                await checkViStolerPaDeg(page)
            })
            await forventOopsOgRefresh(page, soknad.id)
        })
    })

    test.describe('FEIL_STATUS_FOR_OPPDATER_SPORSMAL', () => {
        const testpersonQuery = '?testperson=integrasjon-soknader'
        const soknad = soknadSomTriggerFeilStatusForOppdaterSporsmal

        test('Feil fra backend gir refresh-mulighet', async ({ page }) => {
            await gaTilListeOgApneSoknad(page, '/syk/sykepengesoknad' + testpersonQuery, soknad.id)
            await checkViStolerPaDeg(page)

            await forventOopsOgRefresh(page, soknad.id)
        })
    })

    test.describe('401 ved oppdatersporsmal', () => {
        const testpersonQuery = '?testperson=integrasjon-soknader'
        const soknad = soknadSomTrigger401ForOppdaterSporsmal

        test('401 gjør appen en refresh', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/1${testpersonQuery}`)
            await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()

            const checkbox = page.locator('[data-cy="bekreftCheckboksPanel"]')
            await expect(checkbox).not.toBeChecked()

            await checkViStolerPaDeg(page)
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))
            await expect(page.locator('form')).not.toContainText(OOPS_ERROR)
            await expect(checkbox).not.toBeChecked()
        })
    })

    test.describe('400 ved send søknad', () => {
        const testpersonQuery = '?testperson=http-400-ved-send-soknad'
        const soknadId = '9157b65a-0372-4657-864c-195037349df5'

        test('400 gir feilmelding og refresh-mulighet', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/2${testpersonQuery}`)
            await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page, true)
            await page.getByRole('button', { name: SEND_SOKNADEN }).click()
            const lastSidePaNyttKnapp = page.getByText(
                'Vi har lagret dine svar, men du må laste inn siden på nytt før du kan sende søknaden. Klikk her for å laste inn siden på nytt.',
            )
            await expect(lastSidePaNyttKnapp).toBeVisible({ timeout: 10_000 })
            await lastSidePaNyttKnapp.click()
            await expect(page).toHaveURL(
                new RegExp(`/syk/sykepengesoknad/soknader/${soknadId}/1\\?testperson=http-400-ved-send-soknad`),
            )
            await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()
        })
    })

    test.describe('403 ved GET av en annen persons søknad', () => {
        const testpersonQuery = '?testperson=http-403-ved-get-soknad'

        test('403 gir alert og knapp for å gå tilbake til listen', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad${testpersonQuery}`)
            await harSoknaderlisteHeading(page)

            await page.getByRole('link').first().click()
            await expect(page).toHaveURL(/3fa85f64-5717-4562-b3fc-2c963f67afa3\/1/)

            await forventOopsOgTilbakeTilListen(page)
        })
    })

    test.describe('404 ved PUT av søknad som ble klippet bort mens brukeren svarte på den', () => {
        const testpersonQuery = '?testperson=http-404-ved-put-soknad'
        const soknadId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        test('404 gir alert og knapp for å gå tilbake til listen', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/2${testpersonQuery}`)
            await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page, true)
            await forventOopsOgTilbakeTilListen(page)
        })
    })

    test.describe('404 ved GET av søknad som ble klippet bort mens brukeren svarte på den', () => {
        const testpersonQuery = '?testperson=http-404-ved-put-soknad'

        test('404 gir alert og knapp for å gå tilbake til listen', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad${testpersonQuery}`)
            await harSoknaderlisteHeading(page)

            await page.getByRole('link').nth(1).click()
            await expect(page).toHaveURL(/5a7d403b-df78-491e-86f0-bf3f25408765\/1/)

            await forventOopsOgTilbakeTilListen(page)
        })
    })

    test.describe('500 ved send søknad', () => {
        const testpersonQuery = '?testperson=http-500-ved-send-soknad'
        const soknadId = '2a9196c7-306f-4b4f-afdc-891d8a564e42'

        test('500 gir feilmelding og refresh-mulighet', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/2${testpersonQuery}`)
            await expect(page.getByRole('heading', { name: SOKNAD_OM_SYKEPENGER })).toBeVisible()

            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page, true)
            await page.getByRole('button', { name: SEND_SOKNADEN }).click()
            await expect(page.getByText('Klikk her for å laste inn siden på nytt og prøv igjen.')).toBeVisible({
                timeout: 10_000,
            })
            await expect(page).toHaveURL(
                new RegExp(`/syk/sykepengesoknad/soknader/${soknadId}/3\\?testperson=http-500-ved-send-soknad`),
            )
        })
    })
})
