import { test, expect } from '@playwright/test'

import { arbeidtakerMedGammelOppsummering } from '../src/data/mock/data/soknad/arbeidstaker'

import { setPeriodeFraTil, sporsmalOgSvar, svarTekstboks, trykkPaSoknadMedId } from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Sjekker at søknader med gammel oppsummering ser ok ut', () => {
    test('Full søknadsflyt med gammel oppsummering', async ({ page }) => {
        test.setTimeout(60000)

        await page.goto('/syk/sykepengesoknad?testperson=gammel-oppsummering')

        await test.step('Laster startside', async () => {
            const heading = page.getByRole('heading', {
                name: 'Søknader',
                level: 1,
            })
            await expect(heading).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
            await trykkPaSoknadMedId(page, arbeidtakerMedGammelOppsummering().id)
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/1/)

            await expect(page.getByText('Før du begynner')).toBeHidden()
            await expect(
                page.getByText('Det du fyller ut brukes til å vurdere om du har rett til sykepenger'),
            ).toBeHidden()

            await page.getByText('Slik behandler NAV personopplysningene dine').click()

            await page
                .getByRole('button', {
                    name: 'Jeg vil slette denne søknaden',
                })
                .click()
            await page.getByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()

            await validerAxeUtilityWrapper(page, test.info())

            await page.getByText('Start søknad').click()
            await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
            await expect(page.locator('.navds-confirmation-panel__inner')).toBeVisible()
            await expect(page.getByText('Du må bekrefte at du vil svare så riktig du kan')).toBeVisible()
            await page.locator('.navds-checkbox__label').click()

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Start søknad').click()
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/2/)

            const progressBar = page.locator('.navds-progress-bar')
            await expect(progressBar).toHaveAttribute('aria-valuenow', '1')
            await expect(progressBar).toHaveAttribute('aria-valuemax', '7')
            await expect(progressBar).toHaveAttribute('aria-valuetext', '1 av 7')

            // Test spørsmål
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()
            await page.locator('.navds-date__field-button').click()
            await page.locator('.rdp-day').getByText('20').click()
            await expect(
                page.getByText(
                    'Svaret ditt betyr at du har vært i fullt arbeid fra 20. – 24. april 2020. Du får ikke utbetalt sykepenger for denne perioden',
                ),
            ).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Søknad TILBAKE_I_ARBEID går videre', async () => {
            await page.getByText('Gå videre').click()
        })

        await test.step('Søknad FERIE_V2', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/3/)

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()

            await setPeriodeFraTil(page, 16, 23)

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå videre').click()
        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/4/)

            await expect(page.getByText('Spørsmålet forklart')).toBeVisible()
            await expect(
                page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom'),
            ).toBeHidden()
            await page.getByText('Spørsmålet forklart').click()
            await expect(
                page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom'),
            ).toBeVisible()

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await expect(page.getByText('Når tok du permisjon?')).toBeVisible()

            await setPeriodeFraTil(page, 14, 22)

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå videre').click()
        })

        await test.step('Søknad ARBEID_UNDERVEIS_100_PROSENT', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/5/)

            await expect(
                page.getByText(
                    'I perioden 1. - 24. april 2020 var du 100 % sykmeldt fra Posten Norge AS, Bærum. Jobbet du noe hos Posten Norge AS, Bærum i denne perioden?',
                ),
            ).toBeVisible()
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()

            await expect(page.getByText('Oppgi arbeidsmengde i timer eller prosent')).toBeVisible()
            await page.locator('.undersporsmal input[value=Prosent]').click()
            await expect(
                page.getByText(
                    'Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos Posten Norge AS, Bærum i perioden 1. - 24. april 2020?',
                ),
            ).toBeVisible()

            await svarTekstboks(
                page,
                'Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos Posten Norge AS, Bærum i perioden 1. - 24. april 2020?',
                '21',
            )

            await page.locator('.undersporsmal input[value=Timer]').click()
            await expect(
                page.getByText(
                    'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                ),
            ).toBeVisible()
            await expect(page.getByText('Antall timer du skrev inn, betyr at du har jobbet')).toBeHidden()

            await svarTekstboks(
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
            await page.getByText('Gå videre').click()
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER_V2', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/6/)

            await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()

            const checkboxParent = page.getByText('Velg inntektskildene som passer for deg:').locator('..')
            await checkboxParent.getByText('Ansatt andre steder enn nevnt over').locator('..').click()

            const radioParent = page
                .getByText(
                    'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
                )
                .locator('..')
            await radioParent.locator('input[type="radio"][value="JA"]').click()

            await checkboxParent.getByText('Selvstendig næringsdrivende').locator('..').click()

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå videre').click()
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/7/)

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await expect(page.getByText('Når var du utenfor EU/EØS?')).toBeVisible()

            await setPeriodeFraTil(page, 14, 22)

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Gå videre').click()
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(/\/soknader\/.*\/8/)

            const progressBar = page.locator('.navds-progress-bar')
            await expect(progressBar).toHaveAttribute('aria-valuenow', '7')
            await expect(progressBar).toHaveAttribute('aria-valuemax', '7')
            await expect(progressBar).toHaveAttribute('aria-valuetext', '7 av 7')

            await expect(page.locator('.navds-guide-panel__content')).toContainText(
                'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
            )

            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            await sporsmalOgSvar(oppsummering, 'Søknaden sendes til', 'NAV')
            await expect(oppsummering).toContainText('Posten Norge AS, Bærum')

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

            const forrigeStegLink = page.getByText('Forrige steg')
            await expect(forrigeStegLink).toHaveAttribute('href', /\/soknader\/.*\/7\?testperson=gammel-oppsummering/)
            await page.getByRole('button', { name: 'Tilbake' }).click()
            await expect(page.getByRole('heading', { name: 'Reise utenfor EU/EØS' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'Gå videre' })).toBeVisible()
            await page.getByRole('button', { name: 'Gå videre' }).click()

            await page.getByText('Søknaden sendes til NAV').isVisible()
            await page.getByRole('link', { name: 'Endre svar' }).click()

            await page.getByRole('heading', { name: 'Tilbake i fullt arbeid' }).click()
            await expect(page.getByText('Steg 1 av 7')).toBeVisible()
            await page.getByRole('button', { name: 'Vis alle steg' }).click()
            await page.getByRole('link', { name: 'Oppsummering fra søknaden' }).click()
            await expect(page.getByText('Steg 7 av 7')).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Send søknaden').click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page.getByRole('heading', { name: 'Søknaden er sendt' })).toBeVisible()

            await expect(page).toHaveURL(/\/kvittering\/.*/)

            const kvittering = page.locator('[data-cy="kvittering"]')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Før NAV kan behandle søknaden')
            await expect(kvittering).toContainText('NAV behandler søknaden')
            await expect(kvittering).toContainText('Når blir pengene utbetalt')

            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
