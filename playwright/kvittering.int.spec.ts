import {
    arbeidsledigKvittering,
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdKvittering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdKvittering,
    selvstendigKvittering,
    sendtArbeidsledigKvittering,
} from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './utils/fixtures'
import {
    checkViStolerPaDeg,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    klikkGaVidere,
    setPeriodeFraTil,
    svarCombobox,
    sjekkMainContentFokus,
    trykkPaSoknadMedId,
    harSynligTittel,
    harSynligTekst,
} from './utils/utilities'

test.describe('Kvittering integrasjon', () => {
    test('Arbeidsledig - nylig sendt', async ({ page }) => {
        await test.step('Sender arbeidsledig søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidsledigKvittering.id)
            await checkViStolerPaDeg(page)
            await svarJaHovedsporsmal(page)
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`/kvittering/${arbeidsledigKvittering.id}`))
            await harSynligTekst(page, 'Mottatt:')
            await harSynligTittel(page, 'Hva skjer videre?', 2)
            await harSynligTittel(page, 'Nav behandler søknaden din', 3)
            await harSynligTekst(page, 'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon')
            await harSynligTittel(page, 'Når blir pengene utbetalt?', 3)
            await harSynligTekst(page, 'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidsledig - etter 30 dager', async ({ page }) => {
        await test.step('Åpner sendt søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await page
                .getByRole('region', { name: 'Tidligere søknader' })
                .locator(`a[href*="${sendtArbeidsledigKvittering.id}"]`)
                .click()
        })

        await test.step('Verifiserer sendt-detaljer', async () => {
            await harSynligTittel(page, 'Søknaden er sendt', 2)
            await expect(page).toHaveURL(new RegExp(`/sendt/${sendtArbeidsledigKvittering.id}`))
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Utland - nylig sendt', async ({ page }) => {
        await test.step('Sender utland søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await page
                .getByRole('region', { name: 'Nye søknader' })
                .getByRole('link', { name: /beholde sykepenger utenfor EU\/EØS/ })
                .click()
            await page.getByRole('button', { name: 'Start søknaden' }).click()
            await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
            await klikkGaVidere(page)
            await setPeriodeFraTil(page, 14, 22)
            await klikkGaVidere(page)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Verifiserer utland kvittering', async () => {
            await harSynligTittel(page, 'Hva skjer videre?', 2)
            await harSynligTittel(page, 'Du får svar på om du kan reise', 3)
            await harSynligTekst(
                page,
                'Nav vurderer om reisen vil forlenge sykefraværet ditt eller hindre planlagte aktiviteter.',
            )

            await harSynligTittel(page, 'Risiko ved å reise før du har mottatt svar', 3)
            await harSynligTekst(page, 'Du kan risikere at sykepengene stanses i perioden du er på reise.')
            await harSynligTekst(page, 'Sykepengene kan beregnes etter et lavere grunnlag når du er tilbake.')
            await harSynligTekst(page, 'Du kan få avslag på videre sykepenger hvis reisen varer fire uker eller mer.')

            await expect(page.getByRole('link', { name: 'Les mer om sykepenger når du er på reise' })).toBeVisible()
            await harSynligTittel(page, 'Du søker om sykepenger', 3)
            await harSynligTekst(page, 'Etter at sykefraværsperioden er over, søker du om sykepenger på vanlig måte.')

            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toHaveCount(0)
            await expect(page.getByText('Jeg vil sende en kopi av søknaden til arbeidsgiveren min')).toHaveCount(0)
        })
    })

    test('Selvstendig - nylig sendt', async ({ page }) => {
        await test.step('Sender selvstendig søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, selvstendigKvittering.id)
            await checkViStolerPaDeg(page)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Verifiserer selvstendig kvittering', async () => {
            await harSynligTittel(page, 'Søknaden er sendt', 2)
            await harSynligTittel(page, 'Hva skjer videre?', 2)
            await harSynligTittel(page, 'Nav behandler søknaden din', 3)
            await harSynligTekst(page, 'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon')
            await expect(page).toHaveURL(new RegExp(`/kvittering/${selvstendigKvittering.id}`))

            await harSynligTittel(page, 'Når blir pengene utbetalt?', 3)
            await harSynligTekst(page, 'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
            await expect(page.getByText('Jeg vil sende en kopi av søknaden til arbeidsgiveren min')).toHaveCount(0)
        })
    })

    // Arbeidstaker-scenarier
    async function besvarSoknad(page: any) {
        await checkViStolerPaDeg(page)
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await sjekkMainContentFokus(page)
        await expect(page.getByRole('main')).toBeVisible()
    }

    test('Arbeidstaker - innenfor arbeidsgiverperiode', async ({ page }) => {
        await test.step('Sender søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerInnenforArbeidsgiverperiodeKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(
                new RegExp(`/kvittering/${arbeidstakerInnenforArbeidsgiverperiodeKvittering.id}`),
            )
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Du får sykepengene fra arbeidsgiveren din')
            await expect(panel).toContainText('Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidstaker - utenfor arbeidsgiverperiode', async ({ page }) => {
        await test.step('Sender søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerUtenforArbeidsgiverperiodeKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(
                new RegExp(`/kvittering/${arbeidstakerUtenforArbeidsgiverperiodeKvittering.id}`),
            )
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText(
                'For å behandle søknaden trenger vi en inntektsmelding fra arbeidsgiveren din',
            )
            await expect(panel).toContainText('Nav behandler søknaden')
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidstaker - delt periode og første utenfor arbeidsgiverperiode', async ({ page }) => {
        await test.step('Sender søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(
                new RegExp(`/kvittering/${arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id}`),
            )
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Nav ber arbeidsgiveren din om inntektsmelding')
            await expect(panel).toContainText(
                'For å behandle søknaden trenger vi en inntektsmelding fra arbeidsgiveren din',
            )
            await expect(panel).toContainText('Nav behandler søknaden')
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidstaker - oppfølgende periode uten opphold og første utenfor arbeidsgiverperiode', async ({ page }) => {
        await test.step('Sender søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(
                new RegExp(`/kvittering/${arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}`),
            )
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Nav ber arbeidsgiveren din om inntektsmelding')
            await expect(panel).toContainText(
                'For å behandle søknaden trenger vi en inntektsmelding fra arbeidsgiveren din',
            )
            await expect(panel).toContainText('Nav behandler søknaden')
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidstaker - oppfølgende periode uten opphold', async ({ page }) => {
        await test.step('Sender søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerUtenOppholdKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Nav behandler søknaden')
            await expect(panel).toContainText(
                'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon',
            )
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Jeg vil sende en kopi av søknaden' })).toBeVisible()
        })
    })

    test('Arbeidstaker - oppfølgende periode 16 eller mindre dager og første utenfor arbeidsgiverperiode', async ({
        page,
    }) => {
        await test.step('Sender søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(
                new RegExp(`/kvittering/${arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}`),
            )
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Nav ber arbeidsgiveren din om inntektsmelding')
            await expect(panel).toContainText(
                'For å behandle søknaden trenger vi en inntektsmelding fra arbeidsgiveren din',
            )
            await expect(panel).toContainText('Nav behandler søknaden')
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidstaker - oppfølgende periode 16 eller mindre dager', async ({ page }) => {
        await test.step('Sender søknad', async () => {
            await page.context().clearCookies()
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await trykkPaSoknadMedId(page, arbeidstakerMedOppholdKvittering.id)
            await besvarSoknad(page)
        })

        await test.step('Verifiserer kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`/kvittering/${arbeidstakerMedOppholdKvittering.id}`))
            const panel = page.getByRole('main')
            await expect(panel).toContainText('Viktig informasjon')
            await expect(panel).toContainText('Før Nav kan behandle søknaden')
            await expect(panel).toContainText('Nav behandler søknaden')
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Jeg vil sende en kopi av søknaden' })).toBeVisible()
        })
    })
})
