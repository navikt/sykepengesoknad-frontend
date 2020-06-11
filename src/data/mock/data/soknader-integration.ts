import { RSSoknad } from '../../../types/rs-types/rs-soknad'

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

export const avbruttSoknad = {
    'id': '94648c92-d8a5-4811-b6b9-30955ba24de4',
    'sykmeldingId': '470c9e25-e112-4060-be61-7a24af530889',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'AVBRUTT',
    'fom': '2020-05-20',
    'tom': '2020-06-04',
    'opprettetDato': '2020-06-05',
    'innsendtDato': null,
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': '2020-06-05',
    'startSykeforlop': '2020-05-20',
    'sykmeldingUtskrevet': '2020-05-20',
    'arbeidsgiver': {
        'navn': '995816598 sitt orgnavn :)',
        'orgnummer': '995816598'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2020-05-20',
            'tom': '2020-06-04',
            'grad': 60,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '91',
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
        },
        {
            'id': '92',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Er du permittert nå?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '93',
                    'tag': 'PERMITTERT_NAA_NAR',
                    'sporsmalstekst': 'Velg første dag i permitteringen',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-01-20',
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '94',
            'tag': 'PERMITTERT_PERIODE',
            'sporsmalstekst': 'Har du vært permittert i noen perioder etter 1. februar 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '95',
                    'tag': 'PERMITTERT_PERIODE_NAR',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-02-01',
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '96',
            'tag': 'TILBAKE_I_ARBEID',
            'sporsmalstekst': 'Var du tilbake i fullt arbeid hos 995816598 sitt orgnavn :) i løpet av perioden 20. mai - 4. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '97',
                    'tag': 'TILBAKE_NAR',
                    'sporsmalstekst': 'Når begynte du å jobbe igjen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-05-20',
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': true,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '98',
            'tag': 'FERIE_V2',
            'sporsmalstekst': 'Tok du ut ferie mens du var sykmeldt 20. mai - 4. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '99',
                    'tag': 'FERIE_NAR_V2',
                    'sporsmalstekst': 'Når tok du ut ferie?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-05-20',
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '100',
            'tag': 'PERMISJON_V2',
            'sporsmalstekst': 'Tok du permisjon mens du var sykmeldt 20. mai - 4. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '101',
                    'tag': 'PERMISJON_NAR_V2',
                    'sporsmalstekst': 'Når tok du permisjon?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-05-20',
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '102',
            'tag': 'UTLAND_V2',
            'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 20. mai - 4. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '103',
                    'tag': 'UTLAND_NAR_V2',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-05-20',
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '104',
            'tag': 'JOBBET_DU_GRADERT_0',
            'sporsmalstekst': 'I perioden 20. mai - 4. juni 2020 skulle du jobbe 40 % av ditt normale arbeid hos 995816598 sitt orgnavn :). Jobbet du mer enn dette?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '105',
                    'tag': 'HVOR_MANGE_TIMER_PER_UKE_0',
                    'sporsmalstekst': 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                    'undertekst': 'timer per uke',
                    'svartype': 'TALL',
                    'min': '1',
                    'max': '150',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '106',
                    'tag': 'HVOR_MYE_HAR_DU_JOBBET_0',
                    'sporsmalstekst': 'Hvor mye jobbet du totalt 20. mai - 4. juni 2020 hos 995816598 sitt orgnavn :)?',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_TIMER_PROSENT',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '107',
                            'tag': 'HVOR_MYE_PROSENT_0',
                            'sporsmalstekst': 'prosent',
                            'undertekst': null,
                            'svartype': 'RADIO',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '108',
                                    'tag': 'HVOR_MYE_PROSENT_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'prosent',
                                    'svartype': 'TALL',
                                    'min': '41',
                                    'max': '99',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '109',
                            'tag': 'HVOR_MYE_TIMER_0',
                            'sporsmalstekst': 'timer',
                            'undertekst': null,
                            'svartype': 'RADIO',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '110',
                                    'tag': 'HVOR_MYE_TIMER_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'timer totalt',
                                    'svartype': 'TALL',
                                    'min': '1',
                                    'max': '343',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'id': '111',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du andre inntektskilder enn 995816598 sitt orgnavn :)?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '112',
                    'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
                    'sporsmalstekst': 'Hvilke andre inntektskilder har du?',
                    'undertekst': 'Du trenger ikke oppgi penger fra NAV',
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '113',
                            'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                            'sporsmalstekst': 'andre arbeidsforhold',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '114',
                                    'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '115',
                            'tag': 'INNTEKTSKILDE_SELVSTENDIG',
                            'sporsmalstekst': 'selvstendig næringsdrivende',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '116',
                                    'tag': 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '117',
                            'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                            'sporsmalstekst': 'dagmamma',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '118',
                                    'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '119',
                            'tag': 'INNTEKTSKILDE_JORDBRUKER',
                            'sporsmalstekst': 'jordbruk / fiske / reindrift',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '120',
                                    'tag': 'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '121',
                            'tag': 'INNTEKTSKILDE_FRILANSER',
                            'sporsmalstekst': 'frilanser',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '122',
                                    'tag': 'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '123',
                            'tag': 'INNTEKTSKILDE_ANNET',
                            'sporsmalstekst': 'annet',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': null,
                            'svar': [],
                            'undersporsmal': []
                        }
                    ]
                }
            ]
        },
        {
            'id': '124',
            'tag': 'UTDANNING',
            'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 20. mai - 4. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '125',
                    'tag': 'UTDANNING_START',
                    'sporsmalstekst': 'Når startet du på utdanningen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': null,
                    'max': '2020-06-04',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '126',
                    'tag': 'FULLTIDSSTUDIUM',
                    'sporsmalstekst': 'Er utdanningen et fulltidsstudium?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '127',
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
        },
        {
            'id': '128',
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
        }
    ],
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

export const soknaderIntegration = [ arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger, avbruttSoknad, fremtidigSøknad ] as any as RSSoknad[]
