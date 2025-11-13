import { test, expect } from './utils/fixtures'
import {
    checkViStolerPaDeg,
    klikkGaVidere,
    neiOgVidere,
    svarCombobox,
    svarFritekst,
    svarJaHovedsporsmal,
    harSynligTittel,
    harSynligTekst,
} from './utils/utilities'

test.describe('Tester søknad til utenlandsk sykmelding', () => {
    const id = '3708c4de-d16c-4835-841b-a6716b6d39e9'

    test('Full integrasjon utenlandsk sykmelding', async ({ page }) => {
        await test.step('Gå til ansvarserklæring', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${id}/1?testperson=utenlandsk-sykmelding`)
            await harSynligTittel(page, 'Før du søker', 2)
            await expect(page).toHaveURL(new RegExp(`${id}/1`))
            await expect(page.getByText('Frist for å søke')).toHaveCount(0)
            await checkViStolerPaDeg(page)
        })

        await test.step('Bosted', async () => {
            await harSynligTittel(page, 'Bosted', 2)
            await expect(page).toHaveURL(new RegExp(`${id}/2`))

            await harSynligTekst(page, 'Bor du i utlandet?')
            await klikkGaVidere(page, true)
            await harSynligTekst(page, 'Du må svare på om du bor i utlandet')
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Oppgi utenlandsk kontaktadresse')
            await klikkGaVidere(page, true)

            await expect(page.locator('.navds-error-message').getByText('Du må oppgi et vegnavn')).toBeVisible()
            await expect(page.locator('.navds-error-message').getByText('Du må oppgi et land')).toBeVisible()
            await expect(page.locator('.navds-error-message').getByText('Du må oppgi et telefonnummer')).toBeVisible()
            await svarFritekst(page, 'Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
            await svarFritekst(page, 'Land', 'UK')
            await svarFritekst(page, 'Telefonnummer', '81549300')
            await page.getByRole('button', { name: 'Åpne datovelger' }).click()
            await page.getByRole('gridcell', { name: 'mandag 4' }).click()
            await klikkGaVidere(page)
        })

        await test.step('Lønnet arbeid utenfor Norge', async () => {
            await harSynligTittel(page, 'Lønnet arbeid utenfor Norge', 2)
            await expect(page).toHaveURL(new RegExp(`${id}/3`))

            await harSynligTekst(page, 'Utfører du lønnet arbeid utenfor Norge?')
            await klikkGaVidere(page, true)
            await harSynligTekst(page, 'Du må svare på om du utfører lønnet arbeid utenfor Norge')
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge')
            await klikkGaVidere(page, true)
            await expect(page.getByRole('paragraph').filter({ hasText: 'Du må oppgi nærmere' })).toBeVisible()
            await svarFritekst(
                page,
                'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge',
                'Veldig lang tekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekst',
            )
            await expect(
                page
                    .locator('[data-cy="UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST"]')
                    .locator('..')
                    .locator('..'),
            ).toContainText('Du kan skrive maks 200 tegn')
            await expect(page.locator('[data-cy="feil-oppsumering"]')).toContainText('Du kan skrive maks 200 tegn')
            await svarFritekst(
                page,
                'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge',
                'Statsminister i UK',
            )
            await klikkGaVidere(page)
        })

        await test.step('Sykepenger i andre EØS-land', async () => {
            await harSynligTittel(page, 'Sykepenger i andre EU/EØS-land', 2)
            await expect(page).toHaveURL(new RegExp(`${id}/4`))

            await harSynligTekst(
                page,
                'Har du mottatt sykepenger eller lignende i andre EU/EØS-land i løpet av de siste tre årene?',
            )
            await klikkGaVidere(page, true)

            await harSynligTekst(page, 'Du må svare på om du har mottatt sykepenger eller lignende i andre EU/EØS-land')
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'I hvilket land?')

            await klikkGaVidere(page, true)
            await harSynligTekst(
                page,
                'Du må velge alle andre EU/EØS-land bortsett fra Norge hvor du har mottatt sykepenger eller lignende i løpet av de siste tre årene',
            )
            await svarCombobox(page, 'I hvilket land?', 'Dan', 'Danmark')
            await klikkGaVidere(page)
        })

        await test.step('Svar nei på resten', async () => {
            await neiOgVidere(page, [
                'Tilbake i fullt arbeid',
                'Ferie',
                'Permisjon',
                'Jobb underveis i sykefraværet',
                'Arbeid utenfor Norge',
            ])
            await neiOgVidere(page, ['Andre inntektskilder', 'Reise utenfor EU/EØS'])
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
            await expect(page).toHaveURL(new RegExp(`${id}/12`))

            await harSynligTekst(page, 'Danmark')
            await harSynligTekst(page, 'Statsminister i UK')
            await harSynligTekst(page, 'Downing Street 10')
            await harSynligTekst(page, '81549300')
            await page.getByRole('button', { name: 'Send søknaden' }).click()
            await harSynligTekst(page, 'Søknaden er sendt')
        })
    })
})
