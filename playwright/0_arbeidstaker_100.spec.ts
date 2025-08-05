import { test, expect, Page } from '@playwright/test'
import {
    checkViStolerPaDeg,
    klikkGaVidere,
    setPeriodeFraTil,
    sjekkIntroside,
    sporsmalOgSvar,
    svarRadio,
    velgTall,
    harSynligTittel,
} from './utilities'

const fillTextFieldByLabel = async (page: Page, labelText: string, value: string, fallbackSelector?: string) => {
    try {
        await page.getByLabel(labelText).fill(value)
    } catch (error) {
        if (fallbackSelector) {
            await page.locator(fallbackSelector).fill(value)
        } else {
            throw error
        }
    }
}

test.describe('Tester arbeidstakersøknad - 100%', () => {
    test('Full søknadsflyt', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad')

        // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
        // Søknad: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef, fom: 1.4.20, tom: 24.4.20
        const soknadId = 'faba11f5-c4f2-4647-8c8a-58b28ce2f3ef'

        await test.step('Laster startside', async () => {
            // await page.waitForLoadState('load')
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
            await expect(page.getByRole('link', {name: "Søknad om sykepenger"})).toBeVisible()
            await page.locator(`a[href*="${soknadId}"]`).click()
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/1`))

            await sjekkIntroside(page)
            
            await expect(
                page.getByText(
                    'Siden sykemeldingen går over 31 dager, har vi delt opp søknaden, slik at du kan søke om sykepenger før hele perioden er ferdig. På den måten slipper du å vente lenge på sykepengene dine.'
                )
            ).toBeVisible()

            // Personvern erklæring
            await page.getByText('Slik behandler NAV personopplysningene dine').click()

            // Avbryt dialog
            await page.getByText('Jeg vil slette denne søknaden').click()
            await page.getByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()

            // Må godkjenne ANSVARSERKLARING først
            await page.getByText('Start søknad').click()
            await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
            await expect(page.locator('.navds-confirmation-panel__inner')).toBeVisible()
            await expect(page.getByText('Du må bekrefte at du vil svare så riktig du kan')).toBeVisible()
            
            await checkViStolerPaDeg(page)
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/2`))
            
            // Check progress bar
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuenow', '1')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuemax', '7')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuetext', '1 av 7')

            // Answer yes to main question
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()
            
            // Select date
            await page.locator('.navds-date__field-button').click()
            await page.locator('.rdp-day').filter({ hasText: '20' }).click()
            
            await expect(
                page.getByText(
                    'Svaret ditt betyr at du har vært i fullt arbeid fra 20. – 24. april 2020. Du får ikke utbetalt sykepenger for denne perioden'
                )
            ).toBeVisible()
        })

        await test.step('Søknad TILBAKE_I_ARBEID går videre', async () => {
            await klikkGaVidere(page)
        })

        await test.step('Søknad FERIE_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/3`))

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()

            await setPeriodeFraTil(page, 16, 23)
            await klikkGaVidere(page)
        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/4`))

            await expect(page.getByText('Spørsmålet forklart')).toBeVisible()
            await expect(page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom')).toBeHidden()
            await page.getByText('Spørsmålet forklart').click()
            await expect(page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom')).toBeVisible()

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når tok du permisjon?')).toBeVisible()

            await setPeriodeFraTil(page, 14, 22)
            await klikkGaVidere(page)
        })

        await test.step('Søknad ARBEID_UNDERVEIS_100_PROSENT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/5`))

            await expect(
                page.getByText(
                    'I perioden 1. - 24. april 2020 var du 100 % sykmeldt fra Posten Norge AS, Bærum. Jobbet du noe hos Posten Norge AS, Bærum i denne perioden?'
                )
            ).toBeVisible()
            
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()

            // Underspørsmål 1 - arbeidsmengde
            await expect(page.getByText('Oppgi arbeidsmengde i timer eller prosent')).toBeVisible()
            
            // Select prosent first
            await page.locator('.undersporsmal input[value="Prosent"]').click()
            await expect(
                page.getByText(
                    'Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos Posten Norge AS, Bærum i perioden 1. - 24. april 2020?'
                )
            ).toBeVisible()
            await page.locator('.undersporsmal .navds-text-field__input#796cf7ed-8a7e-39de-9cbc-6e789aa5af3f').fill('21')
            
            // Switch to timer
            await page.locator('.undersporsmal input[value="Timer"]').click()
            await expect(
                page.getByText('Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum')
            ).toBeVisible()
            await expect(page.getByText('Antall timer du skrev inn, betyr at du har jobbet')).toBeHidden()
            
            await page.locator('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').fill('21')
            await expect(page.getByText('Er prosenten lavere enn du forventet?')).toBeHidden()

            // Underspørsmål 2 - normal arbeidstid
            await expect(page.getByText('Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?')).toBeVisible()
            await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()

            await klikkGaVidere(page)
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/6`))

            await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()

            // Select additional income sources
            const ansattAndreSteder = page.getByText('Velg inntektskildene som passer for deg:')
                .locator('..')
                .getByText('Ansatt andre steder enn nevnt over')
                .locator('..')
            await ansattAndreSteder.click()

            // Answer sub-question
            const subQuestion = page.getByText(
                'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?'
            )
            await subQuestion.locator('..').locator('input[type="radio"][value="JA"]').click()

            // Select self-employed
            const selvstendingNaering = page.getByText('Velg inntektskildene som passer for deg:')
                .locator('..')
                .getByText('Selvstendig næringsdrivende')
                .locator('..')
            await selvstendingNaering.click()

            await klikkGaVidere(page)
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/7`))

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når var du utenfor EU/EØS?')).toBeVisible()

            await setPeriodeFraTil(page, 14, 22)
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/8`))

            // Check final progress bar
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuenow', '7')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuemax', '7')
            await expect(page.locator('.navds-progress-bar')).toHaveAttribute('aria-valuetext', '7 av 7')

            await expect(
                page.locator('.navds-guide-panel__content').getByText(
                    'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.'
                )
            ).toBeVisible()

            // Check summary content
            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            
            await sporsmalOgSvar(oppsummering, 'Søknaden sendes til', 'NAV')
            await expect(oppsummering.getByText('Posten Norge AS, Bærum')).toBeVisible()

            // Arbeid underveis i sykefravær
            await sporsmalOgSvar(oppsummering, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
            await sporsmalOgSvar(
                oppsummering,
                'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                '21 timer'
            )
            await sporsmalOgSvar(oppsummering, 'Jobber du vanligvis 37,5 timer i uka', 'Ja')

            // Andre inntektskilder
            await sporsmalOgSvar(oppsummering, 'Har du andre inntektskilder enn Butikken?', 'Ja')
            await sporsmalOgSvar(oppsummering, 'Velg inntektskildene som passer for deg:', 'Ansatt andre steder enn nevnt over')
            await sporsmalOgSvar(
                oppsummering,
                'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
                'Ja'
            )
            await sporsmalOgSvar(oppsummering, 'Velg inntektskildene som passer for deg:', 'Selvstendig næringsdrivende')

            await expect(page.getByText('Det er 1 feil i skjemaet')).toBeHidden()

            // Test navigation
            await page.getByRole('link', { name: 'Forrige steg' }).click()
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/7`))
            await klikkGaVidere(page)

            // Test edit answers
            await page.getByText('Endre svar').click()
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
        })
    })
})
