import {
    harFeilISkjemaet,
    harFlereFeilISkjemaet,
    klikkGaVidere,
    sporsmalOgSvar,
    svarCheckboxSporsmal,
    svarDato,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarRadioSporsmal,
    modalIkkeAktiv,
    svarFritekst,
    modalAktiv,
    sjekkMainContentFokus,
} from '../../support/utilities'

describe('Tester selvstendig naringsdrivende søknad med data fra Sigrun', () => {
    before(() => {
        cy.visit(
            '/syk/sykepengesoknad/soknader/bd6f6207-3888-4210-a4c0-cbe6806b5d00/7?testperson=selvstendig-naringsdrivende',
        )
    })

    it('Virksomheten din', function () {
        fellesInnholdFørVisningAvSigrunData()

        cy.contains('Datoen er første dag i det første av tre av de ferdiglignede årene.')

        cy.contains('Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?')
        cy.contains('Din gjennomsnittlige årsinntekt på sykmeldingstidspunktet: 450 000 kroner.')
        cy.contains(
            'Har du en årsinntekt som gjør at du tjener mindre enn 337 500 kroner eller mer enn 562 500 kroner?',
        )

        cy.contains('Hvordan har vi kommet frem til 450 000 kroner?').click()
        cy.contains('Vi henter informasjon om inntekt fra Skatteetaten.').should('be.visible')
        cy.contains('2020: 400 000 kroner').should('be.visible')
        cy.contains('2021: 450 000 kroner').should('be.visible')
        cy.contains('2022: 500 000 kroner').should('be.visible')

        fellesInnholdEtterVisningAvSigrunData()

        klikkGaVidere(false, true)
        cy.contains('Jeg vil ikke gi tilbakemelding').click()
        sjekkMainContentFokus()
    })
    tilSlutt()
    kvitteringen()
})

describe('Tester selvstendig naringsdrivende søknad uten data fra Sigrun', () => {
    before(() => {
        cy.visit(
            '/syk/sykepengesoknad/soknader/2faff926-5261-42e5-927b-02e4aa44a7ad/7?testperson=selvstendig-naringsdrivende',
        )
    })

    it('Virksomheten din', function () {
        fellesInnholdFørVisningAvSigrunData()

        cy.contains('Datoen er første dag i det første av tre av de ferdiglignede årene.').should('not.exist')

        cy.contains('Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?')
        cy.contains('Din gjennomsnittlige årsinntekt på sykmeldingstidspunktet: 450 000 kroner.').should('not.exist')
        cy.contains(
            'Har du en årsinntekt som gjør at du tjener mindre enn 337 500 kroner eller mer enn 562 500 kroner?',
        ).should('not.exist')

        cy.contains('Hvordan har vi kommet frem til 450 000 kroner?').should('not.exist')
        cy.get('span').filter(':contains("Spørsmålet forklart")').last().click()
        cy.contains('Sykepenger til selvstendig næringsdrivende').should('be.visible')
        cy.contains('Det kan likevel gjøres unntak').should('be.visible')
        cy.contains('Vi skjønner at det noen ganger ').should('be.visible')

        fellesInnholdEtterVisningAvSigrunData()

        klikkGaVidere(true)
    })

    it('svar på flexjar survey', () => {
        cy.url().should('include', 'visSurvey=true')
        modalAktiv()
        cy.contains(
            'Har du nok informasjon til å kunne svare på spørsmålet om endring i årsinntekten, spesielt om du har hatt en endring på 25%?',
        )
        cy.findByRole('button', { name: 'Ja' }).click()
        svarFritekst('Er det noe du vil trekke frem? (valgfritt)', 'Har kontroll på alt')
        cy.contains('Send tilbakemelding').click()
        modalIkkeAktiv()
    })

    tilSlutt()
    kvitteringen()
})

function fellesInnholdFørVisningAvSigrunData() {
    klikkGaVidere(true)
    harFeilISkjemaet('Du må svare på om virksomheten har blitt avviklet og slettet')
    svarJaHovedsporsmal()
    cy.contains('Når ble virksomheten avviklet?')
    klikkGaVidere(true)
    harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')
    svarNeiHovedsporsmal()
    klikkGaVidere(true)
    harFeilISkjemaet('Du må svare på om du er ny i arbeidslivet')
    svarRadioSporsmal('Er du ny i arbeidslivet etter 1. januar 2019?', 'Ja')
    cy.contains('Du har oppgitt at du er ny i arbeidslivet.')
    klikkGaVidere(true)
    harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')
    svarRadioSporsmal('Er du ny i arbeidslivet etter 1. januar 2019?', 'Nei')
    klikkGaVidere(true)
    harFeilISkjemaet('Du må svare på om det har skjedd en varig endring')

    cy.contains('Beregning av sykepengegrunnlaget')
    cy.contains(
        'Sykepenger for selvstendig næringsdrivende baseres vanligvis på gjennomsnittlig årsinntekt de tre siste ferdiglignede årene.',
    )
    cy.contains('Hvis du ikke har tre ferdiglignede år, vil sykepengegrunnlaget fastsettes ved skjønn.')

    cy.contains('Hva betyr ferdiglignet inntekt?').click()
    cy.contains(
        'Ferdiglignet inntekt betyr den endelige inntekten som er beregnet og godkjent av skattemyndighetene etter at selvangivelsen eller skattemeldingen er gjennomgått.',
    ).should('be.visible')

    cy.contains('Varig endring i din arbeidssituasjon eller virksomhet')
    cy.contains('Eksempler på varig endring')
    cy.contains('Avsluttet eller startet andre arbeidsforhold ved siden av virksomheten')
    svarRadioSporsmal(
        'Har det skjedd en varig endring mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
        'Nei',
    )
    svarRadioSporsmal('Har det skjedd en varig endring mellom 1. januar 2019 og frem til sykmeldingstidspunktet?', 'Ja')
}

function fellesInnholdEtterVisningAvSigrunData() {
    klikkGaVidere(true)

    harFlereFeilISkjemaet(2, [
        'Du må svare på hvilken endring som har skjedd',
        'Du må svare på om du har hatt mer enn 25 prosent endring i årsinntekten din',
    ])

    svarCheckboxSporsmal('Hvilken endring har skjedd?', 'Endret markedssituasjon')

    harFeilISkjemaet('Du må svare på om du har hatt mer enn 25 prosent endring i årsinntekten din')

    svarRadioSporsmal(
        'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
        'Ja',
    )
    cy.contains('Etter du har sendt inn søknaden trenger vi dokumentasjon på inntekten din etter den varige endringen.')
    klikkGaVidere(true)
    harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')

    svarDato('Når skjedde den siste varige endringen?', '12.03.2020')
}

function tilSlutt() {
    it('Til slutt ', function () {
        sporsmalOgSvar('Har du avviklet virksomheten din før du ble sykmeldt?', 'Nei')
            .children()
            .within(() => {
                sporsmalOgSvar('Er du ny i arbeidslivet etter 1. januar 2019?', 'Nei')
                    .children()
                    .within(() => {
                        sporsmalOgSvar(
                            'Har det skjedd en varig endring mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
                            'Ja',
                        )
                            .children()
                            .within(() => {
                                sporsmalOgSvar('Hvilken endring har skjedd?', 'Endret markedssituasjon')
                                sporsmalOgSvar(
                                    'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
                                    'Ja',
                                )
                                    .children()
                                    .within(() => {
                                        sporsmalOgSvar('Når skjedde den siste varige endringen?', '12.03.2020')
                                    })
                            })
                    })
            })
        cy.contains('Send søknaden').click()
    })
}

function kvitteringen() {
    it('Kvittering', function () {
        cy.contains('Søknaden er sendt til NAV')
        cy.contains('Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.')
        cy.contains('Skattemelding/Næringsspesifikasjon hvis den er klar')
    })
}
