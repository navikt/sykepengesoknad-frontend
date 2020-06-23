import { RSSoknad } from '../../../types/rs-types/rs-soknad'

export const fremtidigSoknad: RSSoknad = {
    'id': '5b74f271-5b94-455a-b79f-428f593f2b99',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'FREMTIDIG',
    'fom': '2020-05-23',
    'tom': '2020-06-07',
    'opprettetDato': '2020-06-08',
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

export const utgattSoknad: RSSoknad = {
    'id': '5b74f271-5b94-455a-b79f-428f593f2b90',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'UTGAATT',
    'fom': '2020-05-23',
    'tom': '2020-06-07',
    'opprettetDato': '2020-06-08',
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

export const avbruttSoknad: RSSoknad = {
    'id': '811d15b2-2a76-4623-9530-1ba55617e0a5',
    'sykmeldingId': 'ff5a4a27-2d76-4e12-9786-c7e4f31121e6',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'AVBRUTT',
    'fom': '2020-05-20',
    'tom': '2020-06-05',
    'opprettetDato': '2020-06-12',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': '2020-06-12',
    'startSykeforlop': '2020-05-20',
    'sykmeldingUtskrevet': '2020-05-27',
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
            'tom': '2020-06-05',
            'grad': 80,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '84',
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
            'id': '85',
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
                    'id': '86',
                    'tag': 'PERMITTERT_NAA_NAR',
                    'sporsmalstekst': 'Velg første dag i permitteringen',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-01-20',
                    'max': '2020-06-05',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '87',
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
                    'id': '88',
                    'tag': 'PERMITTERT_PERIODE_NAR',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-02-01',
                    'max': '2020-06-05',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '89',
            'tag': 'EGENMELDINGER',
            'sporsmalstekst': 'Vi har registrert at du ble sykmeldt onsdag 20. mai 2020. Var du syk og borte fra jobb i perioden 4. - 19. mai 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '90',
                    'tag': 'TIDLIGERE_SYK',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '91',
                            'tag': 'TIDLIGERE_EGENMELDING',
                            'sporsmalstekst': 'Jeg var syk med egenmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '92',
                                    'tag': 'EGENMELDINGER_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 20. mai 2020.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2019-11-20',
                                    'max': '2020-05-19',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '93',
                            'tag': 'TIDLIGERE_PAPIRSYKMELDING',
                            'sporsmalstekst': 'Jeg var syk med papirsykmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '94',
                                    'tag': 'PAPIRSYKMELDING_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 20. mai 2020.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2019-11-20',
                                    'max': '2020-05-19',
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
            'id': '95',
            'tag': 'TILBAKE_I_ARBEID',
            'sporsmalstekst': 'Var du tilbake i fullt arbeid hos 995816598 sitt orgnavn :) i løpet av perioden 20. mai - 5. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '96',
                    'tag': 'TILBAKE_NAR',
                    'sporsmalstekst': 'Når begynte du å jobbe igjen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-05-20',
                    'max': '2020-06-05',
                    'pavirkerAndreSporsmal': true,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '97',
            'tag': 'FERIE_V2',
            'sporsmalstekst': 'Tok du ut ferie mens du var sykmeldt 20. mai - 5. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '98',
                    'tag': 'FERIE_NAR_V2',
                    'sporsmalstekst': 'Når tok du ut ferie?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-05-20',
                    'max': '2020-06-05',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '99',
            'tag': 'PERMISJON_V2',
            'sporsmalstekst': 'Tok du permisjon mens du var sykmeldt 20. mai - 5. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '100',
                    'tag': 'PERMISJON_NAR_V2',
                    'sporsmalstekst': 'Når tok du permisjon?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-05-20',
                    'max': '2020-06-05',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '101',
            'tag': 'UTLAND_V2',
            'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 20. mai - 5. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '102',
                    'tag': 'UTLAND_NAR_V2',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-05-20',
                    'max': '2020-06-05',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '103',
            'tag': 'ARBEID_UTENFOR_NORGE',
            'sporsmalstekst': 'Utfører du arbeid andre steder enn i Norge?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '104',
            'tag': 'JOBBET_DU_GRADERT_0',
            'sporsmalstekst': 'I perioden 20. mai - 5. juni 2020 skulle du jobbe 20 % av ditt normale arbeid hos 995816598 sitt orgnavn :). Jobbet du mer enn dette?',
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
                    'sporsmalstekst': 'Hvor mye jobbet du totalt 20. mai - 5. juni 2020 hos 995816598 sitt orgnavn :)?',
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
                                    'min': '21',
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
                                    'max': '364',
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
            'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 20. mai - 5. juni 2020?',
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
                    'max': '2020-06-05',
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

export const arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger: RSSoknad = {
    'id': '5b74f271-5b94-455a-b79f-428f593f2b98',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-05-23',
    'tom': '2020-06-07',
    'opprettetDato': '2020-06-08',
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

export const sendtArbeidsledig: RSSoknad = {
    'id': '3848e75e-4069-4076-95c0-3f9f0b63e498',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSLEDIG',
    'status': 'SENDT',
    'fom': '2020-05-27',
    'tom': '2020-06-11',
    'opprettetDato': '2020-06-12',
    'sendtTilNAVDato': '2020-06-12T14:15:39.267',
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-05-27',
    'sykmeldingUtskrevet': '2020-05-27',
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSLEDIG',
    'soknadPerioder': [ {
        'fom': '2020-05-27',
        'tom': '2020-06-11',
        'grad': 100,
        'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
    } ],
    'sporsmal': [ {
        'id': '42',
        'tag': 'ANSVARSERKLARING',
        'sporsmalstekst': 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        'undertekst': null,
        'svartype': 'CHECKBOX_PANEL',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [ { 'verdi': 'CHECKED', 'avgittAv': null } ],
        'undersporsmal': []
    }, {
        'id': '43',
        'tag': 'PERMITTERT_NAA',
        'sporsmalstekst': 'Er du permittert nå?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '44',
            'tag': 'PERMITTERT_NAA_NAR',
            'sporsmalstekst': 'Velg første dag i permitteringen',
            'undertekst': null,
            'svartype': 'DATO',
            'min': '2020-01-27',
            'max': '2020-06-11',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '45',
        'tag': 'PERMITTERT_PERIODE',
        'sporsmalstekst': 'Har du vært permittert i noen perioder etter 1. februar 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '46',
            'tag': 'PERMITTERT_PERIODE_NAR',
            'sporsmalstekst': null,
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-02-01',
            'max': '2020-06-11',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '47',
        'tag': 'FRISKMELDT',
        'sporsmalstekst': 'Brukte du hele sykmeldingen fram til 11. juni 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'NEI',
        'svar': [ { 'verdi': 'JA', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '48',
            'tag': 'FRISKMELDT_START',
            'sporsmalstekst': 'Fra hvilken dato har du ikke lenger behov for sykmelding?',
            'undertekst': null,
            'svartype': 'DATO',
            'min': '2020-05-27',
            'max': '2020-06-11',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '49',
        'tag': 'ANDRE_INNTEKTSKILDER',
        'sporsmalstekst': 'Har du hatt inntekt mens du har vært sykmeldt i perioden 27. mai - 11. juni 2020? Du trenger ikke oppgi penger fra NAV.',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '50',
            'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Hvilke inntektskilder har du hatt?',
            'undertekst': null,
            'svartype': 'CHECKBOX_GRUPPE',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': [ {
                'id': '51',
                'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                'sporsmalstekst': 'andre arbeidsforhold',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '52',
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
                } ]
            }, {
                'id': '53',
                'tag': 'INNTEKTSKILDE_SELVSTENDIG',
                'sporsmalstekst': 'selvstendig næringsdrivende',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '54',
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
                } ]
            }, {
                'id': '55',
                'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                'sporsmalstekst': 'dagmamma',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '56',
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
                } ]
            }, {
                'id': '57',
                'tag': 'INNTEKTSKILDE_JORDBRUKER',
                'sporsmalstekst': 'jordbruk / fiske / reindrift',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '58',
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
                } ]
            }, {
                'id': '59',
                'tag': 'INNTEKTSKILDE_FRILANSER',
                'sporsmalstekst': 'frilanser',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '60',
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
                } ]
            }, {
                'id': '61',
                'tag': 'INNTEKTSKILDE_OMSORGSLONN',
                'sporsmalstekst': 'omsorgslønn fra kommunen',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '62',
                    'tag': 'INNTEKTSKILDE_OMSORGSLONN_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '63',
                'tag': 'INNTEKTSKILDE_FOSTERHJEM',
                'sporsmalstekst': 'fosterhjemgodtgjørelse',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '64',
                    'tag': 'INNTEKTSKILDE_FOSTERHJEM_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '65',
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
            } ]
        } ]
    }, {
        'id': '66',
        'tag': 'UTDANNING',
        'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 27. mai - 11. juni 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '67',
            'tag': 'UTDANNING_START',
            'sporsmalstekst': 'Når startet du på utdanningen?',
            'undertekst': null,
            'svartype': 'DATO',
            'min': null,
            'max': '2020-06-11',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }, {
            'id': '68',
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
        } ]
    }, {
        'id': '69',
        'tag': 'ARBEIDSLEDIG_UTLAND',
        'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 27. mai - 11. juni 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '70',
            'tag': 'UTLAND_NAR',
            'sporsmalstekst': 'Når var du utenfor EØS?',
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-05-27',
            'max': '2020-06-11',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }, {
            'id': '71',
            'tag': 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
            'sporsmalstekst': 'Har du søkt om å beholde sykepengene for disse dagene?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'NEI',
            'svar': [],
            'undersporsmal': [ {
                'id': '72',
                'tag': 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                'sporsmalstekst': null,
                'undertekst': '<p>I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target="_blank" href="https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland">søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
                'svartype': 'IKKE_RELEVANT',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': null,
                'svar': [],
                'undersporsmal': []
            } ]
        } ]
    }, {
        'id': '73',
        'tag': 'ARBEID_UTENFOR_NORGE',
        'sporsmalstekst': 'Utfører du arbeid andre steder enn i Norge?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': []
    }, {
        'id': '74',
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
        'id': '75',
        'tag': 'BEKREFT_OPPLYSNINGER',
        'sporsmalstekst': 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        'undertekst': null,
        'svartype': 'CHECKBOX_PANEL',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [ { 'verdi': 'CHECKED', 'avgittAv': null } ],
        'undersporsmal': []
    } ],
    'egenmeldtSykmelding': false
}

export const veldigLangSoknad: RSSoknad = {
    'id': 'faba11f5-123-abc-8c8a-58b28ce2f3ef',
    'sykmeldingId': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-04-01',
    'tom': '2020-04-24',
    'opprettetDato': '2020-05-13',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-04-01',
    'sykmeldingUtskrevet': '2020-03-31',
    'arbeidsgiver': {
        'navn': 'POSTEN NORGE AS, BÆRUM',
        'orgnummer': '974654458'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2020-04-01',
            'tom': '2020-04-24',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '687336',
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
            'id': '687356',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du andre inntektskilder enn POSTEN NORGE AS, BÆRUM?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687357',
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
                            'id': '687358',
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
                                    'id': '687359',
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
                            'id': '687360',
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
                                    'id': '687361',
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
                            'id': '687362',
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
                                    'id': '687363',
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
                            'id': '687364',
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
                                    'id': '687365',
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
                            'id': '687366',
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
                                    'id': '687367',
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
                            'id': '687368',
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
            'id': '49',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du hatt inntekt mens du har vært sykmeldt i perioden 27. mai - 11. juni 2020? Du trenger ikke oppgi penger fra NAV.',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [ {
                'id': '50',
                'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
                'sporsmalstekst': 'Hvilke inntektskilder har du hatt?',
                'undertekst': null,
                'svartype': 'CHECKBOX_GRUPPE',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': null,
                'svar': [],
                'undersporsmal': [
                    {
                        'id': '51',
                        'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                        'sporsmalstekst': 'andre arbeidsforhold',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '52',
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
                        } ]
                    },
                    {
                        'id': '53',
                        'tag': 'INNTEKTSKILDE_SELVSTENDIG',
                        'sporsmalstekst': 'selvstendig næringsdrivende',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '54',
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
                        } ]
                    },
                    {
                        'id': '55',
                        'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                        'sporsmalstekst': 'dagmamma',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '56',
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
                        } ]
                    },
                    {
                        'id': '57',
                        'tag': 'INNTEKTSKILDE_JORDBRUKER',
                        'sporsmalstekst': 'jordbruk / fiske / reindrift',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '58',
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
                        } ]
                    },
                    {
                        'id': '59',
                        'tag': 'INNTEKTSKILDE_FRILANSER',
                        'sporsmalstekst': 'frilanser',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '60',
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
                        } ]
                    },
                    {
                        'id': '61',
                        'tag': 'INNTEKTSKILDE_OMSORGSLONN',
                        'sporsmalstekst': 'omsorgslønn fra kommunen',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '62',
                            'tag': 'INNTEKTSKILDE_OMSORGSLONN_ER_DU_SYKMELDT',
                            'sporsmalstekst': 'Er du sykmeldt fra dette?',
                            'undertekst': null,
                            'svartype': 'JA_NEI',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': null,
                            'svar': [],
                            'undersporsmal': []
                        } ]
                    },
                    {
                        'id': '63',
                        'tag': 'INNTEKTSKILDE_FOSTERHJEM',
                        'sporsmalstekst': 'fosterhjemgodtgjørelse',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [ {
                            'id': '64',
                            'tag': 'INNTEKTSKILDE_FOSTERHJEM_ER_DU_SYKMELDT',
                            'sporsmalstekst': 'Er du sykmeldt fra dette?',
                            'undertekst': null,
                            'svartype': 'JA_NEI',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': null,
                            'svar': [],
                            'undersporsmal': []
                        } ]
                    },
                    {
                        'id': '65',
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
                    },
                    {
                        'id': '687440',
                        'tag': 'INNTEKTSKILDE_ARBEIDSFORHOLD',
                        'sporsmalstekst': 'arbeidsforhold',
                        'undertekst': null,
                        'svartype': 'CHECKBOX',
                        'min': null,
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': 'CHECKED',
                        'svar': [],
                        'undersporsmal': [
                            {
                                'id': '687441',
                                'tag': 'INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
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
                        'id': '687444',
                        'tag': 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG',
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
                                'id': '687445',
                                'tag': 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG_ER_DU_SYKMELDT',
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
                ]
            } ]
        },
        {
            'id': '103',
            'tag': 'ARBEID_UTENFOR_NORGE',
            'sporsmalstekst': 'Utfører du arbeid andre steder enn i Norge?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '3',
            'tag': 'ARBEIDSGIVER',
            'sporsmalstekst': 'Har du arbeidsgiver?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [ {
                'id': '4',
                'tag': 'SYKMELDINGSGRAD',
                'sporsmalstekst': 'Er du 100 % sykmeldt?',
                'undertekst': null,
                'svartype': 'JA_NEI',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': null,
                'svar': [],
                'undersporsmal': []
            }, {
                'id': '5',
                'tag': 'FERIE',
                'sporsmalstekst': 'Har du avtalt med arbeidsgiveren din at du skal ha ferie i hele perioden?',
                'undertekst': null,
                'svartype': 'JA_NEI',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': null,
                'svar': [],
                'undersporsmal': []
            } ]
        },
        {
            'id': '687422',
            'tag': 'ARBEIDSLEDIG_UTLAND',
            'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687423',
                    'tag': 'UTLAND_NAR',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-04-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '687424',
                    'tag': 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                    'sporsmalstekst': 'Har du søkt om å beholde sykepengene for disse dagene?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': 'NEI',
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '687425',
                            'tag': 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                            'sporsmalstekst': null,
                            'undertekst': '<p>DENNE SKAL IKKE VISES  I! utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target=\'_blank\' href=\'https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland\'>søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
                            'svartype': 'IKKE_RELEVANT',
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
            'id': '89',
            'tag': 'EGENMELDINGER',
            'sporsmalstekst': 'Vi har registrert at du ble sykmeldt onsdag 20. mai 2020. Var du syk og borte fra jobb i perioden 4. - 19. mai 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '90',
                    'tag': 'TIDLIGERE_SYK',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '91',
                            'tag': 'TIDLIGERE_EGENMELDING',
                            'sporsmalstekst': 'Jeg var syk med egenmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '92',
                                    'tag': 'EGENMELDINGER_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 20. mai 2020.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2019-11-20',
                                    'max': '2020-05-19',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '93',
                            'tag': 'TIDLIGERE_PAPIRSYKMELDING',
                            'sporsmalstekst': 'Jeg var syk med papirsykmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '94',
                                    'tag': 'PAPIRSYKMELDING_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 20. mai 2020.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2019-11-20',
                                    'max': '2020-05-19',
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
            'id': '687375',
            'tag': 'ENKELTSTAENDE_BEHANDLINGSDAGER_0',
            'sporsmalstekst': 'Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'INFO_BEHANDLINGSDAGER',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687376',
                    'tag': 'ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0',
                    'sporsmalstekst': '2020-04-01 - 2020-04-03',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_UKEKALENDER',
                    'min': '2020-04-01',
                    'max': '2020-04-03',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '687377',
                    'tag': 'ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1',
                    'sporsmalstekst': '2020-04-06 - 2020-04-10',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_UKEKALENDER',
                    'min': '2020-04-06',
                    'max': '2020-04-10',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '687378',
                    'tag': 'ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_2',
                    'sporsmalstekst': '2020-04-13 - 2020-04-17',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_UKEKALENDER',
                    'min': '2020-04-13',
                    'max': '2020-04-17',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '687379',
                    'tag': 'ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_3',
                    'sporsmalstekst': '2020-04-20 - 2020-04-24',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_UKEKALENDER',
                    'min': '2020-04-20',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '687343',
            'tag': 'FERIE_V2',
            'sporsmalstekst': 'Tok du ut ferie mens du var sykmeldt 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687344',
                    'tag': 'FERIE_NAR_V2',
                    'sporsmalstekst': 'Når tok du ut ferie?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-04-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '4935',
            'tag': 'FERIE_PERMISJON_UTLAND',
            'sporsmalstekst': 'Har du hatt ferie, permisjon eller vært utenfor EØS mens du var sykmeldt 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '50345',
                    'tag': 'FERIE_PERMISJON_UTLAND_HVA',
                    'sporsmalstekst': 'Kryss av alt som gjelder deg:',
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '513254',
                            'tag': 'FERIE',
                            'sporsmalstekst': 'Jeg tok ut ferie',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': true,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '525678',
                                    'tag': 'FERIE_NAR',
                                    'sporsmalstekst': null,
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2020-04-01',
                                    'max': '2020-04-24',
                                    'pavirkerAndreSporsmal': true,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '53456',
                            'tag': 'PERMISJON',
                            'sporsmalstekst': 'Jeg hadde permisjon',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '54745',
                                    'tag': 'PERMISJON_NAR',
                                    'sporsmalstekst': null,
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2020-04-01',
                                    'max': '2020-04-24',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '5537',
                            'tag': 'UTLAND',
                            'sporsmalstekst': 'Jeg var utenfor EØS',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': true,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '56345',
                                    'tag': 'UTLAND_NAR',
                                    'sporsmalstekst': null,
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2020-04-01',
                                    'max': '2020-04-24',
                                    'pavirkerAndreSporsmal': true,
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
            'id': '243',
            'tag': 'FRAVER_FOR_BEHANDLING',
            'sporsmalstekst': 'Vi ser at sykmeldingen inneholder behandlingsdager mellom 1. - 24. april 2020. Var du syk og borte fra jobb før dette, nærmere bestemt 16. - 31. mars 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '3214',
                    'tag': 'TIDLIGERE_SYK',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '443',
                            'tag': 'TIDLIGERE_EGENMELDING',
                            'sporsmalstekst': 'Jeg var syk med egenmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '546',
                                    'tag': 'EGENMELDINGER_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 1. april 2020.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2019-10-01',
                                    'max': '2020-03-31',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '6234',
                            'tag': 'TIDLIGERE_PAPIRSYKMELDING',
                            'sporsmalstekst': 'Jeg var syk med papirsykmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '7645',
                                    'tag': 'PAPIRSYKMELDING_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 1. april 2020.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2019-10-01',
                                    'max': '2020-03-31',
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
            'id': '47',
            'tag': 'FRISKMELDT',
            'sporsmalstekst': 'Brukte du hele sykmeldingen fram til 11. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'NEI',
            'svar': [],
            'undersporsmal': [ {
                'id': '48',
                'tag': 'FRISKMELDT_START',
                'sporsmalstekst': 'Fra hvilken dato har du ikke lenger behov for sykmelding?',
                'undertekst': null,
                'svartype': 'DATO',
                'min': '2020-05-27',
                'max': '2020-06-11',
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': null,
                'svar': [],
                'undersporsmal': []
            } ]
        },
        {
            'id': '687349',
            'tag': 'JOBBET_DU_100_PROSENT_0',
            'sporsmalstekst': 'I perioden 1. - 24. april 2020 var du 100 % sykmeldt fra POSTEN NORGE AS, BÆRUM. Jobbet du noe i denne perioden?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687350',
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
                    'id': '687351',
                    'tag': 'HVOR_MYE_HAR_DU_JOBBET_0',
                    'sporsmalstekst': 'Hvor mye jobbet du totalt 1. - 24. april 2020 hos POSTEN NORGE AS, BÆRUM?',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_TIMER_PROSENT',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '687352',
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
                                    'id': '687353',
                                    'tag': 'HVOR_MYE_PROSENT_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'prosent',
                                    'svartype': 'TALL',
                                    'min': '1',
                                    'max': '99',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '687354',
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
                                    'id': '687355',
                                    'tag': 'HVOR_MYE_TIMER_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'timer totalt',
                                    'svartype': 'TALL',
                                    'min': '1',
                                    'max': '514',
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
            'id': '104',
            'tag': 'JOBBET_DU_GRADERT_0',
            'sporsmalstekst': 'I perioden 20. mai - 5. juni 2020 skulle du jobbe 20 % av ditt normale arbeid hos 995816598 sitt orgnavn :). Jobbet du mer enn dette?',
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
                    'sporsmalstekst': 'Hvor mye jobbet du totalt 20. mai - 5. juni 2020 hos 995816598 sitt orgnavn :)?',
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
                                    'min': '21',
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
                                    'max': '364',
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
            'id': '2',
            'tag': 'LAND',
            'sporsmalstekst': 'Hvilket land skal du reise til?',
            'undertekst': null,
            'svartype': 'LAND',
            'min': null,
            'max': '50',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '1',
            'tag': 'PERIODEUTLAND',
            'sporsmalstekst': 'Når skal du reise?',
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-04-01',
            'max': '2020-04-24',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '687345',
            'tag': 'PERMISJON_V2',
            'sporsmalstekst': 'Tok du permisjon mens du var sykmeldt 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687346',
                    'tag': 'PERMISJON_NAR_V2',
                    'sporsmalstekst': 'Når tok du permisjon?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-04-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '687337',
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
                    'id': '687338',
                    'tag': 'PERMITTERT_NAA_NAR',
                    'sporsmalstekst': 'Velg første dag i permitteringen',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2019-12-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '687339',
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
                    'id': '687340',
                    'tag': 'PERMITTERT_PERIODE_NAR',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-02-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '687341',
            'tag': 'TILBAKE_I_ARBEID',
            'sporsmalstekst': 'Var du tilbake i fullt arbeid hos POSTEN NORGE AS, BÆRUM i løpet av perioden 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687342',
                    'tag': 'TILBAKE_NAR',
                    'sporsmalstekst': 'Når begynte du å jobbe igjen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-04-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': true,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '687369',
            'tag': 'UTDANNING',
            'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687370',
                    'tag': 'UTDANNING_START',
                    'sporsmalstekst': 'Når startet du på utdanningen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': null,
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '687371',
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
            'id': '423',
            'tag': 'UTLAND',
            'sporsmalstekst': 'Har du vært utenfor EØS mens du var sykmeldt 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '424',
                    'tag': 'PERIODER',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-04-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '425',
                    'tag': 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                    'sporsmalstekst': 'Har du søkt om å beholde sykepengene for disse dagene?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': 'NEI',
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '426',
                            'tag': 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                            'sporsmalstekst': '<p>I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target="_blank" href="https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland">søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
                            'undertekst': null,
                            'svartype': 'IKKE_RELEVANT',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': null,
                            'svar': [],
                            'undersporsmal': []
                        }
                    ]
                } ]
        },
        {
            'id': '687347',
            'tag': 'UTLAND_V2',
            'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 1. - 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687348',
                    'tag': 'UTLAND_NAR_V2',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-04-01',
                    'max': '2020-04-24',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '687372',
            'tag': 'VAER_KLAR_OVER_AT',
            'sporsmalstekst': 'Viktig å være klar over:',
            'undertekst': '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\'https://www.nav.no/sykepenger\' target=\'_blank\'>nav.no/sykepenger</a>.</p>',
            'svartype': 'IKKE_RELEVANT',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '687373',
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
        },
    ],
    'egenmeldtSykmelding': false
}

export const arbeidsledigKvitteringMock: RSSoknad = {
    'id': 'd3756302-4488-4f15-837b-38d51bc9b773',
    'sykmeldingId': '54d684f4-1e36-4ad9-bfbd-30365284234b',
    'soknadstype': 'ARBEIDSLEDIG',
    'status': 'NY',
    'fom': '2020-06-07',
    'tom': '2020-06-22',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-06-07',
    'sykmeldingUtskrevet': '2020-06-07',
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSLEDIG',
    'soknadPerioder': [
        {
            'fom': '2020-06-07',
            'tom': '2020-06-22',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '127',
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
            'id': '128',
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
                    'id': '129',
                    'tag': 'PERMITTERT_NAA_NAR',
                    'sporsmalstekst': 'Velg første dag i permitteringen',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-02-07',
                    'max': '2020-06-22',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '159',
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
            'id': '160',
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

export const sendtArbeidsledigKvitteringMock: RSSoknad = {
    'id': '162b42d7-2600-44ea-905e-d3bae7f23404',
    'sykmeldingId': 'b4d3dc32-49ba-4448-9fd1-e03d3b98fbc4',
    'soknadstype': 'ARBEIDSLEDIG',
    'status': 'SENDT',
    'fom': '2020-01-01',
    'tom': '2020-01-10',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': '2020-04-23T11:56:10.624',
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-01-01',
    'sykmeldingUtskrevet': '2020-06-07',
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSLEDIG',
    'soknadPerioder': [
        {
            'fom': '2020-01-01',
            'tom': '2020-01-10',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '93',
            'tag': 'ANSVARSERKLARING',
            'sporsmalstekst': 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [
                {
                    'verdi': 'CHECKED',
                    'avgittAv': null
                }
            ],
            'undersporsmal': []
        },
        {
            'id': '94',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Er du permittert nå?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '95',
                    'tag': 'PERMITTERT_NAA_NAR',
                    'sporsmalstekst': 'Velg første dag i permitteringen',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2019-09-01',
                    'max': '2020-01-10',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '96',
            'tag': 'PERMITTERT_PERIODE',
            'sporsmalstekst': 'Har du vært permittert i noen perioder etter 1. februar 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '97',
                    'tag': 'PERMITTERT_PERIODE_NAR',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-02-01',
                    'max': '2020-01-10',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '98',
            'tag': 'FRISKMELDT',
            'sporsmalstekst': 'Brukte du hele sykmeldingen fram til 10. januar 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'NEI',
            'svar': [
                {
                    'verdi': 'JA',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '99',
                    'tag': 'FRISKMELDT_START',
                    'sporsmalstekst': 'Fra hvilken dato har du ikke lenger behov for sykmelding?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-01-01',
                    'max': '2020-01-10',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '100',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 10. januar 2020? Du trenger ikke oppgi penger fra NAV.',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '101',
                    'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
                    'sporsmalstekst': 'Hvilke inntektskilder har du hatt?',
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '102',
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
                                    'id': '103',
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
                            'id': '104',
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
                                    'id': '105',
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
                            'id': '106',
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
                                    'id': '107',
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
                            'id': '108',
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
                                    'id': '109',
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
                            'id': '110',
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
                                    'id': '111',
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
                            'id': '112',
                            'tag': 'INNTEKTSKILDE_OMSORGSLONN',
                            'sporsmalstekst': 'omsorgslønn fra kommunen',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '113',
                                    'tag': 'INNTEKTSKILDE_OMSORGSLONN_ER_DU_SYKMELDT',
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
                            'id': '114',
                            'tag': 'INNTEKTSKILDE_FOSTERHJEM',
                            'sporsmalstekst': 'fosterhjemgodtgjørelse',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '115',
                                    'tag': 'INNTEKTSKILDE_FOSTERHJEM_ER_DU_SYKMELDT',
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
                            'id': '116',
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
            'id': '117',
            'tag': 'UTDANNING',
            'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 1. - 10. januar 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '118',
                    'tag': 'UTDANNING_START',
                    'sporsmalstekst': 'Når startet du på utdanningen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': null,
                    'max': '2020-01-10',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '119',
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
            'id': '120',
            'tag': 'ARBEIDSLEDIG_UTLAND',
            'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 1. - 10. januar 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '121',
                    'tag': 'UTLAND_NAR',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-01-01',
                    'max': '2020-01-10',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '122',
                    'tag': 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                    'sporsmalstekst': 'Har du søkt om å beholde sykepengene for disse dagene?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': 'NEI',
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '123',
                            'tag': 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                            'sporsmalstekst': null,
                            'undertekst': '<p>I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target="_blank" href="https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland">søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
                            'svartype': 'IKKE_RELEVANT',
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
            'tag': 'ARBEID_UTENFOR_NORGE',
            'sporsmalstekst': 'Utfører du arbeid andre steder enn i Norge?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': []
        },
        {
            'id': '125',
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
            'id': '126',
            'tag': 'BEKREFT_OPPLYSNINGER',
            'sporsmalstekst': 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [
                {
                    'verdi': 'CHECKED',
                    'avgittAv': null
                }
            ],
            'undersporsmal': []
        }
    ],
    'egenmeldtSykmelding': false
}

export const oppholdUtlandKvitteringMock: RSSoknad = {
    'id': 'b9d67b0d-b1f8-44a5-bcbd-6010111122',
    'sykmeldingId': null,
    'soknadstype': 'OPPHOLD_UTLAND',
    'status': 'NY',
    'fom': null,
    'tom': null,
    'opprettetDato': '2020-06-03',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': null,
    'sykmeldingUtskrevet': null,
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': null,
    'soknadPerioder': [],
    'sporsmal': [ {
        'id': '1',
        'tag': 'PERIODEUTLAND',
        'sporsmalstekst': 'Når skal du reise?',
        'undertekst': null,
        'svartype': 'PERIODER',
        'min': '2020-03-03',
        'max': '2020-12-03',
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    }, {
        'id': '2',
        'tag': 'LAND',
        'sporsmalstekst': 'Hvilket land skal du reise til?',
        'undertekst': null,
        'svartype': 'LAND',
        'min': null,
        'max': '50',
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    }, {
        'id': '3',
        'tag': 'ARBEIDSGIVER',
        'sporsmalstekst': 'Har du arbeidsgiver?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': true,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [],
        'undersporsmal': [ {
            'id': '4',
            'tag': 'SYKMELDINGSGRAD',
            'sporsmalstekst': 'Er du 100 % sykmeldt?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }, {
            'id': '5',
            'tag': 'FERIE',
            'sporsmalstekst': 'Har du avtalt med arbeidsgiveren din at du skal ha ferie i hele perioden?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '6',
        'tag': 'BEKREFT_OPPLYSNINGER_UTLAND_INFO',
        'sporsmalstekst': 'Før du reiser ber vi deg bekrefte:',
        'undertekst': '<ul>\n    <li>Jeg har avklart med legen at reisen ikke vil forlenge sykefraværet</li>\n    <li>Reisen hindrer ikke planlagt behandling eller avtaler med NAV</li>\n</ul>',
        'svartype': 'IKKE_RELEVANT',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': [ {
            'id': '7',
            'tag': 'BEKREFT_OPPLYSNINGER_UTLAND',
            'sporsmalstekst': 'Jeg bekrefter de to punktene ovenfor',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    } ],
    'egenmeldtSykmelding': null
}

export const selvstendigKvitteringMock: RSSoknad = {
    'id': '8e267bc7-b213-4f19-a423-1543e09e0dc1',
    'sykmeldingId': 'f2e93cca-eea8-464b-b942-ee1821169885',
    'soknadstype': 'SELVSTENDIGE_OG_FRILANSERE',
    'status': 'NY',
    'fom': '2020-06-01',
    'tom': '2020-06-22',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-06-01',
    'sykmeldingUtskrevet': '2020-06-01',
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'NAERINGSDRIVENDE',
    'soknadPerioder': [
        {
            'fom': '2020-06-01',
            'tom': '2020-06-22',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '161',
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
            'id': '185',
            'tag': 'UTDANNING',
            'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 1. - 22. juni 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '188',
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
            'id': '189',
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

export const arbeidsgiverInnenforArbeidsgiverperiodeKvitteringMock: RSSoknad = {
    'id': 'd82a94f6-eefa-40f0-af32-cd6325044345',
    'sykmeldingId': '846bc8ce-4d70-4fdd-b3d1-cc3aee508e90',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-01-01',
    'tom': '2020-01-10',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-01-01',
    'sykmeldingUtskrevet': '2020-01-01',
    'arbeidsgiver': {
        'navn': '995816598 sitt orgnavn :)',
        'orgnummer': '995816598'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2020-01-01',
            'tom': '2020-01-10',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '190',
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
            'id': '191',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Er du permittert nå?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '233',
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
            'id': '234',
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

export const arbeidstakerUtenforArbeidsgiverperiodeKvitteringMock: RSSoknad = {
    'id': 'd27a0609-7be1-49bc-b00c-5a26370be786',
    'sykmeldingId': 'bdf810a8-6d92-4bd5-b4be-47714f8ae44e',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-01-01',
    'tom': '2020-01-20',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-01-01',
    'sykmeldingUtskrevet': '2020-01-01',
    'arbeidsgiver': {
        'navn': '995816598 sitt orgnavn :)',
        'orgnummer': '995816598'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2020-01-01',
            'tom': '2020-01-20',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '235',
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
            'id': '236',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Er du permittert nå?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '278',
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
            'id': '279',
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

export const arbeidstakerOppfolgendeUtenOppholdKvitteringMock: RSSoknad = {
    'id': '253eb3d6-89b8-457b-8865-cfa2a927da39',
    'sykmeldingId': 'bdf810a8-6d92-4bd5-b4be-47714f8ae44e',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-01-21',
    'tom': '2020-02-09',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-01-01',
    'sykmeldingUtskrevet': '2020-01-01',
    'arbeidsgiver': {
        'navn': '995816598 sitt orgnavn :)',
        'orgnummer': '995816598'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2020-01-21',
            'tom': '2020-02-09',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '280',
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
            'id': '281',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Er du permittert nå?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '316',
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
            'id': '317',
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

export const arbeidstakerOppfolgendeMedOppholdKvitteringMock: RSSoknad = {
    'id': '6c45e5b3-1e0b-486a-ab6c-555b1ea02ed1',
    'sykmeldingId': '6d6250d5-edf0-4da8-8ea3-c2b46924999d',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'NY',
    'fom': '2020-02-17',
    'tom': '2020-02-29',
    'opprettetDato': '2020-06-23',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-02-17',
    'sykmeldingUtskrevet': '2020-02-17',
    'arbeidsgiver': {
        'navn': '995816598 sitt orgnavn :)',
        'orgnummer': '995816598'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2020-02-17',
            'tom': '2020-02-29',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '318',
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
            'id': '319',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Er du permittert nå?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '361',
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
            'id': '362',
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


export const soknaderIntegration = [
    utgattSoknad,
    arbeidstakersoknadMedUtenlandsoppholdSoktSykepenger,
    sendtArbeidsledig,
    avbruttSoknad,
    fremtidigSoknad,
    veldigLangSoknad,
    arbeidsledigKvitteringMock,
    sendtArbeidsledigKvitteringMock,
    oppholdUtlandKvitteringMock,
    selvstendigKvitteringMock,
    arbeidsgiverInnenforArbeidsgiverperiodeKvitteringMock,
    arbeidstakerUtenforArbeidsgiverperiodeKvitteringMock,
    arbeidstakerOppfolgendeUtenOppholdKvitteringMock,
    arbeidstakerOppfolgendeMedOppholdKvitteringMock,
] as RSSoknad[]
