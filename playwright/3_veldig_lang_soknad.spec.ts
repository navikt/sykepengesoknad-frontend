import { test, expect } from '@playwright/test'

import { veldigLangSoknad } from '../src/data/mock/data/soknad/veldig-lang-soknad'
import { rsToSoknad } from '../src/types/mapping'

import {
    setPeriodeFraTil,
    svarFritekst,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    velgDato,
    svarCombobox,
    svarRadioGruppe,
    checkViStolerPaDeg,
    sporsmalOgSvar,
    velgKalenderdag,
    velgTimer,
    velgTall,
    velgCheckbox,
    svarRadio,
    svarSykMedEgenmelding,
    velgBehandlingsdager,
    lastOppKvittering,
    harSynligTittel,
    klikkGaVidere,
} from './utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester støtte for gamle spørsmål', () => {
    test.setTimeout(120000) // 2 minutes timeout for all tests in this describe block
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: 214f6e73-8150-4261-8ce5-e2b41907fa58, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = rsToSoknad(veldigLangSoknad)

    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        test.setTimeout(120000) // 2 minutes timeout for this test
        await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
        await page.locator(`a[href*="${soknad.id}"]`).click()
    })

    test('Complete søknad flow', async ({ page }) => {
        test.setTimeout(120000) // 2 minutes timeout for the entire test

        await test.step('1: Navigate to søknad', async () => {
            await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await page.locator(`a[href*="${soknad.id}"]`).click()
        })

        await test.step('2: ANSVARSERKLARING', async () => {
            await checkViStolerPaDeg(page)
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('3: YRKESSKADE', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('4: YRKESSKADE_V2', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('5: ARBEID_UNDERVEIS_100_PROSENT_0', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('6: MEDLEMSKAP_OPPHOLDSTILLATELSE', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('7: MEDLEMSKAP_OPPHOLDSTILLATELSE_V2', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('8: MEDLEMSKAP_OPPHOLD_UTENFOR_EOS', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('9: MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('10: MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('11: ANDRE_INNTEKTSKILDER - first instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'dagmamma')
            await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('12: ANDRE_INNTEKTSKILDER - second instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'frilanser')
            await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('13: ANDRE_INNTEKTSKILDER_V2 - first instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'dagmamma')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('14: ANDRE_INNTEKTSKILDER_V2 - second instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Dagmamma')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('15: ANDRE_INNTEKTSKILDER_V2_SI_NEI_HOVEDSPORSMAL', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Dagmamma')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('16: ARBEID_UTENFOR_NORGE', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('17: ARBEIDSGIVER', async () => {
            await svarJaHovedsporsmal(page)
            await svarRadio(page, 'Er du 100 % sykmeldt?', 'JA')
            await svarRadio(
                page,
                'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
                'JA',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('18: ARBEIDSLEDIG_UTLAND', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('19: EGENMELDINGER', async () => {
            await svarJaHovedsporsmal(page)
            await svarSykMedEgenmelding(page)
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('20: FRAVAR_FOR_SYKMELDINGEN', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('21: ENKELTSTAENDE_BEHANDLINGSDAGER', async () => {
            await velgBehandlingsdager(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('22: FERIE_V2', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await klikkGaVidere(page)
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('23: FERIE_PERMISJON_UTLAND', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Jeg tok ut ferie')
            await setPeriodeFraTil(page, 12, 15)
            // todo her har vi UU feil
            // await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('24: FRAVER_FOR_BEHANDLING', async () => {
            await svarJaHovedsporsmal(page)
            await svarSykMedEgenmelding(page)
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('25: FRISKMELDT', async () => {
            await svarJaHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('26: JOBBET_DU_100_PROSENT', async () => {
            await svarJaHovedsporsmal(page)
            await velgTall(
                page,
                'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                '12',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await velgTimer(page)
            await klikkGaVidere(page)
        })

        await test.step('27: JOBBET_DU_GRADERT', async () => {
            await svarJaHovedsporsmal(page)
            await velgTall(
                page,
                'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                '12',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await velgTimer(page)
            await klikkGaVidere(page)
        })

        await test.step('28: LAND', async () => {
            await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
            await page.getByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Søre fran')
            await page.getByRole('option', { name: 'Søre franske territorier' }).click()
            await page.locator('.navds-combobox__button-toggle-list').click()
            // await validerAxeUtilityWrapper(page, test.info())
            // todo her har vi UU feil
            await klikkGaVidere(page)
        })

        await test.step('29: LAND_COMBOBOX', async () => {
            await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
            await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
            await page.locator('.navds-combobox__button-toggle-list').click()
            // todo her har vi UU feil
            // await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('30: PERIODEUTLAND', async () => {
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('31: PERMISJON_V2', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('32: PERMITTERT_NAA', async () => {
            await svarJaHovedsporsmal(page)
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 10)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('33: PERMITTERT_PERIODE', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            // todo her har vi UU feil
            // await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('34: TILBAKE_I_ARBEID', async () => {
            await svarJaHovedsporsmal(page)
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 10)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('35: UTDANNING', async () => {
            await svarJaHovedsporsmal(page)

            await expect(page.locator('.navds-date__field-button')).toBeVisible()

            await page.locator('.navds-date__field-button').click()

            await velgDato(page, 10)

            await svarRadio(page, 'Er utdanningen et fulltidsstudium?', 'JA')

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('36: OPPHOLD_UTENFOR_EOS', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('37: UTLAND', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('38: UTLAND_V2', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('39: BRUKTE_REISETILSKUDDET', async () => {
            await svarJaHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('40: TRANSPORT_TIL_DAGLIG', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Offentlig transport')
            await velgTall(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '21')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('41: REISE_MED_BIL', async () => {
            await svarJaHovedsporsmal(page)
            await velgKalenderdag(page)
            await svarRadio(page, 'Hadde du utgifter til bompenger?', 'NEI')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('42: KVITTERINGER', async () => {
            await lastOppKvittering(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('43: UTBETALING', async () => {
            await svarJaHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('44: ARBEID_UNDERVEIS_100_PROSENT', async () => {
            await svarJaHovedsporsmal(page)
            await svarRadio(page, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
            await velgTall(
                page,
                'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
                '12',
            )
            await svarRadio(page, 'Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?', 'JA')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('45: BOSTED', async () => {
            await svarJaHovedsporsmal(page)
            await svarFritekst(page, 'Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
            await svarFritekst(page, 'Land', 'UK')
            await svarFritekst(page, 'Telefonnummer', '81549300')

            await expect(page.locator('.navds-date__field-button')).toBeVisible()
            await page.locator('.navds-date__field-button').click()

            // Hvor lenge skal denne adressen brukes?

            await velgDato(page, 10)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('46: LØNNET ARBEID', async () => {
            await svarJaHovedsporsmal(page)
            await svarFritekst(page, 'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge', 'Britiske staten')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('47: Sykepenger i andre EU/EØS-land', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('48: Kjente inntektskilder', async () => {
            await svarRadioGruppe(page, 'Har du sluttet hos Rema før du ble sykmeldt 8. september', 'Nei')
            await svarRadioGruppe(
                page,
                'Har du utført noe arbeid ved Rema i perioden 24. august - 7. september 2022?',
                'Ja',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('49: Tilkommen inntekt', async () => {
            await svarJaHovedsporsmal(page)
            await svarFritekst(page, 'Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('50: Avviklet virksomhet', async () => {
            await svarJaHovedsporsmal(page)

            await expect(page.locator('.navds-date__field-button')).toBeVisible()
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 14)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('51: Drift i virksomheten', async () => {
            await svarNeiHovedsporsmal(page)
            await expect(page.locator('.navds-date__field-button')).toBeVisible()
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 14)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('52: Næringsdrivende virksomheten din', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('53: Næringsdrivende ny i arbeidslivet', async () => {
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('54: Næringsdrivende varig endring', async () => {
            await svarJaHovedsporsmal(page)
            await expect(page.locator('.navds-date__field-button')).toBeVisible()
            await page.getByRole('checkbox', { name: 'Jobbet mindre i en virksomhet' }).click()
            await page.getByLabel('Når skjedde endringen?').fill('januar 2024')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('55: Avklaring i forbindlese med reise', async () => {
            await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
            await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('56: Jobbsituasjonen din', async () => {
            await svarNeiHovedsporsmal(page)
            await svarRadioGruppe(page, 'Vil du fortsatt være friskmeldt til arbeidsformidling?', 'Ja')
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('57: Inntekt underveis', async () => {
            await page.getByRole('heading', { name: 'Inntekt underveis' }).isVisible()
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('58: Reise til utlandet', async () => {
            await page.getByRole('heading', { name: 'Reise til utlandet' }).isVisible()
            await svarNeiHovedsporsmal(page)
            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('59: Fravær før sykmeldingen', async () => {
            await harSynligTittel(page, 'Fravær før du ble sykmeldt', 2)
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('60: Søknad TIL_SLUTT', async () => {
            await page.getByRole('heading', { name: 'Oppsummering fra søknaden' }).isVisible()
            // Oppsummering fra søknaden
            await sporsmalOgSvar(
                page.locator('form'),
                'Hvor mye har du tjent i perioden 20. – 24. april 2020?',
                '25000 kroner før skatt',
            )
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('61: Søknad kvittering', async () => {
            await expect(page.getByRole('heading', { name: 'Søknaden er sendt' })).toBeVisible()

            const kvitteringSection = page.locator('[data-cy="kvittering"]')
            await expect(kvitteringSection).toContainText('Hva skjer videre?')
            await expect(kvitteringSection).toContainText('Før NAV kan behandle søknaden')
            await expect(kvitteringSection).toContainText('NAV behandler søknaden')
            await expect(kvitteringSection).toContainText('Når blir pengene utbetalt')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
