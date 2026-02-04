import { Page } from '@playwright/test'

import { test } from './utils/fixtures'
import {
    checkViStolerPaDeg,
    harSynligTekst,
    harSynligTittel,
    klikkGaVidere,
    neiOgVidere,
    svarRadioGruppe,
} from './utils/utilities'

test.describe('Friskmeldt til arbeidsformidling', () => {
    const nyFriskmeldtSoknad =
        'http://localhost:3000/syk/sykepengesoknad/soknader/7e89c042-a822-40e6-bb4c-d04fe5f12685/1?testperson=fta-en-ny'

    test.beforeEach(async ({ page }) => {
        await page.goto(nyFriskmeldtSoknad)
    })

    test('Har egen introside', async ({ page }) => {
        await harSynligTittel(page, 'Søknad om sykepenger', 1)
        await harSynligTittel(page, 'Før du søker', 2)
        await harSynligTekst(
            page,
            /Med friskmelding til arbeidsformidling kan du få sykepenger mens du ser etter ny jobb/i,
        )
        await page.getByRole('button', { name: 'For deg som studerer' }).click()
        await harSynligTekst(page, /I utgangspunktet får du ikke sykepenger mens du studerer/i)
    })

    test('Jobbsituasjonen din - Ja - Ja', async ({ page }) => {
        await checkViStolerPaDeg(page)

        await harSynligTittel(page, 'Jobbsituasjonen din', 2)
        await svarRadioGruppe(page, /Begynte du i ny jobb i perioden/i, 'Ja')
        await svarRadioGruppe(page, /Vil du fortsatt være friskmeldt til arbeidsformidling?/i, 'Ja')
        await page.getByRole('textbox', { name: 'Når begynte du i ny jobb?' }).fill('08.04.2025')
        await fullforSoknad(page)
        await harSynligTekst(page, /Du er friskmeldt til arbeidsformidling frem til 11. mai 2025./i)
    })

    test('Jobbsituasjonen din - Ja - Nei', async ({ page }) => {
        await checkViStolerPaDeg(page)

        await harSynligTittel(page, 'Jobbsituasjonen din', 2)
        await svarRadioGruppe(page, /Begynte du i ny jobb i perioden/i, 'Ja')
        await svarRadioGruppe(page, /Vil du fortsatt være friskmeldt til arbeidsformidling?/i, 'Nei')
        await page.getByRole('textbox', { name: 'Når begynte du i ny jobb?' }).fill('08.04.2025')

        await harSynligTekst(
            page,
            /Du har svart at du har begynt i ny jobb og dermed ikke vil være friskmeldt til arbeidsformidling fra og med 8. april 2025./i,
        )
        await harSynligTekst(page, /Da stanser vi sykepengene dine fra og med denne datoen./i)
        await fullforSoknad(page)
        await harSynligTekst(page, /Du har nå sendt inn den siste søknaden for friskmeldt til arbeidsformidling./i)
        await harSynligTekst(page, /Fra og med 8. april 2025 stanser vi sykepengene dine./i)
    })

    test('Jobbsituasjonen din - Nei - Nei', async ({ page }) => {
        await checkViStolerPaDeg(page)

        await harSynligTittel(page, 'Jobbsituasjonen din', 2)
        await svarRadioGruppe(page, /Begynte du i ny jobb i perioden/i, 'Nei')
        await svarRadioGruppe(page, /Vil du fortsatt være friskmeldt til arbeidsformidling?/i, 'Nei')
        await page
            .getByRole('textbox', {
                name: 'Fra hvilken dato vil du ikke lenger være friskmeldt til arbeidsformidling?',
            })
            .fill('08.04.2025')

        await harSynligTekst(
            page,
            /Du har svart at du ikke vil være friskmeldt til arbeidsformidling fra og med 8. april 2025./i,
        )
        await harSynligTekst(page, /Da stanser vi sykepengene dine fra og med denne datoen./i)

        await fullforSoknad(page)
        await harSynligTekst(page, /Du har nå sendt inn den siste søknaden for friskmeldt til arbeidsformidling./i)
        await harSynligTekst(page, /Fra og med 8. april 2025 stanser vi sykepengene dine./i)
    })

    test('Jobbsituasjonen din - Nei - Ja', async ({ page }) => {
        await checkViStolerPaDeg(page)

        await harSynligTittel(page, 'Jobbsituasjonen din', 2)
        await svarRadioGruppe(page, /Begynte du i ny jobb i perioden/i, 'Nei')
        await svarRadioGruppe(page, /Vil du fortsatt være friskmeldt til arbeidsformidling?/i, 'Ja')

        await fullforSoknad(page)
        await harSynligTekst(page, /Du er friskmeldt til arbeidsformidling frem til 11. mai 2025./i)
    })

    test('Siste søknad', async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepengesoknad/soknader/ac0ff5c0-e6bc-416d-b5d9-dfa3654e9f26/1?testperson=fta-siste',
        )
        await checkViStolerPaDeg(page)
        await neiOgVidere(page, ['Jobbsituasjonen din', 'Inntekt underveis', 'Reise utenfor EU/EØS'])

        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await harSynligTittel(page, 'Søknaden er sendt til NAV', 2)
        await harSynligTekst(page, /Du har nå sendt inn den siste søknaden for friskmeldt til arbeidsformidling./i)
        await harSynligTekst(page, /Fra og med 13. april 2025 stanser vi sykepengene dine./i)
    })

    async function fullforSoknad(page: Page) {
        await klikkGaVidere(page)
        await neiOgVidere(page, ['Inntekt underveis', 'Reise utenfor EU/EØS'])
        await harSynligTittel(page, 'Oppsummering', 2)
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await harSynligTittel(page, 'Søknaden er sendt til NAV', 2)
    }
})
