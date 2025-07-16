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
} from '../../support/utilities'
import 'cypress-file-upload'
import { veldigLangSoknad } from '../../../src/data/mock/data/soknad/veldig-lang-soknad'
import { rsToSoknad } from '../../../src/types/mapping'
import 'cypress-real-events'

describe('Tester støtte for gamle spørsmål', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: 214f6e73-8150-4261-8ce5-e2b41907fa58, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = rsToSoknad(veldigLangSoknad)
    let steg = 1

    function velgKalenderdag() {
        cy.get('[aria-label="mandag 13"]').click()
    }

    function velgTimer() {
        const id = soknad.sporsmal[steg - 1].undersporsmal[1].undersporsmal[1].undersporsmal[0].id
        cy.get('.undersporsmal input[value=timer]').click()
        cy.get(`.undersporsmal .navds-text-field__input#${id}`).type('21')
    }

    function velgTall(sporsmalstekst: string, verdi: string) {
        cy.contains(sporsmalstekst).get('.navds-text-field__input').type(verdi)
    }

    function velgCheckbox(gjelder: string) {
        cy.get('.undersporsmal .navds-checkbox').contains(gjelder).click()
    }

    function svarRadio(gjelder: string, svar: 'JA' | 'NEI' | 'Prosent' | 'Timer') {
        cy.contains(gjelder)
            .siblings()
            .eq(0)
            .within(() => {
                cy.get(`input[value="${svar}"]`).click()
            })
    }

    function svarSykMedEgenmelding() {
        cy.contains('Jeg var syk med egenmelding').click()
    }

    function velgBehandlingsdager() {
        cy.get('.rdp-day').contains('10').click()
        cy.get('.rdp-day').contains('16').click()
    }

    function lastOppKvittering() {
        cy.get('button').contains('Legg til reiseutgift').click()
        cy.get('select[name=transportmiddel]').select('TAXI')
        cy.get('input[name=belop_input]').type('1234')
        cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.jpg')
        cy.get('button').contains('Bekreft').click()
    }

    function gaVidere() {
        klikkGaVidere()
        cy.url().should('include', `${soknad.id}/${++steg}`)
    }

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    it('Laster startside', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })
    it('ANSVARSERKLARING', () => {
        checkViStolerPaDeg()
        ++steg
    })
    it('YRKESSKADE', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('YRKESSKADE_V2', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('ARBEID_UNDERVEIS_100_PROSENT_0', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })

    it('MEDLEMSKAP_OPPHOLDSTILLATELSE', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('MEDLEMSKAP_OPPHOLDSTILLATELSE_V2', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('MEDLEMSKAP_OPPHOLD_UTENFOR_EOS', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('ANDRE_INNTEKTSKILDER', () => {
        svarJaHovedsporsmal()
        velgCheckbox('dagmamma')
        svarRadio('Er du sykmeldt fra dette?', 'JA')
        gaVidere()
    })

    it('ANDRE_INNTEKTSKILDER', () => {
        svarJaHovedsporsmal()
        velgCheckbox('frilanser')
        svarRadio('Er du sykmeldt fra dette?', 'JA')
        gaVidere()
    })
    it('ANDRE_INNTEKTSKILDER_V2', () => {
        svarJaHovedsporsmal()
        velgCheckbox('dagmamma')
        gaVidere()
    })
    it('ANDRE_INNTEKTSKILDER_V2', () => {
        svarJaHovedsporsmal()
        velgCheckbox('Dagmamma')
        gaVidere()
    })
    it('ANDRE_INNTEKTSKILDER_V2_SI_NEI_HOVEDSPORSMAL', () => {
        svarJaHovedsporsmal()
        velgCheckbox('Dagmamma')
        gaVidere()
    })
    it('ARBEID_UTENFOR_NORGE', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('ARBEIDSGIVER', () => {
        svarJaHovedsporsmal()
        svarRadio('Er du 100 % sykmeldt?', 'JA')
        svarRadio('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?', 'JA')
        gaVidere()
    })
    it('ARBEIDSLEDIG_UTLAND', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        svarRadio('Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
        gaVidere()
    })
    it('EGENMELDINGER', () => {
        svarJaHovedsporsmal()
        svarSykMedEgenmelding()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('FRAVAR_FOR_SYKMELDINGEN', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('ENKELTSTAENDE_BEHANDLINGSDAGER', () => {
        velgBehandlingsdager()
        gaVidere()
    })
    it('FERIE_V2', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('FERIE_PERMISJON_UTLAND', () => {
        svarJaHovedsporsmal()
        velgCheckbox('Jeg tok ut ferie')
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('FRAVER_FOR_BEHANDLING', () => {
        svarJaHovedsporsmal()
        svarSykMedEgenmelding()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('FRISKMELDT', () => {
        svarJaHovedsporsmal()
        gaVidere()
    })
    it('JOBBET_DU_100_PROSENT', () => {
        svarJaHovedsporsmal()
        velgTall(
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
            '12',
        )
        velgTimer()
        gaVidere()
    })
    it('JOBBET_DU_GRADERT', () => {
        svarJaHovedsporsmal()
        velgTall(
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
            '12',
        )
        velgTimer()
        gaVidere()
    })
    it('LAND', () => {
        cy.contains('Hvilke(t) land skal du reise til?')
        cy.findByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Søre fran')
        cy.findByRole('option', { name: 'Søre franske territorier' }).click()

        cy.get('.navds-combobox__button-toggle-list').click()
        gaVidere()
    })
    it('LAND_COMBOBOX', () => {
        cy.contains('Hvilke(t) land skal du reise til?')
        svarCombobox('Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
        cy.get('.navds-combobox__button-toggle-list').click()
        gaVidere()
    })
    it('PERIODEUTLAND', () => {
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('PERMISJON_V2', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('PERMITTERT_NAA', () => {
        svarJaHovedsporsmal()
        velgDato()
        gaVidere()
    })
    it('PERMITTERT_PERIODE', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('TILBAKE_I_ARBEID', () => {
        svarJaHovedsporsmal()
        velgDato()
        gaVidere()
    })
    it('UTDANNING', () => {
        svarJaHovedsporsmal()
        velgDato()
        svarRadio('Er utdanningen et fulltidsstudium?', 'JA')
        gaVidere()
    })
    it('OPPHOLD_UTENFOR_EOS', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('UTLAND', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        svarRadio('Har du søkt om å beholde sykepengene for disse dagene?', 'JA')
        gaVidere()
    })
    it('UTLAND_V2', () => {
        svarJaHovedsporsmal()
        setPeriodeFraTil(12, 15)
        gaVidere()
    })
    it('BRUKTE_REISETILSKUDDET', () => {
        svarJaHovedsporsmal()
        gaVidere()
    })
    it('TRANSPORT_TIL_DAGLIG', () => {
        svarJaHovedsporsmal()
        velgCheckbox('Offentlig transport')
        velgTall('Hvor mye betaler du vanligvis i måneden for offentlig transport?', '21')
        gaVidere()
    })
    it('REISE_MED_BIL', () => {
        svarJaHovedsporsmal()
        velgKalenderdag()
        svarRadio('Hadde du utgifter til bompenger?', 'NEI')
        gaVidere()
    })
    it('KVITTERINGER', () => {
        lastOppKvittering()
        gaVidere()
    })
    it('UTBETALING', () => {
        svarJaHovedsporsmal()
        gaVidere()
    })
    it('ARBEID_UNDERVEIS_100_PROSENT', () => {
        svarJaHovedsporsmal()
        svarRadio('Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
        velgTall('Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum', '12')
        svarRadio('Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?', 'JA')
        gaVidere()
    })

    it('BOSTED', () => {
        svarJaHovedsporsmal()
        svarFritekst('Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
        svarFritekst('Land', 'UK')
        svarFritekst('Telefonnummer', '81549300')
        velgDato(4)

        gaVidere()
    })
    it('LØNNET ARBEID', () => {
        svarJaHovedsporsmal()
        svarFritekst('Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge', 'Britiske staten')
        gaVidere()
    })
    it('Sykepenger i andre EU/EØS-land', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('Kjente inntektskilder', () => {
        svarRadioGruppe('Har du sluttet hos Rema før du ble sykmeldt 8. september', 'Nei')
        svarRadioGruppe('Har du utført noe arbeid ved Rema i perioden 24. august - 7. september 2022?', 'Ja')

        gaVidere()
    })
    it('Tilkommen inntekt', () => {
        svarJaHovedsporsmal()
        svarFritekst('Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000')
        gaVidere()
    })

    it('Avviklet virksomhet', () => {
        svarJaHovedsporsmal()
        velgDato(14)
        gaVidere()
    })
    it('Drift i virksomheten', () => {
        svarNeiHovedsporsmal()
        velgDato(14)
        gaVidere()
    })
    it('Avklaring i forbindlese med reise', function () {
        svarRadioGruppe('Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
        svarRadioGruppe('Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')
        klikkGaVidere()
    })
    it('Jobbsituasjonen din', () => {
        svarNeiHovedsporsmal()
        svarRadioGruppe('Vil du fortsatt være friskmeldt til arbeidsformidling?', 'Ja')
        klikkGaVidere()
    })
    it('Inntekt underveis', () => {
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })
    it('Reise utenfor EU/EØS', () => {
        svarNeiHovedsporsmal()
        klikkGaVidere()
    })
    it('Søknad TIL_SLUTT', () => {
        sporsmalOgSvar('Hvor mye har du tjent i perioden 20. – 24. april 2020?', '25000 kroner før skatt')

        cy.contains('Send søknaden').click()
    })
    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('[data-cy="kvittering"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Før NAV kan behandle søknaden')
            .and('contain', 'NAV behandler søknaden')
            .and('contain', 'Når blir pengene utbetalt')
    })
})
