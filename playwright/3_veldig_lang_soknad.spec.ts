import { test, expect } from '@playwright/test'
import {
    setPeriodeFraTil,
    svarFritekst,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    velgDato,
    klikkGaVidere,
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
} from './utilities'
import { veldigLangSoknad } from '../src/data/mock/data/soknad/veldig-lang-soknad'
import { rsToSoknad } from '../src/types/mapping'

test.describe('Tester støtte for gamle spørsmål', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: 214f6e73-8150-4261-8ce5-e2b41907fa58, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = rsToSoknad(veldigLangSoknad)

    async function gaVidere(page, steg: { value: number }) {
        await klikkGaVidere(page)
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/${++steg.value}`))
    }

    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
        await page.locator(`a[href*="${soknad.id}"]`).click()
    })

    test('Complete søknad flow', async ({ page }) => {
        const steg = { value: 1 }

        await test.step('Step 1: Navigate to søknad', async () => {
            await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
            await page.locator(`a[href*="${soknad.id}"]`).click()
        })

        await test.step('Step 2: ANSVARSERKLARING', async () => {
            await checkViStolerPaDeg(page)
            steg.value++
        })

        await test.step('Step 3: YRKESSKADE', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 4: YRKESSKADE_V2', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 5: ARBEID_UNDERVEIS_100_PROSENT_0', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 6: MEDLEMSKAP_OPPHOLDSTILLATELSE', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 7: MEDLEMSKAP_OPPHOLDSTILLATELSE_V2', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 8: MEDLEMSKAP_OPPHOLD_UTENFOR_EOS', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 9: MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 10: MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 11: ANDRE_INNTEKTSKILDER - first instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'dagmamma')
            await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')
            await gaVidere(page, steg)
        })

        await test.step('Step 12: ANDRE_INNTEKTSKILDER - second instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'frilanser')
            await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')
            await gaVidere(page, steg)
        })

        await test.step('Step 13: ANDRE_INNTEKTSKILDER_V2 - first instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'dagmamma')
            await gaVidere(page, steg)
        })

        await test.step('Step 14: ANDRE_INNTEKTSKILDER_V2 - second instance', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Dagmamma')
            await gaVidere(page, steg)
        })

        await test.step('Step 15: ANDRE_INNTEKTSKILDER_V2_SI_NEI_HOVEDSPORSMAL', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Dagmamma')
            await gaVidere(page, steg)
        })

        await test.step('Step 16: ARBEID_UTENFOR_NORGE', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 17: ARBEIDSGIVER', async () => {
            await svarJaHovedsporsmal(page)
            await svarRadio(page, 'Er du 100 % sykmeldt?', 'JA')
            await svarRadio(page, 'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?', 'JA')
            await gaVidere(page, steg)
        })

        await test.step('Step 18: ARBEIDSLEDIG_UTLAND', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
            await gaVidere(page, steg)
        })

        await test.step('Step 19: EGENMELDINGER', async () => {
            await svarJaHovedsporsmal(page)
            await svarSykMedEgenmelding(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 20: FRAVAR_FOR_SYKMELDINGEN', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 21: ENKELTSTAENDE_BEHANDLINGSDAGER', async () => {
            await velgBehandlingsdager(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 22: FERIE_V2', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 23: FERIE_PERMISJON_UTLAND', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Jeg tok ut ferie')
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 24: FRAVER_FOR_BEHANDLING', async () => {
            await svarJaHovedsporsmal(page)
            await svarSykMedEgenmelding(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 25: FRISKMELDT', async () => {
            await svarJaHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 26: JOBBET_DU_100_PROSENT', async () => {
            await svarJaHovedsporsmal(page)
            await velgTall(page, 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.', '12')
            await velgTimer(page, steg.value, soknad)
            await gaVidere(page, steg)
        })

        await test.step('Step 27: JOBBET_DU_GRADERT', async () => {
            await svarJaHovedsporsmal(page)
            await velgTall(page, 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.', '12')
            await velgTimer(page, steg.value, soknad)
            await gaVidere(page, steg)
        })

        await test.step('Step 28: LAND', async () => {
            await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
            await page.getByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Søre fran')
            await page.getByRole('option', { name: 'Søre franske territorier' }).click()
            await page.locator('.navds-combobox__button-toggle-list').click()
            await gaVidere(page, steg)
        })

        await test.step('Step 29: LAND_COMBOBOX', async () => {
            await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
            await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
            await page.locator('.navds-combobox__button-toggle-list').click()
            await gaVidere(page, steg)
        })

        await test.step('Step 30: PERIODEUTLAND', async () => {
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 31: PERMISJON_V2', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 32: PERMITTERT_NAA', async () => {
            await svarJaHovedsporsmal(page)
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 10)

            await gaVidere(page, steg)
        })

        await test.step('Step 33: PERMITTERT_PERIODE', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 34: TILBAKE_I_ARBEID', async () => {
            await svarJaHovedsporsmal(page)
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 10)
            await gaVidere(page, steg)
        })

        await test.step('Step 35: UTDANNING', async () => {
            await svarJaHovedsporsmal(page)
            
            // Wait for the date field to be visible
            await page.waitForSelector('.navds-date__field-button', { state: 'visible' })
            
            // Click the date picker button to open the calendar
            await page.locator('.navds-date__field-button').click()
            
            // Wait for the calendar to open
            // await page.waitForSelector('.rdp-day', { state: 'visible' })
            
            // Select day 10 from the calendar
            await velgDato(page, 10)
            
            // Answer the follow-up question about full-time study
            await svarRadio(page, 'Er utdanningen et fulltidsstudium?', 'JA')
            
            await gaVidere(page, steg)
        })

        await test.step('Step 36: OPPHOLD_UTENFOR_EOS', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 37: UTLAND', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
            await gaVidere(page, steg)
        })

        await test.step('Step 38: UTLAND_V2', async () => {
            await svarJaHovedsporsmal(page)
            await setPeriodeFraTil(page, 12, 15)
            await gaVidere(page, steg)
        })

        await test.step('Step 39: BRUKTE_REISETILSKUDDET', async () => {
            await svarJaHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 40: TRANSPORT_TIL_DAGLIG', async () => {
            await svarJaHovedsporsmal(page)
            await velgCheckbox(page, 'Offentlig transport')
            await velgTall(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '21')
            await gaVidere(page, steg)
        })

        await test.step('Step 41: REISE_MED_BIL', async () => {
            await svarJaHovedsporsmal(page)
            await velgKalenderdag(page)
            await svarRadio(page, 'Hadde du utgifter til bompenger?', 'NEI')
            await gaVidere(page, steg)
        })

        await test.step('Step 42: KVITTERINGER', async () => {
            await lastOppKvittering(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 43: UTBETALING', async () => {
            await svarJaHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 44: ARBEID_UNDERVEIS_100_PROSENT', async () => {
            await svarJaHovedsporsmal(page)
            await svarRadio(page, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
            await velgTall(page, 'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum', '12')
            await svarRadio(page, 'Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?', 'JA')
            await gaVidere(page, steg)
        })

        await test.step('Step 45: BOSTED', async () => {
            await svarJaHovedsporsmal(page)
            await svarFritekst(page, 'Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
            await svarFritekst(page, 'Land', 'UK')
            await svarFritekst(page, 'Telefonnummer', '81549300')

             await page.waitForSelector('.navds-date__field-button', { state: 'visible' })
            // Click the date picker button to open the calendar
            await page.locator('.navds-date__field-button').click()

            // Hvor lenge skal denne adressen brukes?


            await velgDato(page, 10)
            await gaVidere(page, steg)
        })

        await test.step('Step 46: LØNNET ARBEID', async () => {
            await svarJaHovedsporsmal(page)
            await svarFritekst(page, 'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge', 'Britiske staten')
            await gaVidere(page, steg)
        })

        await test.step('Step 47: Sykepenger i andre EU/EØS-land', async () => {
            await svarNeiHovedsporsmal(page)
            await gaVidere(page, steg)
        })

        await test.step('Step 48: Kjente inntektskilder', async () => {
            await svarRadioGruppe(page, 'Har du sluttet hos Rema før du ble sykmeldt 8. september', 'Nei')
            await svarRadioGruppe(page, 'Har du utført noe arbeid ved Rema i perioden 24. august - 7. september 2022?', 'Ja')
            await gaVidere(page, steg)
        })

        await test.step('Step 49: Tilkommen inntekt', async () => {
            await svarJaHovedsporsmal(page)
            await svarFritekst(page, 'Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000')
            await gaVidere(page, steg)
        })

        await test.step('Step 50: Avviklet virksomhet', async () => {
            await svarJaHovedsporsmal(page)


             await page.waitForSelector('.navds-date__field-button', { state: 'visible' })
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 14)
            await gaVidere(page, steg)
        })

        await test.step('Step 51: Drift i virksomheten', async () => {
            await svarNeiHovedsporsmal(page)
            await page.waitForSelector('.navds-date__field-button', { state: 'visible' })
            await page.locator('.navds-date__field-button').click()
            await velgDato(page, 14)
            await gaVidere(page, steg)
        })

        await test.step('Step 52: Avklaring i forbindlese med reise', async () => {
            await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
            await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')
            await klikkGaVidere(page)
        })

        await test.step('Step 53: Jobbsituasjonen din', async () => {
            await svarNeiHovedsporsmal(page)
            await svarRadioGruppe(page, 'Vil du fortsatt være friskmeldt til arbeidsformidling?', 'Ja')
            await klikkGaVidere(page)
        })

        await test.step('Step 54: Inntekt underveis', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Step 55: Reise til utlandet', async () => {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        })

        await test.step('Step 56: Søknad TIL_SLUTT', async () => {
            await sporsmalOgSvar(page.locator('form'), 'Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000 kroner før skatt')
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Step 57: Søknad kvittering', async () => {
            
            const kvittering = page.locator('[data-cy="kvittering"]')
            await expect(kvittering).toContainText('Hva skjer videre?')
            // await expect(page).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))
            await expect(kvittering).toContainText('Før NAV kan behandle søknaden')
            await expect(kvittering).toContainText('NAV behandler søknaden')
            await expect(kvittering).toContainText('Når blir pengene utbetalt')
        })
    })
})