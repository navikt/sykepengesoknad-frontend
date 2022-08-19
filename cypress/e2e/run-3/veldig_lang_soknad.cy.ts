import { veldigLangSoknad } from '../../../src/data/mock/data/soknader-integration'
import { Soknad } from '../../../src/types/types'

describe('Tester støtte for gamle spørsmål', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: faba11f5-123-abc-8c8a-58b28ce2f3ef, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = new Soknad(veldigLangSoknad as any) as Soknad
    let steg = 1

    function svarJaHovedsporsmal() {
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
    }

    function svarNeiHovedsporsmal() {
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
    }

    function svarCheckboxPanel() {
        cy.get('.navds-checkbox__label').click({ force: true })
    }

    function velgDato() {
        const velgDato = 10
        const className = '.ds-datepicker__kalenderknapp'

        cy.get(className).click()
        cy.get('.DayPicker-Day').contains(velgDato).first().click()
    }

    function velgPeriode() {
        const fom = '12'
        const tom = '15'
        const className = '.ds-datepicker__kalenderknapp'

        cy.get('.fom ' + className).click()
        cy.get('.DayPicker-Day').contains(fom).click()
        cy.get('.tom ' + className).click()
        cy.get('.DayPicker-Day').contains(tom).click()
    }

    function velgKalenderdag() {
        const dag = '13'
        cy.get('.kalenderdag.inni').contains(dag).click()
    }

    function velgTimer() {
        const id = soknad.sporsmal[steg - 1].undersporsmal[1].undersporsmal[1].undersporsmal[0].id
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=timer]').focus().click({ force: true })
        cy.get(`.undersporsmal .navds-text-field__input#${id}`).focus().type('21')
    }

    function velgTall(sporsmalstekst: string, verdi: string) {
        cy.contains(sporsmalstekst).get('.navds-text-field__input').type(verdi)
    }

    function velgCheckbox(gjelder: string) {
        cy.get('.undersporsmal .checkboxgruppe').contains(gjelder).click({ force: true })
    }

    function svarRadioJaEllerNei(gjelder: string, svar: 'Ja' | 'Nei') {
        cy.contains(gjelder).siblings().contains(svar).click({ force: true })
    }

    function svarSykMedEgenmelding() {
        cy.contains('Jeg var syk med egenmelding').click({ force: true })
    }

    function velgBehandlingsdager() {
        cy.get('.skjema__beh-dager').contains('10').click({ force: true })
        cy.get('.skjema__beh-dager').contains('16').click({ force: true })
    }

    function velgLand(land: string) {
        cy.get('.skjemaelement__input').type(land)
        cy.contains(land).click({ force: true })
    }

    function lastOppKvittering() {
        cy.get('.fler-vedlegg').click()
        cy.contains('Legg til reiseutgift')
        cy.get('select[name=transportmiddel]').select('TAXI')
        cy.get('input[name=belop_input]').type('1234')
        cy.get('.filopplasteren input[type=file]').attachFile('kvittering.jpg')
        cy.get('.lagre-kvittering').contains('Bekreft').click()
    }

    function gaVidere() {
        cy.contains('Gå videre').click({ force: true })
        cy.url().should('include', `${soknad.id}/${++steg}`)
    }

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=alle-soknader')
    })

    it('Laster startside', () => {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })
    it('ANSVARSERKLARING', () => {
        svarCheckboxPanel()
        gaVidere()
    })

    it('ANDRE_INNTEKTSKILDER', () => {
        svarJaHovedsporsmal()
        velgCheckbox('dagmamma')
        svarRadioJaEllerNei('Er du sykmeldt fra dette?', 'Ja')
        gaVidere()
    })
    it('ANDRE_INNTEKTSKILDER', () => {
        svarJaHovedsporsmal()
        velgCheckbox('frilanser')
        svarRadioJaEllerNei('Er du sykmeldt fra dette?', 'Ja')
        gaVidere()
    })
    it('ARBEID_UTENFOR_NORGE', () => {
        svarNeiHovedsporsmal()
        gaVidere()
    })
    it('ARBEIDSGIVER', () => {
        svarJaHovedsporsmal()
        svarRadioJaEllerNei('Er du 100 % sykmeldt?', 'Ja')
        svarRadioJaEllerNei('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?', 'Ja')
        gaVidere()
    })
    it('ARBEIDSLEDIG_UTLAND', () => {
        svarJaHovedsporsmal()
        velgPeriode()
        svarRadioJaEllerNei('Har du søkt om å beholde sykepengene for disse dagene?', 'Ja')
        gaVidere()
    })
    it('EGENMELDINGER', () => {
        svarJaHovedsporsmal()
        svarSykMedEgenmelding()
        velgPeriode()
        gaVidere()
    })
    it('FRAVAR_FOR_SYKMELDINGEN', () => {
        svarJaHovedsporsmal()
        velgPeriode()
        gaVidere()
    })
    it('ENKELTSTAENDE_BEHANDLINGSDAGER', () => {
        velgBehandlingsdager()
        gaVidere()
    })
    it('FERIE_V2', () => {
        svarJaHovedsporsmal()
        velgPeriode()
        gaVidere()
    })
    it('FERIE_PERMISJON_UTLAND', () => {
        svarJaHovedsporsmal()
        velgCheckbox('Jeg tok ut ferie')
        velgPeriode()
        gaVidere()
    })
    it('FRAVER_FOR_BEHANDLING', () => {
        svarJaHovedsporsmal()
        svarSykMedEgenmelding()
        velgPeriode()
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
            '12'
        )
        velgTimer()
        gaVidere()
    })
    it('JOBBET_DU_GRADERT', () => {
        svarJaHovedsporsmal()
        velgTall(
            'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
            '12'
        )
        velgTimer()
        gaVidere()
    })
    it('LAND', () => {
        velgLand('franske')
        gaVidere()
    })
    it('PERIODEUTLAND', () => {
        velgPeriode()
        gaVidere()
    })
    it('PERMISJON_V2', () => {
        svarJaHovedsporsmal()
        velgPeriode()
        gaVidere()
    })
    it('PERMITTERT_NAA', () => {
        svarJaHovedsporsmal()
        velgDato()
        gaVidere()
    })
    it('PERMITTERT_PERIODE', () => {
        svarJaHovedsporsmal()
        velgPeriode()
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
        svarRadioJaEllerNei('Er utdanningen et fulltidsstudium?', 'Ja')
        gaVidere()
    })
    it('UTLAND', () => {
        svarJaHovedsporsmal()
        velgPeriode()
        svarRadioJaEllerNei('Har du søkt om å beholde sykepengene for disse dagene?', 'Ja')
        gaVidere()
    })
    it('UTLAND_V2', () => {
        svarJaHovedsporsmal()
        velgPeriode()
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
        svarRadioJaEllerNei('Hadde du utgifter til bompenger?', 'Nei')
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

    it('VAER_KLAR_OVER_AT & BEKREFT_OPPLYSNINGER', () => {
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
    })
    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('.hva-skjer')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Før NAV kan behandle søknaden')
            .and('contain', 'Hvorfor går det et skille ved 16 dager?')
            .and('contain', 'Hva er en inntektsmelding')
            .and('contain', 'NAV behandler søknaden')
            .and('contain', 'Når blir pengene utbetalt')
    })
})
