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

        // Navigate to søknad
        await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible()
        await page.locator(`a[href*="${soknad.id}"]`).click()

        // ANSVARSERKLARING
        await checkViStolerPaDeg(page)
        steg.value++

        // YRKESSKADE
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // YRKESSKADE_V2
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // ARBEID_UNDERVEIS_100_PROSENT_0
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // MEDLEMSKAP_OPPHOLDSTILLATELSE
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // MEDLEMSKAP_OPPHOLDSTILLATELSE_V2
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // MEDLEMSKAP_OPPHOLD_UTENFOR_EOS
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // ANDRE_INNTEKTSKILDER - first instance
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'dagmamma')
        await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')
        await gaVidere(page, steg)

        // ANDRE_INNTEKTSKILDER - second instance
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'frilanser')
        await svarRadio(page, 'Er du sykmeldt fra dette?', 'JA')
        await gaVidere(page, steg)

        // ANDRE_INNTEKTSKILDER_V2 - first instance
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'dagmamma')
        await gaVidere(page, steg)

        // ANDRE_INNTEKTSKILDER_V2 - second instance
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Dagmamma')
        await gaVidere(page, steg)

        // ANDRE_INNTEKTSKILDER_V2_SI_NEI_HOVEDSPORSMAL
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Dagmamma')
        await gaVidere(page, steg)

        // ARBEID_UTENFOR_NORGE
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // ARBEIDSGIVER
        await svarJaHovedsporsmal(page)
        await svarRadio(page, 'Er du 100 % sykmeldt?', 'JA')
        await svarRadio(page, 'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?', 'JA')
        await gaVidere(page, steg)

        // ARBEIDSLEDIG_UTLAND
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
        await gaVidere(page, steg)

        // EGENMELDINGER
        await svarJaHovedsporsmal(page)
        await svarSykMedEgenmelding(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // FRAVAR_FOR_SYKMELDINGEN
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // ENKELTSTAENDE_BEHANDLINGSDAGER
        await velgBehandlingsdager(page)
        await gaVidere(page, steg)

        // FERIE_V2
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // FERIE_PERMISJON_UTLAND
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Jeg tok ut ferie')
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // FRAVER_FOR_BEHANDLING
        await svarJaHovedsporsmal(page)
        await svarSykMedEgenmelding(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // FRISKMELDT
        await svarJaHovedsporsmal(page)
        await gaVidere(page, steg)

        // JOBBET_DU_100_PROSENT
        await svarJaHovedsporsmal(page)
        await velgTall(page, 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.', '12')
        await velgTimer(page, steg.value, soknad)
        await gaVidere(page, steg)

        // JOBBET_DU_GRADERT
        await svarJaHovedsporsmal(page)
        await velgTall(page, 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.', '12')
        await velgTimer(page, steg.value, soknad)
        await gaVidere(page, steg)

        // LAND
        await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
        await page.getByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Søre fran')
        await page.getByRole('option', { name: 'Søre franske territorier' }).click()
        await page.locator('.navds-combobox__button-toggle-list').click()
        await gaVidere(page, steg)

        // LAND_COMBOBOX
        await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
        await page.locator('.navds-combobox__button-toggle-list').click()
        await gaVidere(page, steg)

        // PERIODEUTLAND
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // PERMISJON_V2
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // PERMITTERT_NAA
        await svarJaHovedsporsmal(page)
        await velgDato(page)
        await gaVidere(page, steg)

        // PERMITTERT_PERIODE
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // TILBAKE_I_ARBEID
        await svarJaHovedsporsmal(page)
        await velgDato(page)
        await gaVidere(page, steg)

        // UTDANNING
        await svarJaHovedsporsmal(page)
        await velgDato(page)
        await svarRadio(page, 'Er utdanningen et fulltidsstudium?', 'JA')
        await gaVidere(page, steg)

        // OPPHOLD_UTENFOR_EOS
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // UTLAND
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await svarRadio(page, 'Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
        await gaVidere(page, steg)

        // UTLAND_V2
        await svarJaHovedsporsmal(page)
        await setPeriodeFraTil(page, 12, 15)
        await gaVidere(page, steg)

        // BRUKTE_REISETILSKUDDET
        await svarJaHovedsporsmal(page)
        await gaVidere(page, steg)

        // TRANSPORT_TIL_DAGLIG
        await svarJaHovedsporsmal(page)
        await velgCheckbox(page, 'Offentlig transport')
        await velgTall(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '21')
        await gaVidere(page, steg)

        // REISE_MED_BIL
        await svarJaHovedsporsmal(page)
        await velgKalenderdag(page)
        await svarRadio(page, 'Hadde du utgifter til bompenger?', 'NEI')
        await gaVidere(page, steg)

        // KVITTERINGER
        await lastOppKvittering(page)
        await gaVidere(page, steg)

        // UTBETALING
        await svarJaHovedsporsmal(page)
        await gaVidere(page, steg)

        // ARBEID_UNDERVEIS_100_PROSENT
        await svarJaHovedsporsmal(page)
        await svarRadio(page, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
        await velgTall(page, 'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum', '12')
        await svarRadio(page, 'Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?', 'JA')
        await gaVidere(page, steg)

        // BOSTED
        await svarJaHovedsporsmal(page)
        await svarFritekst(page, 'Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
        await svarFritekst(page, 'Land', 'UK')
        await svarFritekst(page, 'Telefonnummer', '81549300')
        await velgDato(page, 4)
        await gaVidere(page, steg)

        // LØNNET ARBEID
        await svarJaHovedsporsmal(page)
        await svarFritekst(page, 'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge', 'Britiske staten')
        await gaVidere(page, steg)

        // Sykepenger i andre EU/EØS-land
        await svarNeiHovedsporsmal(page)
        await gaVidere(page, steg)

        // Kjente inntektskilder
        await svarRadioGruppe(page, 'Har du sluttet hos Rema før du ble sykmeldt 8. september', 'Nei')
        await svarRadioGruppe(page, 'Har du utført noe arbeid ved Rema i perioden 24. august - 7. september 2022?', 'Ja')
        await gaVidere(page, steg)

        // Tilkommen inntekt
        await svarJaHovedsporsmal(page)
        await svarFritekst(page, 'Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000')
        await gaVidere(page, steg)

        // Avviklet virksomhet
        await svarJaHovedsporsmal(page)
        await velgDato(page, 14)
        await gaVidere(page, steg)

        // Drift i virksomheten
        await svarNeiHovedsporsmal(page)
        await velgDato(page, 14)
        await gaVidere(page, steg)

        // Avklaring i forbindlese med reise
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')
        await klikkGaVidere(page)

        // Jobbsituasjonen din
        await svarNeiHovedsporsmal(page)
        await svarRadioGruppe(page, 'Vil du fortsatt være friskmeldt til arbeidsformidling?', 'Ja')
        await klikkGaVidere(page)

        // Inntekt underveis
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        // Reise til utlandet
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)

        // Søknad TIL_SLUTT
        await sporsmalOgSvar(page.locator('form'), 'Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000 kroner før skatt')
        await page.getByRole('button', { name: 'Send søknaden' }).click()

        // Søknad kvittering
        await expect(page).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))
        const kvittering = page.locator('[data-cy="kvittering"]')
        await expect(kvittering).toContainText('Hva skjer videre?')
        await expect(kvittering).toContainText('Før NAV kan behandle søknaden')
        await expect(kvittering).toContainText('NAV behandler søknaden')
        await expect(kvittering).toContainText('Når blir pengene utbetalt')
    })
})
