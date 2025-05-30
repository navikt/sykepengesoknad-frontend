import { Page } from '@playwright/test'

import { test } from './fixtures'
import {
    checkViStolerPaDeg,
    fjernAnimasjoner,
    harSynligTekst,
    harSynligTittel,
    klikkGaVidere,
    neiOgVidere,
} from './utilities'

export async function sendSoknad(page: Page) {
    await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
    await page.getByRole('button', { name: 'Send søknaden' }).click()
    await harSynligTekst(page, 'Søknaden er sendt til NAV')
}

test.describe('Selvstendig næringsdrivende - Virksomheten din', () => {
    const baseUrl = 'http://localhost:3000/syk/sykepengesoknad/soknader/ffa7c5d2-4766-4450-a521-3ecc5842d015'
    const testperson: string = 'selvstendig-naringsdrivende-virksomheten-din'

    const goToPage = async function (page: Page, pageNumber: number) {
        await page.goto(`${baseUrl}/${pageNumber}?testperson=${testperson}`)
    }

    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await goToPage(page, 1)
        await fjernAnimasjoner(page)
    })

    test('Forste', async ({ page }) => {
        await harSynligTittel(page, 'Søknad om sykepenger', 1)
        await harSynligTittel(page, 'Før du søker', 2)
    })

    test('Rekkefølge på spørsmål i søknaden', async ({ page }) => {
        await checkViStolerPaDeg(page)
        await neiOgVidere(page, ['Tilbake i fullt arbeid'])
        await neiOgVidere(page, ['Jobb underveis i sykefraværet'])
        await neiOgVidere(page, ['Andre inntektskilder'])
        await neiOgVidere(page, ['Reise til utlandet'])
        await neiOgVidere(page, ['Arbeid utenfor Norge'])
        await neiOgVidere(page, ['Virksomheten din'])
        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])
        await sendSoknad(page)
    })

    test('Virksomheten din', async ({ page }) => {
        await goToPage(page, 7)
        await harSynligTittel(page, 'Virksomheten din', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Hvis du avviklet virksomheten din før du ble sykmeldt, har du ikke rett til sykepenger som selvstendig næringsdrivende',
        )

        await page.getByRole('radio', { name: 'Ja' }).click()
        await harSynligTekst(page, 'Når avviklet du virksomheten din?')

        const dateInput = page.getByLabel('Når avviklet du virksomheten din?')
        await dateInput.fill('01.01.2025')
        await klikkGaVidere(page)

        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])

        await sendSoknad(page)

        await harSynligTekst(page, 'Når avviklet du virksomheten din?')
        await harSynligTekst(page, '01.01.2025')
    })
    test('Ny i arbeidslivet', async ({ page }) => {
        await goToPage(page, 8)
        await harSynligTittel(page, 'Ny i arbeidslivet', 2)
    })
    test('Endringer i arbeidssituasjonen din', async ({ page }) => {
        await goToPage(page, 9)
        await harSynligTittel(page, 'Endringer i arbeidsituasjonen din', 2)
    })
})
