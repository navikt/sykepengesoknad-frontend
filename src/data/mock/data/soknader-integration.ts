
export const fremtidigSøknad  = {
    'id': '5b74f271-5b94-455a-b79f-428f593f2b99',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'FREMTIDIG',
    'fom': '2020-05-23',
    'tom': '2020-06-07',
    'opprettetDato': '2020-06-08',
    'innsendtDato': null,
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-05-23',
    'sykmeldingUtskrevet': '2020-05-23',
    'arbeidsgiver': { 'navn': '995816598 sitt orgnavn :)', 'orgnummer': '995816598' },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [ {
        'fom': '2020-05-23',
        'tom': '2020-06-07',
        'grad': 100,
        'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
    } ],
    'sporsmal': [],
    'egenmeldtSykmelding': false
}


export const arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger = {
    'id': '5b74f271-5b94-455a-b79f-428f593f2b98',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-05-23',
    'tom': '2020-06-07',
    'opprettetDato': '2020-06-08',
    'innsendtDato': null,
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-05-23',
    'sykmeldingUtskrevet': '2020-05-23',
    'arbeidsgiver': { 'navn': '995816598 sitt orgnavn :)', 'orgnummer': '995816598' },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [ {
        'fom': '2020-05-23',
        'tom': '2020-06-07',
        'grad': 100,
        'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
    } ],
    'sporsmal': [ {
        'id': '636',
        'tag': 'ANSVARSERKLARING',
        'sporsmalstekst': 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        'undertekst': null,
        'svartype': 'CHECKBOX_PANEL',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    }, {
        'id': '655',
        'tag': 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
        'sporsmalstekst': 'Har du søkt om å beholde sykepengene for de dagene du var utenfor EØS?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    }, {
        'id': '680',
        'tag': 'VAER_KLAR_OVER_AT',
        'sporsmalstekst': 'Viktig å være klar over:',
        'undertekst': '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/sykepenger" target="_blank">nav.no/sykepenger</a>.</p>',
        'svartype': 'IKKE_RELEVANT',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    }, {
        'id': '681',
        'tag': 'BEKREFT_OPPLYSNINGER',
        'sporsmalstekst': 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        'undertekst': null,
        'svartype': 'CHECKBOX_PANEL',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    } ],
    'egenmeldtSykmelding': false
}

export const soknaderIntegration: any[] = [ arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger, fremtidigSøknad ]
