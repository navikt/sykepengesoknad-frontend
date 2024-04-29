import {
    checkViStolerPåDeg,
    harFeilISkjemaet,
    harFlereFeilISkjemaet,
    klikkGaVidere,
    neiOgVidere,
    svarRadioSporsmal,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    svarCheckboxSporsmal,
    svarDato,
    checkJegHarLestOgSend,
} from '../../support/utilities'

describe('Tester selvstendig naringsdrivende søknad', () => {
    before(() => {
        cy.visit(
            '/syk/sykepengesoknad/soknader/a8e40578-682b-4a04-bfda-b7768af2ae55/1?testperson=selvstendig-naringsdrivende',
        )
    })

    it('Svarer på spørsmål', function () {
        checkViStolerPåDeg()

        neiOgVidere([
            'Tilbake i fullt arbeid',
            'Jobb underveis i sykefraværet',
            'Andre inntektskilder',
            'Utenlandsopphold',
            'Arbeid utenfor Norge',
        ])
    })

    it('Virksomheten din', function () {
        klikkGaVidere(true)
        harFeilISkjemaet('Du må svare på om virksomheten har blitt avviklet og slettet')
        svarJaHovedsporsmal()
        cy.contains('Når opphørte driften i virksomheten?')
        klikkGaVidere(true)
        harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')
        svarNeiHovedsporsmal()
        klikkGaVidere(true)
        harFeilISkjemaet('Du må svare på om du er ny i arbeidslivet')
        svarRadioSporsmal('Er du ny i arbeidslivet etter 1.1.2019?', 'Ja')
        cy.contains('Du har oppgitt at du er ny i arbeidslivet.')
        klikkGaVidere(true)

        harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')
        svarRadioSporsmal('Er du ny i arbeidslivet etter 1.1.2019?', 'Nei')
        klikkGaVidere(true)

        harFeilISkjemaet('Du må svare på om det har skjedd en varig endring')
        cy.contains('Eksempler på varig endring')

        svarRadioSporsmal(
            'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1.1.2019 og frem til sykmeldingstidspunktet?',
            'Nei',
        )
        svarRadioSporsmal(
            'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1.1.2019 og frem til sykmeldingstidspunktet?',
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
        cy.contains(
            'Du har oppgitt en varig endring i arbeidssituasjonen eller virksomheten din som har ført til en endring i inntekt på mer enn 25 prosent.',
        )
        klikkGaVidere(true)
        harFeilISkjemaet('Datoen følger ikke formatet dd.mm.åååå')

        svarDato('Når skjedde den siste varige endringen?', '12.03.2020')

        klikkGaVidere()
    })

    it('Til slutt ', function () {
        checkJegHarLestOgSend()
    })

    it('Kvittering', function () {
        cy.contains('Søknaden er sendt til NAV')
        cy.contains('Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.')
        cy.contains('Skattemelding/Næringsspesifikasjon hvis den er klar')
    })
})
