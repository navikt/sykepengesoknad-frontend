import { test, expect } from '@playwright/test'

import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'

import {
    checkViStolerPaDeg,
    klikkGaVidere,
    setPeriodeFraTil,
    sjekkIntroside,
    sporsmalOgSvar,
    harSoknaderlisteHeading,
    trykkPaSoknadMedId,
    svarFritekst,
} from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

const soknadId = arbeidstaker.id

test.describe('Tester arbeidstakersøknad - 100%', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad')
    })
    test('Full søknadsflyt', async ({ page }) => {
        await test.step('Laster startside', async () => {
            await harSoknaderlisteHeading(page)
            await trykkPaSoknadMedId(page, soknadId)
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await expect(page.getByRole('heading', { name: 'Før du søker' })).toBeVisible()
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/1`))

            await sjekkIntroside(page)

            await expect(
                page.getByText(
                    'Siden sykemeldingen går over 31 dager, har vi delt opp søknaden, slik at du kan søke om sykepenger før hele perioden er ferdig. På den måten slipper du å vente lenge på sykepengene dine.',
                ),
            ).toBeVisible()

            await page.getByText('Slik behandler NAV personopplysningene dine').click()

            await page.getByRole('button', { name: 'Jeg vil slette denne søknaden' }).click()
            await page.getByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()

            await page.getByText('Start søknad').click()
            await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
            await expect(page.locator('.navds-confirmation-panel__inner')).toBeVisible()
            await expect(page.getByText('Du må bekrefte at du vil svare så riktig du kan')).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())

            await checkViStolerPaDeg(page)
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/2`))

            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuenow', '1')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuemax', '7')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuetext', '1 av 7')

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()

            await page.locator('.navds-date__field-button').click()
            await page.locator('.rdp-day').filter({ hasText: '20' }).click()

            await expect(
                page.getByText(
                    'Svaret ditt betyr at du har vært i fullt arbeid fra 20. – 24. april 2020. Du får ikke utbetalt sykepenger for denne perioden',
                ),
            ).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Søknad TILBAKE_I_ARBEID går videre', async () => {
            await klikkGaVidere(page)
        })

        await test.step('Søknad FERIE_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/3`))

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()

            await setPeriodeFraTil(page, 16, 23)

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/4`))

            await expect(page.getByText('Spørsmålet forklart')).toBeVisible()
            await expect(
                page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom'),
            ).toBeHidden()
            await page.getByText('Spørsmålet forklart').click()
            await expect(
                page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom'),
            ).toBeVisible()

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når tok du permisjon?')).toBeVisible()

            await setPeriodeFraTil(page, 14, 22)

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad ARBEID_UNDERVEIS_100_PROSENT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/5`))

            await expect(
                page.getByText(
                    'I perioden 1. - 24. april 2020 var du 100 % sykmeldt fra Posten Norge AS, Bærum. Jobbet du noe hos Posten Norge AS, Bærum i denne perioden?',
                ),
            ).toBeVisible()

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()

            await expect(page.getByText('Oppgi arbeidsmengde i timer eller prosent')).toBeVisible()

            await page.locator('.undersporsmal input[value="Prosent"]').click()
            await expect(
                page.getByText(
                    'Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos Posten Norge AS, Bærum i perioden 1. - 24. april 2020?',
                ),
            ).toBeVisible()

            await page.locator('.undersporsmal input[value="Timer"]').click()
            await expect(
                page.getByText(
                    'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                ),
            ).toBeVisible()
            await expect(page.getByText('Antall timer du skrev inn, betyr at du har jobbet')).toBeHidden()

            await svarFritekst(
                page,
                'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                '21',
            )
            await expect(page.getByText('Er prosenten lavere enn du forventet?')).toBeHidden()

            await expect(
                page.getByText('Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?'),
            ).toBeVisible()
            await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/6`))

            await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()

            const ansattAndreSteder = page
                .getByText('Velg inntektskildene som passer for deg:')
                .locator('..')
                .getByText('Ansatt andre steder enn nevnt over')
                .locator('..')
            await ansattAndreSteder.click()

            const subQuestion = page.getByText(
                'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
            )
            await subQuestion.locator('..').locator('input[type="radio"][value="JA"]').click()

            const selvstendingNaering = page
                .getByText('Velg inntektskildene som passer for deg:')
                .locator('..')
                .getByText('Selvstendig næringsdrivende')
                .locator('..')
            await selvstendingNaering.click()

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/7`))

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når var du utenfor EU/EØS?')).toBeVisible()

            await setPeriodeFraTil(page, 14, 22)

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/8`))

            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuenow', '7')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuemax', '7')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuetext', '7 av 7')

            await expect(
                page
                    .locator('.navds-guide-panel__content')
                    .getByText(
                        'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
                    ),
            ).toBeVisible()

            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')

            await sporsmalOgSvar(oppsummering, 'Søknaden sendes til', 'NAV')
            await expect(oppsummering.getByText('Posten Norge AS, Bærum', { exact: true })).toBeVisible()

            await sporsmalOgSvar(oppsummering, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
            await sporsmalOgSvar(
                oppsummering,
                'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                '21 timer',
            )
            await sporsmalOgSvar(oppsummering, 'Jobber du vanligvis 37,5 timer i uka', 'Ja')

            await sporsmalOgSvar(oppsummering, 'Har du andre inntektskilder enn Butikken?', 'Ja')
            await sporsmalOgSvar(
                oppsummering,
                'Velg inntektskildene som passer for deg:',
                'Ansatt andre steder enn nevnt over',
            )
            await sporsmalOgSvar(
                oppsummering,
                'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
                'Ja',
            )
            await sporsmalOgSvar(
                oppsummering,
                'Velg inntektskildene som passer for deg:',
                'Selvstendig næringsdrivende',
            )

            await expect(page.getByText('Det er 1 feil i skjemaet')).toBeHidden()

            await page.getByRole('link', { name: 'Forrige steg' }).click()
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/7`))
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)

            await page.getByRole('link', { name: 'Endre svar' }).click()
            await expect(page.getByText('Steg 1 av 7')).toBeVisible()
            await page.getByRole('button', { name: 'Vis alle steg' }).click()
            await page.getByRole('link', { name: 'Oppsummering fra søknaden' }).click()
            await expect(page.getByText('Steg 7 av 7')).toBeVisible()

            await page.getByText('Send søknaden').click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`.*\\/kvittering\\/${soknadId}`))

            const kvittering = page.locator('[data-cy="kvittering"]')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Før NAV kan behandle søknaden')
            await expect(kvittering).toContainText('NAV behandler søknaden')
            await expect(kvittering).toContainText('Når blir pengene utbetalt')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
