import { expect, Page } from '@playwright/test'

import { test } from './utils/fixtures'
import { checkViStolerPaDeg, harSynligTekst, harSynligTittel, klikkGaVidere, neiOgVidere } from './utils/utilities'

export async function sendSoknad(page: Page) {
    await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
    await page.getByRole('button', { name: 'Send søknaden' }).click()
    await harSynligTekst(page, 'Søknaden er sendt til NAV')
}

test.describe('Selvstendig næringsdrivende - Virksomheten din', () => {
    const baseUrl = '/syk/sykepengesoknad/soknader/ffa7c5d2-4766-4450-a521-3ecc5842d015'
    const testperson: string = 'selvstendig-naringsdrivende-virksomheten-din'

    const goToPage = async function (page: Page, pageNumber: number) {
        await page.goto(`${baseUrl}/${pageNumber}?testperson=${testperson}`)
    }

    test.beforeEach(async ({ page }) => {
        await goToPage(page, 1)
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
        await neiOgVidere(page, ['Inntekt mens du var sykmeldt'])
        await neiOgVidere(page, ['Andre inntektskilder'])
        await neiOgVidere(page, ['Reise utenfor EU/EØS'])
        await neiOgVidere(page, ['Opphold i utlandet'])
        await neiOgVidere(page, ['Virksomheten din'])
        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])
        await sendSoknad(page)
    })

    test('Opprettholdt inntekt', async ({ page }) => {
        await goToPage(page, 5)
        await harSynligTittel(page, 'Inntekt mens du var sykmeldt', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(page, 'Hvis du har hatt næringsinntekt mens du har vært sykmeldt')

        await page.getByRole('radio', { name: 'Ja' }).click()
        await harSynligTekst(
            page,
            'Det kan være vi trenger mer dokumentasjon på dette. Da vil en saksbehandler ta kontakt med deg.',
        )

        await klikkGaVidere(page)

        await neiOgVidere(page, ['Andre inntektskilder'])
        await neiOgVidere(page, ['Reise utenfor EU/EØS'])
        await neiOgVidere(page, ['Opphold i utlandet'])
        await neiOgVidere(page, ['Virksomheten din'])
        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])
        await sendSoknad(page)

        await harSynligTekst(
            page,
            'Har du vært i utlandet i løpet av de siste 12 månedene før du ble sykmeldt 1.mai 2025?',
        )
    })

    test('Opphold i utlandet', async ({ page }) => {
        await goToPage(page, 8)
        await harSynligTittel(page, 'Opphold i utlandet', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(page, 'For å ha rett til sykepenger, må du være medlem i folketrygden.')

        await page.getByRole('radio', { name: 'Ja' }).click()

        await klikkGaVidere(page)

        await neiOgVidere(page, ['Virksomheten din'])
        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])
        await sendSoknad(page)

        await harSynligTekst(
            page,
            'Har du vært i utlandet i løpet av de siste 12 månedene før du ble sykmeldt 1.mai 2025?',
        )
    })

    test('Virksomheten din avviklet ja svar', async ({ page }) => {
        await goToPage(page, 9)
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

        await sendSoknad(page)

        await harSynligTekst(page, 'Når avviklet du virksomheten din?')
        await harSynligTekst(page, '01.01.2025')
    })

    test('Virksomheten din avviklet nei svar', async ({ page }) => {
        await goToPage(page, 9)
        await harSynligTittel(page, 'Virksomheten din', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Hvis du avviklet virksomheten din før du ble sykmeldt, har du ikke rett til sykepenger som selvstendig næringsdrivende',
        )

        await page.getByRole('radio', { name: 'Nei' }).click()
        await klikkGaVidere(page)

        await neiOgVidere(page, ['Ny i arbeidslivet'])
        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])

        await sendSoknad(page)
    })

    test('Ny i arbeidslivet ja svar', async ({ page }) => {
        await goToPage(page, 10)
        await harSynligTittel(page, 'Ny i arbeidslivet', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Hvis du har blitt yrkesaktiv innenfor perioden over, skal sykepengene dine fastsettes ved skjønn.',
        )

        await page.getByRole('radio', { name: 'Ja' }).click()
        await harSynligTekst(page, 'Når ble du yrkesaktiv?')

        const dateInput = page.getByLabel('Når ble du yrkesaktiv?')
        await dateInput.fill('01.02.2025')
        await klikkGaVidere(page)

        await sendSoknad(page)

        await harSynligTekst(page, 'Vi trenger følgende dokumenter')
        await harSynligTekst(page, 'Skattemelding/Næringsspesifikasjon hvis den er klar')
        await harSynligTekst(page, 'Gå til opplasting av dokumentasjon')

        await harSynligTekst(page, 'Når ble du yrkesaktiv?')
        await harSynligTekst(page, '01.02.2025')
    })

    test('Ny i arbeidslivet nei svar', async ({ page }) => {
        await goToPage(page, 10)
        await harSynligTittel(page, 'Ny i arbeidslivet', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Hvis du har blitt yrkesaktiv innenfor perioden over, skal sykepengene dine fastsettes ved skjønn.',
        )

        await page.getByRole('radio', { name: 'Nei' }).click()
        await klikkGaVidere(page)

        await neiOgVidere(page, ['Endringer i arbeidsituasjonen din'])

        await sendSoknad(page)
    })

    test('Endringer i arbeidssituasjonen din', async ({ page }) => {
        await goToPage(page, 11)
        await harSynligTittel(page, 'Endringer i arbeidsituasjonen din', 2)

        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await harSynligTekst(
            page,
            'Har det skjedd en varig endring i arbeidssituasjonen din mellom 1.januar 2020 og frem til du ble sykmeldt 1.mai 2025?',
        )

        await page.getByRole('radio', { name: 'Ja' }).click()
        await harSynligTekst(page, 'Hvilken varig endring har skjedd?')
        await harSynligTekst(page, 'Du kan velge et eller flere alternativer')
        await harSynligTekst(page, 'Vi skjønner at det kan være vanskelig å svare nøyaktig, men svar så godt du kan.')

        await klikkGaVidere(page, true)

        await expect(page.locator('p.navds-error-message', { hasText: 'Du må velge et alternativ' })).toBeVisible()
        await expect(page.locator('p.navds-error-message', { hasText: 'Datoen følger ikke formatet' })).toBeVisible()

        await expect(page.getByText('Det er 2 feil i skjemaet')).toBeVisible()
        await expect(page.getByRole('link', { name: 'Du må svare på hvilken endring som har skjedd' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Datoen følger ikke formatet' })).toBeVisible()

        await page.getByRole('checkbox', { name: 'Jobbet mindre i en virksomhet' }).click()
        await page.getByRole('checkbox', { name: 'Endret kundegrunnlag' }).click()

        await harSynligTekst(
            page,
            'Det kan være vi trenger mer dokumentasjon på dette. Da vil en saksbehandler ta kontakt med deg.',
        )

        const monthInput = page.getByLabel('Når skjedde endringen?')
        await monthInput.fill('abc 2024')
        await klikkGaVidere(page, true)
        await expect(page.getByRole('link', { name: 'Datoen følger ikke formatet' })).toBeVisible()

        await monthInput.fill('januar 2026')
        await klikkGaVidere(page, true)
        await expect(page.getByRole('link', { name: 'Datoen kan ikke være etter' })).toBeVisible()

        await monthInput.fill('januar 2017')
        await klikkGaVidere(page, true)
        await expect(page.getByRole('link', { name: 'Datoen kan ikke være før' })).toBeVisible()

        await monthInput.fill('januar 2024')

        await klikkGaVidere(page)

        await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
        await harSynligTekst(page, 'Når skjedde endringen?')
        await harSynligTekst(page, 'januar 2024')

        await sendSoknad(page)

        await harSynligTekst(page, 'Når skjedde endringen?')
        await harSynligTekst(page, 'januar 2024')
        await harSynligTekst(page, 'Jobbet mindre i en virksomhet')
        await harSynligTekst(page, 'Endret kundegrunnlag')
    })
})
