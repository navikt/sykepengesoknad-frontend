import { test, expect } from './utils/fixtures'
import {
    checkViStolerPaDeg,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    setPeriodeFraTil,
    klikkGaVidere,
    harSynligTittel,
    neiOgVidere,
    harSynligTekst,
} from './utils/utilities'

test.describe('Tester korrigering av ferie', () => {
    const soknadId = '5b769c04-e171-47c9-b79b-23ab8fce331e'
    const testpersonQuery = '?testperson=arbeidstaker-gradert'
    const baseUrl = `/syk/sykepengesoknad/soknader/${soknadId}${testpersonQuery}`

    test('Sender inn søknad med ja på ferie spørsmålet', async ({ page }) => {
        test.setTimeout(60_000)
        await test.step('Starter søknad og svarer nei på første spørsmål', async () => {
            await page.goto(baseUrl)
            await checkViStolerPaDeg(page)
            await harSynligTittel(page, 'Tilbake i fullt arbeid', 2)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Svarer nei på ferie, så ja og fyller periode', async () => {
            await harSynligTittel(page, 'Ferie', 2)
            await svarNeiHovedsporsmal(page)
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await harSynligTekst(page, 'Når tok du ut feriedager?')
            //TODO Forstå denne:
            // await expect(page.locator('.aksel-alert').filter({ hasText: 'ferie' })).toBeHidden()
            await klikkGaVidere(page)
        })

        await test.step('Besvarer resten av søknaden med nei', async () => {
            await neiOgVidere(page, [
                'Permisjon',
                'Arbeid mens du var syk',
                'Arbeid utenfor Norge',
                'Andre inntektskilder',
                'Reise utenfor EU/EØS',
            ])
            await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Starter korrigering', async () => {
            await page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()
            await page.getByRole('button', { name: 'Ok' }).click()
        })

        await test.step('Endrer ferie fra NEI til JA', async () => {
            await checkViStolerPaDeg(page)
            await harSynligTittel(page, 'Tilbake i fullt arbeid', 2)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
            await harSynligTittel(page, 'Ferie', 2, true)
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når tok du ut feriedager?')
            await expect(
                page.getByText(
                    'Du kan dra på ferie mens du er sykmeldt, men du får ikke utbetalt sykepenger når du har ferie.',
                    { exact: true },
                ),
            ).toBeVisible()
        })
    })
})
