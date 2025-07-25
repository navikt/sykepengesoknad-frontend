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

import { test, expect } from './fixtures'
import {
    checkViStolerPaDeg,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    klikkGaVidere,
    setPeriodeFraTil,
    svarCombobox,
    sjekkMainContentFokus,
    trykkPaSoknadMedId,
} from './utilities'

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
            await expect(page.locator('[data-cy="sendt-nav"]')).toBeVisible()
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toHaveCount(0)
            await expect(page).toHaveURL(new RegExp(`/kvittering/${arbeidsledigKvittering.id}`))
            const panel = page.locator('[data-cy="kvittering-panel"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('NAV behandler søknaden din')
            await expect(panel).toContainText(
                'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon',
            )
            await expect(panel).toContainText('Når blir pengene utbetalt?')
            await expect(panel).toContainText('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Arbeidsledig - etter 30 dager', async ({ page }) => {
        await test.step('Åpner sendt søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await page.locator(`[data-cy="Tidligere søknader"] a[href*="${sendtArbeidsledigKvittering.id}"]`).click()
        })
        await test.step('Verifiserer sendt-detaljer', async () => {
            await expect(
                page.locator('[data-cy="sendt-nav"]').getByText('Mottatt: Torsdag 23. april, kl 11:56'),
            ).toBeVisible()
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toHaveCount(0)
            await expect(page).toHaveURL(new RegExp(`/sendt/${sendtArbeidsledigKvittering.id}`))
            await expect(page.locator('[data-cy="kvittering-panel"]')).toHaveCount(0)
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
        })
    })

    test('Utland - nylig sendt', async ({ page }) => {
        await test.step('Sender utland søknad', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            await page
                .locator('[data-cy="Nye søknader"]')
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
            await expect(page.locator('[data-cy="sendt-nav"]')).toBeVisible()
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toHaveCount(0)
            const panel = page.locator('[data-cy="kvittering-panel"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Du får svar på om du kan reise')
            await expect(panel).toContainText(
                'NAV vurderer om reisen vil forlenge sykefraværet ditt eller hindre planlagte aktiviteter.',
            )
            await expect(panel).toContainText('Risiko ved å reise før du har mottatt svar')
            await expect(panel).toContainText('Du kan risikere at sykepengene stanses i perioden du er på reise.')
            await expect(panel).toContainText('Sykepengene kan beregnes etter et lavere grunnlag når du er tilbake.')
            await expect(panel).toContainText(
                'Du kan få avslag på videre sykepenger hvis reisen varer fire uker eller mer.',
            )
            await expect(panel).toContainText('Les mer om sykepenger når du er på reise.')
            await expect(panel).toContainText('Du søker om sykepenger')
            await expect(panel).toContainText(
                'Etter at sykefraværsperioden er over, søker du om sykepenger på vanlig måte.',
            )
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
            await expect(page.locator('[data-cy="sendt-nav"]')).toBeVisible()
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toHaveCount(0)
            await expect(page).toHaveURL(new RegExp(`/kvittering/${selvstendigKvittering.id}`))
            const panel = page.locator('[data-cy="kvittering-panel"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('NAV behandler søknaden din')
            await expect(panel).toContainText(
                'Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon',
            )
            await expect(panel).toContainText('Når blir pengene utbetalt?')
            await expect(panel).toContainText('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden')
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
        await expect(page.locator('[data-cy="kvittering"]')).toBeVisible()
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
            await expect(page.locator('[data-cy="sendt-nav"]')).toHaveCount(0)
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toBeVisible()
            const panel = page.locator('[data-cy="kvittering"]')
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
            await expect(page.locator('[data-cy="sendt-nav"]')).toBeVisible()
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toBeVisible()
            const panel = page.locator('[data-cy="kvittering"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Før NAV kan behandle søknaden')
            await expect(panel).toContainText('Når sykefraværet ditt er lengre enn 16 kalenderdager')
            await expect(panel).toContainText('NAV behandler søknaden')
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
            const panel = page.locator('[data-cy="kvittering"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Før NAV kan behandle søknaden')
            await expect(panel).toContainText('Når sykefraværet ditt er lengre enn 16 kalenderdager')
            await expect(panel).toContainText('NAV behandler søknaden')
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
            const panel = page.locator('[data-cy="kvittering"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Før NAV kan behandle søknaden')
            await expect(panel).toContainText('Når sykefraværet ditt er lengre enn 16 kalenderdager')
            await expect(panel).toContainText('NAV behandler søknaden')
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
            await expect(page.locator('[data-cy="sendt-nav"]')).toBeVisible()
            await expect(page.locator('[data-cy="sendt-arbeidsgiver"]')).toHaveCount(0)
            const panel = page.locator('[data-cy="kvittering"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('NAV behandler søknaden')
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
            const panel = page.locator('[data-cy="kvittering"]')
            await expect(panel).toContainText('Hva skjer videre?')
            await expect(panel).toContainText('Før NAV kan behandle søknaden')
            await expect(panel).toContainText('NAV behandler søknaden')
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
            const panel = page.locator('[data-cy="kvittering"]')
            await expect(panel).toContainText('Viktig informasjon')
            await expect(panel).toContainText('Før NAV kan behandle søknaden')
            await expect(panel).toContainText('NAV behandler søknaden')
            await expect(panel).toContainText('Når blir pengene utbetalt')
            await expect(page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Jeg vil sende en kopi av søknaden' })).toBeVisible()
        })
    })
})
