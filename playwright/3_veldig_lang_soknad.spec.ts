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
    apneReadmore,
    harSynligTekst,
} from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester støtte for gamle spørsmål', () => {
    // test.setTimeout(180_000) // 3 minutter timeout for alle tester i denne describe blokken

    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: 214f6e73-8150-4261-8ce5-e2b41907fa58, fom: 1.4.20, tom: 24.4.20

    const soknad = rsToSoknad(veldigLangSoknad)

    test('Laster startside', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
        await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
        await page.locator(`a[href*="${soknad.id}"]`).click()
    })

    test('Side 1 - ANSVARSERKLARING', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/1?testperson=integrasjon-soknader`)
        await checkViStolerPaDeg(page)
    })

    test('Side 2 - YRKESSKADE', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/2?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 3 - YRKESSKADE_V2', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/3?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 4 - ARBEID_UNDERVEIS_100_PROSENT_0', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/4?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
    })

    test('Side 5 - MEDLEMSKAP_OPPHOLDSTILLATELSE', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/5?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
    })

    test('Side 6 - MEDLEMSKAP_OPPHOLDSTILLATELSE_V2', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/6?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 7 - MEDLEMSKAP_OPPHOLD_UTENFOR_EOS', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/7?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 8 - MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/8?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 9 - MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/9?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 10 - ANDRE_INNTEKTSKILDER - first instance', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/10?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'dagmamma')
        await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 11 - ANDRE_INNTEKTSKILDER - second instance', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/11?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'frilanser')
        await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 12 - ANDRE_INNTEKTSKILDER_V2 - first instance', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/12?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'dagmamma')

        await klikkGaVidere(page)
    })

    test('Side 13 - ANDRE_INNTEKTSKILDER_V2 - second instance', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/13?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Dagmamma')

        await klikkGaVidere(page)
    })

    test('Side 14 - ANDRE_INNTEKTSKILDER_V2_SI_NEI_HOVEDSPORSMAL', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/14?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Dagmamma')

        await klikkGaVidere(page)
    })

    test('Side 15 - ARBEID_UTENFOR_NORGE', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/15?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 16 - ARBEIDSGIVER', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/16?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarRadio(page, 'Er du 100 % sykmeldt?', 'JA')
        await svarRadio(page, 'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 17 - ARBEIDSLEDIG_UTLAND', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/17?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 18 - EGENMELDINGER', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/18?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarSykMedEgenmelding(page)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 19 - FRAVAR_FOR_SYKMELDINGEN', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/19?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 20 - ENKELTSTAENDE_BEHANDLINGSDAGER', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/20?testperson=integrasjon-soknader`)
        await velgBehandlingsdager(page)

        await klikkGaVidere(page)
    })

    test('Side 21 - FERIE_V2', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/21?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await klikkGaVidere(page)
    })

    test('Side 22 - FERIE_PERMISJON_UTLAND', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/22?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Jeg tok ut ferie')
        await setPeriodeFraTil(page, 12, 15)
        await klikkGaVidere(page)
    })

    test('Side 23 - FRAVER_FOR_BEHANDLING', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/23?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarSykMedEgenmelding(page)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 24 - FRISKMELDT', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/24?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 25 - JOBBET_DU_100_PROSENT', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/25?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgTall(
            page,
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
            '12',
        )

        await velgTimer(page)
        await klikkGaVidere(page)
    })

    test('Side 26 - JOBBET_DU_GRADERT', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/26?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgTall(
            page,
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
            '12',
        )

        await velgTimer(page)
        await klikkGaVidere(page)
    })

    test('Side 27 - LAND', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/27?testperson=integrasjon-soknader`)
        await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
        await page.getByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).fill('Søre fran')
        await page.getByRole('option', { name: 'Søre franske territorier' }).click()
        await klikkGaVidere(page)
    })

    test('Side 28 - LAND_COMBOBOX', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/28?testperson=integrasjon-soknader`)
        await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
        await klikkGaVidere(page)
    })

    test('Side 29 - PERIODEUTLAND', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/29?testperson=integrasjon-soknader`)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 30 - PERMISJON_V2', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/30?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 31 - PERMITTERT_NAA', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/31?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await page.locator('.navds-date__field-button').click()
        await velgDato(page, 10)

        await klikkGaVidere(page)
    })

    test('Side 32 - PERMITTERT_PERIODE', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/32?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await klikkGaVidere(page)
    })

    test('Side 33 - TILBAKE_I_ARBEID', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/33?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await page.locator('.navds-date__field-button').click()
        await velgDato(page, 10)

        await klikkGaVidere(page)
    })

    test('Side 34 - UTDANNING', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/34?testperson=integrasjon-soknader`)
        await apneReadmore(page, 'Sykepenger under utdanning', [
            'I noen tilfeller kan du ha rett til sykepenger fra NAV mens du studerer',
            'Les om hvilken type utdanning det gjelder',
        ])

        await svarJaHovedsporsmal(page)

        await expect(page.locator('.navds-date__field-button')).toBeVisible()

        await page.locator('.navds-date__field-button').click()

        await velgDato(page, 10)

        await svarRadio(page, 'Er utdanningen et fulltidsstudium?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 35 - OPPHOLD_UTENFOR_EOS', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/35?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 36 - UTLAND', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/36?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 37 - UTLAND_V2', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/37?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)

        await klikkGaVidere(page)
    })

    test('Side 38 - BRUKTE_REISETILSKUDDET', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/38?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 39 - TRANSPORT_TIL_DAGLIG', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/39?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Offentlig transport')
        await velgTall(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '21')

        await klikkGaVidere(page)
    })

    test('Side 40 - REISE_MED_BIL', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/40?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await velgKalenderdag(page)
        await svarRadio(page, 'Hadde du utgifter til bompenger?', 'NEI')

        await klikkGaVidere(page)
    })

    test('Side 41 - KVITTERINGER', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/41?testperson=integrasjon-soknader`)
        await lastOppKvittering(page)

        await klikkGaVidere(page)
    })

    test('Side 42 - UTBETALING', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/42?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 43 - ARBEID_UNDERVEIS_100_PROSENT', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/43?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarRadio(page, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
        await velgTall(
            page,
            'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum',
            '12',
        )
        await svarRadio(page, 'Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?', 'JA')

        await klikkGaVidere(page)
    })

    test('Side 44 - BOSTED', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/44?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarFritekst(page, 'Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
        await svarFritekst(page, 'Land', 'UK')
        await svarFritekst(page, 'Telefonnummer', '81549300')
        await expect(page.locator('.navds-date__field-button')).toBeVisible()
        await page.locator('.navds-date__field-button').click()
        await velgDato(page, 10)

        await klikkGaVidere(page)
    })

    test('Side 45 - LØNNET ARBEID', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/45?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarFritekst(page, 'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge', 'Britiske staten')

        await klikkGaVidere(page)
    })

    test('Side 46 - Sykepenger i andre EU/EØS-land', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/46?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 47 - Kjente inntektskilder', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/47?testperson=integrasjon-soknader`)
        await svarRadioGruppe(page, 'Har du sluttet hos Rema før du ble sykmeldt 8. september', 'Nei')
        await svarRadioGruppe(
            page,
            'Har du utført noe arbeid ved Rema i perioden 24. august - 7. september 2022?',
            'Ja',
        )

        await klikkGaVidere(page)
    })

    test('Side 48 - Tilkommen inntekt', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/48?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await svarFritekst(page, 'Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000')

        await klikkGaVidere(page)
    })

    test('Side 49 - Avviklet virksomhet', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/49?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await expect(page.locator('.navds-date__field-button')).toBeVisible()
        await page.locator('.navds-date__field-button').click()
        await velgDato(page, 14)

        await klikkGaVidere(page)
    })

    test('Side 50 - Drift i virksomheten', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/50?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)
        await expect(page.locator('.navds-date__field-button')).toBeVisible()
        await page.locator('.navds-date__field-button').click()
        await velgDato(page, 14)

        await klikkGaVidere(page)
    })

    test('Side 51 - Næringsdrivende opprettholdt inntekt', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/51?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 52 - Næringsdrivende opprettholdt inntekt gradert', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/52?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 53 - Næringsdrivende opphold i utlandet', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/53?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 54 - Næringsdrivende virksomheten din avviklet', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/54?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 55 - Næringsdrivende ny i arbeidslivet', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/55?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 56 - Næringsdrivende varig endring', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/56?testperson=integrasjon-soknader`)
        await svarJaHovedsporsmal(page)
        await expect(page.locator('.navds-date__field-button')).toBeVisible()
        await page.getByRole('checkbox', { name: 'Jobbet mindre i en virksomhet' }).click()
        await page.getByLabel('Når skjedde endringen?').fill('januar 2024')

        await klikkGaVidere(page)
    })

    test('Side 57 - Avklaring i forbindelse med reise', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/57?testperson=integrasjon-soknader`)
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')

        await klikkGaVidere(page)
    })

    test('Side 58 - Jobbsituasjonen din', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/58?testperson=integrasjon-soknader`)
        await svarNeiHovedsporsmal(page)
        await svarRadioGruppe(page, 'Vil du fortsatt være friskmeldt til arbeidsformidling?', 'Ja')

        await klikkGaVidere(page)
    })

    test('Side 59 - Inntekt underveis', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/59?testperson=integrasjon-soknader`)
        await page.getByRole('heading', { name: 'Inntekt underveis' }).isVisible()
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 60 - Reise til utlandet', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/60?testperson=integrasjon-soknader`)
        await page.getByRole('heading', { name: 'Reise til utlandet' }).isVisible()
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 61 - Fravær før sykmeldingen', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/61?testperson=integrasjon-soknader`)
        await harSynligTittel(page, 'Fravær før du ble sykmeldt', 2)
        await svarNeiHovedsporsmal(page)

        await klikkGaVidere(page)
    })

    test('Side 62 - Oppsummering, innnsendig og kvittering', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/62?testperson=integrasjon-soknader`)
        await harSynligTittel(page, 'Oppsummering', 1)
        await validerAxeUtilityWrapper(page, test.info())

        await page.getByRole('button', { name: 'Send søknaden' }).click()

        await test.step('Kvittering', async () => {
            await harSynligTittel(page, 'Søknaden er sendt', 2)
            await harSynligTekst(page, 'Hva skjer videre?')
            await harSynligTekst(page, 'Før NAV kan behandle søknaden')
            await harSynligTekst(page, 'NAV behandler søknaden')
            await harSynligTekst(page, 'Når blir pengene utbetalt')
        })
    })
})
