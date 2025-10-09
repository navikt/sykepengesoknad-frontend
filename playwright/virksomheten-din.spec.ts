import { expect, Page } from '@playwright/test'

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

    test('Valider førsteside', async ({ page }) => {
        await harSynligTittel(page, 'Søknad om sykepenger', 1)
        await harSynligTittel(page, 'Før du søker', 2)
    })

    test('Rekkefølge på spørsmål i søknaden', async ({ page }) => {
        await checkViStolerPaDeg(page)
        await neiOgVidere(page, ['Fravær før du ble sykmeldt'])
        await neiOgVidere(page, ['Tilbake i fullt arbeid'])
        await neiOgVidere(page, ['Jobb underveis i sykefraværet'])
        await neiOgVidere(page, ['Andre inntektskilder'])
        await neiOgVidere(page, ['Reise utenfor EU/EØS'])
        await neiOgVidere(page, ['Arbeid utenfor Norge'])
        await neiOgVidere(page, ['Virksomheten din'])
        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])
        await sendSoknad(page)
    })

    test('Virksomheten din', async ({ page }) => {
        await goToPage(page, 8)
        await harSynligTittel(page, 'Virksomheten din', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Hvis du avviklet virksomheten din før du ble sykmeldt, har du ikke rett til sykepenger som selvstendig næringsdrivende',
        )

        await page.getByRole('radio', { name: 'Ja' }).click()

        await klikkGaVidere(page, true)

        await expect(
            page.locator('p.navds-error-message', { hasText: 'Datoen følger ikke formatet dd.mm.åååå' }),
        ).toBeVisible()

        await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
        await expect(page.getByRole('link', { name: 'Datoen følger ikke formatet dd.mm.åååå' })).toBeVisible()

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
        await goToPage(page, 9)
        await harSynligTittel(page, 'Ny i arbeidslivet', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Nav bruker vanligvis gjennomsnittet av den pensjonsgivende inntekten din for de siste 3 årene før du ble syk for å beregne hvor mye sykepenger du kan få.',
        )

        await page.getByRole('radio', { name: 'Ja' }).click()
        await harSynligTekst(page, 'Når ble du yrkesaktiv?')

        const dateInput = page.getByLabel('Når ble du yrkesaktiv?')
        await dateInput.fill('01.02.2025')
        await klikkGaVidere(page)

        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])

        await sendSoknad(page)

        await harSynligTekst(page, 'Når ble du yrkesaktiv?')
        await harSynligTekst(page, '01.02.2025')
    })

    test('Endringer i arbeidssituasjonen din', async ({ page }) => {
        await goToPage(page, 10)
        await harSynligTittel(page, 'Endringer i arbeidsituasjonen din', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Har det skjedd en varig endring i virksomheten eller arbeidssituasjonen din mellom 1.mars 2025 og frem til du ble sykmeldt 1.mai 2025?',
        )

        await page.getByRole('radio', { name: 'Ja' }).click()
        await harSynligTekst(page, 'Hvilken varig endring har skjedd?')
        await harSynligTekst(page, 'Du kan velge et eller flere alternativer')
        await harSynligTekst(page, 'Vi skjønner at det kan være vanskelig å svare nøyaktig, men svar så godt du kan.')

        await klikkGaVidere(page, true)

        await expect(page.locator('p.navds-error-message', { hasText: 'Du må velge et alternativ' })).toBeVisible()
        await expect(
            page.locator('p.navds-error-message', { hasText: 'Datoen følger ikke formatet dd.mm.åååå' }),
        ).toBeVisible()

        await expect(page.getByText('Det er 2 feil i skjemaet')).toBeVisible()
        await expect(page.getByRole('link', { name: 'Du må svare på hvilken endring som har skjedd' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Datoen følger ikke formatet dd.mm.åååå' })).toBeVisible()

        await page.getByRole('checkbox', { name: 'Jobbet mindre i virksomheten' }).click()
        await page.getByRole('checkbox', { name: 'Endring i kundegrunnlag' }).click()

        const monthInput = page.getByLabel('Når skjedde endringen?')
        await monthInput.fill('januar 2024')

        await harSynligTekst(
            page,
            'Det kan være vi trenger mer dokumentasjon på dette. Da vil en saksbehandler ta kontakt med deg.',
        )

        await klikkGaVidere(page)

        await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
        await harSynligTekst(page, 'Når skjedde endringen?')
        await harSynligTekst(page, 'januar 2024')

        await sendSoknad(page)

        await harSynligTekst(page, 'Når skjedde endringen?')
        await harSynligTekst(page, 'januar 2024')
        await harSynligTekst(page, 'Jobbet mindre i virksomheten')
        await harSynligTekst(page, 'Endring i kundegrunnlag')
    })
})
