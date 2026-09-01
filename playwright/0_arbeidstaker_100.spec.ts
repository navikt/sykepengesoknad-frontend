import { test, expect } from '@playwright/test'

import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'

import {
    apneReadmore,
    checkViStolerPaDeg,
    klikkGaVidere,
    setPeriodeFraTil,
    sjekkIntroside,
    sporsmalOgSvar,
    harSoknaderlisteHeading,
    trykkPaSoknadMedId,
    svarFritekst,
    svarJaHovedsporsmal,
    harSynligTittel,
    harSynligTekst,
} from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

const soknadId = arbeidstaker.id

test.describe('Tester arbeidstakersøknad - 100%', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad')
    })

    test('Full søknadsflyt', async ({ page }) => {
        test.setTimeout(60000)

        await test.step('Laster startside', async () => {
            await harSoknaderlisteHeading(page)
            await trykkPaSoknadMedId(page, soknadId)
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await harSynligTittel(page, 'Før du søker', 2)
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
            await harSynligTekst(page, 'Det er 1 feil i skjemaet')
            await expect(
                page.getByRole('checkbox', { name: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.' }),
            ).toBeVisible()
            await harSynligTekst(page, 'Du må bekrefte at du vil svare så riktig du kan')

            await validerAxeUtilityWrapper(page, test.info())

            await checkViStolerPaDeg(page)
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/2`))

            await harSynligTekst(page, 'Sykmeldt fra: Posten Norge AS, Bærum')
            await harSynligTekst(page, 'Periode: 1. – 24. april 2020 (100%)')
            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når begynte du å jobbe igjen?')

            await page.getByRole('button', { name: /Åpne datovelger/i }).click()
            await page.getByRole('grid').getByRole('button').filter({ hasText: /^20$/ }).click()

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

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Som arbeidstaker har du krav på lovbestemt ferie hvert år',
                'Ferie betyr at du har avtalt med arbeidsgiver å ta fri fra arbeidet',
                'Du kan dra på ferie mens du er sykmeldt, men du får ikke utbetalt sykepenger når du har ferie',
            ])

            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når tok du ut feriedager?')

            await setPeriodeFraTil(page, 16, 23)

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/4`))

            await harSynligTekst(page, 'Spørsmålet forklart')
            await expect(
                page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom'),
            ).toBeHidden()
            await page.getByText('Spørsmålet forklart').click()
            await expect(
                page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom'),
            ).toBeVisible()

            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når tok du permisjon?')

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

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Du kan avtale med lederen din å jobbe mer enn det som står i sykmeldingen.',
                'Dersom du har gjort færre arbeidsoppgaver enn vanlig, men brukt lengre tid på dem',
            ])

            await svarJaHovedsporsmal(page)

            await harSynligTekst(page, 'Oppgi arbeidsmengde i timer eller prosent')

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

            await harSynligTekst(page, 'Har du andre inntektskilder enn nevnt over?')

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Kun pensjonsgivende inntekt gir rett til sykepenger',
                'Begynt i ny jobb',
                'Jobbet mer i en annen jobb etter at du ble sykmeldt',
            ])

            await svarJaHovedsporsmal(page)

            const ansattAndreSteder = page
                .getByText('Velg inntektskildene som passer for deg:')
                .locator('..')
                .getByText('Ansatt andre steder enn nevnt over')
                .locator('..')
            await ansattAndreSteder.click()

            const subQuestion = page.getByText(
                'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
            )
            await subQuestion.locator('..').locator('input[type="radio"][value="JA"]').check()

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

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Svar ja, dersom du har oppholdt deg utenfor EU/EØS i løpet av perioden du var sykmeldt',
                'Da oppretter vi en egen søknad som du må sende inn',
            ])

            await svarJaHovedsporsmal(page)
            await harSynligTekst(page, 'Når var du utenfor EU/EØS?')

            await setPeriodeFraTil(page, 14, 22)

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/8`))

            await expect(
                page.getByText(
                    'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
                ),
            ).toBeVisible()

            const oppsummering = page.locator('[role="region"][aria-label="Oppsummering fra søknaden"]')

            await sporsmalOgSvar(oppsummering, 'Søknaden sendes til', 'NAV')
            await expect(oppsummering.getByText('Posten Norge AS, Bærum', { exact: true })).toBeVisible()

            await sporsmalOgSvar(oppsummering, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
            await sporsmalOgSvar(
                oppsummering,
                'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                '21 timer',
            )
            await sporsmalOgSvar(oppsummering, 'Jobber du vanligvis 37,5 timer i uka', 'Ja')

            await sporsmalOgSvar(oppsummering, 'Har du andre inntektskilder enn nevnt over?', 'Ja')
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
            await harSynligTekst(page, 'Steg 1 av 7')
            await page.getByRole('button', { name: 'Vis alle steg' }).click()
            await page.getByRole('link', { name: 'Oppsummering fra søknaden' }).click()
            await harSynligTekst(page, 'Steg 7 av 7')

            await page.getByText('Send søknaden').click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`.*\\/kvittering\\/${soknadId}`))

            const kvittering = page.getByRole('main')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Nav ber arbeidsgiveren din om inntektsmelding')
            await expect(kvittering).toContainText(
                'For å behandle søknaden trenger vi en inntektsmelding fra arbeidsgiveren din',
            )
            await expect(kvittering).toContainText('NAV behandler søknaden')
            await expect(kvittering).toContainText('Når blir pengene utbetalt')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
