import {
    checkViStolerPaDeg,
    harFeilISkjemaet,
    harFlereFeilISkjemaet,
    klikkGaVidere,
    neiOgVidere,
    sporsmalOgSvar,
    svarCheckboxSporsmal,
    svarDato,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarRadioSporsmal,
} from '../../support/utilities'

describe('Tester selvstendig naringsdrivende søknad', () => {
    before(() => {
        cy.visit(
            '/syk/sykepengesoknad/soknader/2faff926-5261-42e5-927b-02e4aa44a7ad/1?testperson=selvstendig-naringsdrivende',
        )
    })

    it('Svarer på vi stoler på deg', function () {
        checkViStolerPaDeg()
    })

    it('Svarer på spørsmål', function () {
        neiOgVidere([
            'Tilbake i fullt arbeid',
            'Jobb underveis i sykefraværet',
            'Andre inntektskilder',
            'Reise til utlandet',
            'Arbeid utenfor Norge',
        ])
    })

    it('Virksomheten din', function () {
        klikkGaVidere(true)
        harFeilISkjemaet('Du må svare på om virksomheten har blitt avviklet og slettet')
        svarJaHovedsporsmal()
        cy.contains('Når ble virksomheten avviklet?')
        klikkGaVidere(true)
        harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')
        svarNeiHovedsporsmal()
        cy.contains('Datoen er første dag i det i det første av tre av de ferdiglignede årene.')
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
        cy.contains(
            'Unntak kan gjøres hvis inntekten din har endret seg varig mer enn 25 prosent på grunn av endringer i arbeidssituasjonen.',
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
        svarRadioSporsmal(
            'Har det skjedd en varig endring mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
            'Ja',
        )
        klikkGaVidere(true)

        harFlereFeilISkjemaet(2, [
            'Du må svare på hvilken endring som har skjedd',
            'Du må svare på om du har hatt mer enn 25 prosent endring i årsinntekten din',
        ])

        svarCheckboxSporsmal(
            'Hvilken endring har skjedd i din arbeidssituasjon eller virksomhet?',
            'Endret markedssituasjon',
        )

        harFeilISkjemaet('Du må svare på om du har hatt mer enn 25 prosent endring i årsinntekten din')

        svarRadioSporsmal(
            'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
            'Ja',
        )
        cy.contains('Etter du har sendt inn søknaden trenger vi dokumentasjon på den varige endringen din.')
        klikkGaVidere(true)
        harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')

        svarDato('Når skjedde den siste varige endringen?', '12.03.2020')

        klikkGaVidere()
    })

    it('Søknad TIL_SLUTT ', function () {
        sporsmalOgSvar(
            'Har du registrert virksomheten din som avviklet og slettet i Altinn før du ble sykmeldt?',
            'Nei',
        )
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
                                sporsmalOgSvar(
                                    'Hvilken endring har skjedd i din arbeidssituasjon eller virksomhet?',
                                    'Endret markedssituasjon',
                                )
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

    it('Kvittering', function () {
        cy.contains('Søknaden er sendt til NAV')
        cy.contains('Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.')
        cy.contains('Skattemelding/Næringsspesifikasjon hvis den er klar')
    })
})
