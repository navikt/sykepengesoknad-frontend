import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { arbeidsledigSm,arbeidstaker50, arbeidstaker100, frilanserSykmelding } from './sykmeldinger'

export const behandlingsdager: RSSoknad = {
    'id': 'bcb032ac-b6dd-4ae7-8e73-9e64f1b35182',
    'sykmeldingId': 'e876fe08-2765-4bd6-966c-922eefe99382',
    'soknadstype': 'BEHANDLINGSDAGER',
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
            'grad': 0,
            'sykmeldingstype': 'BEHANDLINGSDAGER'
        }
    ],
    'sporsmal': [
        {
            'id': '687374',
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
            'id': '687380',
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
                    'id': '687381',
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
                            'id': '687382',
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
                                    'id': '687383',
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
                            'id': '687384',
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
                                    'id': '687385',
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
                            'id': '687386',
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
                                    'id': '687387',
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
                            'id': '687388',
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
                                    'id': '687389',
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
                            'id': '687390',
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
                                    'id': '687391',
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
                            'id': '687392',
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
            'id': '687393',
            'tag': 'VAER_KLAR_OVER_AT',
            'sporsmalstekst': 'Viktig å være klar over:',
            'undertekst': '<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\'https://www.nav.no/sykepenger\' target=\'_blank\'>nav.no/sykepenger</a>.</p>',
            'svartype': 'IKKE_RELEVANT',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '687394',
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
export const arbeidstaker: RSSoknad = {
    'id': 'faba11f5-c4f2-4647-8c8a-58b28ce2f3ef',
    'sykmeldingId': arbeidstaker100.id,
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
                            'svar': [
                                {
                                    'verdi': 'CHECKED',
                                    'avgittAv': null
                                }
                            ],
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
        }
    ],
    'egenmeldtSykmelding': false
}
export const arbeidstakerGradert: RSSoknad = {
    'id': '5b769c04-e171-47c9-b79b-23ab8fce331e',
    'sykmeldingId': arbeidstaker50.id,
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
            'grad': 50,
            'sykmeldingstype': 'GRADERT'
        }
    ],
    'sporsmal': [
        {
            'id': '687291',
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
            'id': '687292',
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
                    'id': '687293',
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
            'id': '687294',
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
                    'id': '687295',
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
            'id': '687296',
            'tag': 'EGENMELDINGER',
            'sporsmalstekst': 'Vi har registrert at du ble sykmeldt onsdag 1. april 2020. Var du syk og borte fra jobb i perioden 16. - 31. mars 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687297',
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
                            'id': '687298',
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
                                    'id': '687299',
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
                            'id': '687300',
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
                                    'id': '687301',
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
            'id': '687302',
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
                    'id': '687303',
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
            'id': '687304',
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
                    'id': '687305',
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
            'id': '687306',
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
                    'id': '687307',
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
            'id': '687308',
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
                    'id': '687309',
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
            'id': '687310',
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
            'id': '687311',
            'tag': 'JOBBET_DU_GRADERT_0',
            'sporsmalstekst': 'I perioden 1. - 24. april 2020 skulle du jobbe 50 % av ditt normale arbeid hos POSTEN NORGE AS, BÆRUM. Jobbet du mer enn dette?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687312',
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
                    'id': '687313',
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
                            'id': '687314',
                            'tag': 'HVOR_MYE_PROSENT_0',
                            'sporsmalstekst': 'prosent',
                            'undertekst': null,
                            'svartype': 'RADIO',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [
                                {
                                    'verdi': 'CHECKED',
                                    'avgittAv': null
                                }
                            ],
                            'undersporsmal': [
                                {
                                    'id': '687315',
                                    'tag': 'HVOR_MYE_PROSENT_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'prosent',
                                    'svartype': 'TALL',
                                    'min': '51',
                                    'max': '99',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '687316',
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
                                    'id': '687317',
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
            'id': '687318',
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
                    'id': '687319',
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
                            'id': '687320',
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
                                    'id': '687321',
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
                            'id': '687322',
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
                                    'id': '687323',
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
                            'id': '687324',
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
                                    'id': '687325',
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
                            'id': '687326',
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
                                    'id': '687327',
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
                            'id': '687328',
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
                                    'id': '687329',
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
                            'id': '687330',
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
            'id': '687331',
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
                    'id': '687332',
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
                    'id': '687333',
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
            'id': '687334',
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
            'id': '687335',
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
export const arbeidsledig: RSSoknad = {
    'id': '934f39f4-cb47-459f-8209-0dbef6d36059',
    'sykmeldingId': arbeidsledigSm.id,
    'soknadstype': 'ARBEIDSLEDIG',
    'status': 'NY',
    'fom': '2020-04-01',
    'tom': '2020-04-24',
    'opprettetDato': '2020-05-13',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-04-01',
    'sykmeldingUtskrevet': '2020-03-31',
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSLEDIG',
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
            'id': '687395',
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
            'id': '687396',
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
                    'id': '687397',
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
            'id': '687398',
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
                    'id': '687399',
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
            'id': '687400',
            'tag': 'FRISKMELDT',
            'sporsmalstekst': 'Brukte du hele sykmeldingen fram til 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'NEI',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687401',
                    'tag': 'FRISKMELDT_START',
                    'sporsmalstekst': 'Fra hvilken dato har du ikke lenger behov for sykmelding?',
                    'undertekst': null,
                    'svartype': 'DATO',
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
            'id': '687402',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020? Du trenger ikke oppgi penger fra NAV.',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687403',
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
                            'id': '687404',
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
                                    'id': '687405',
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
                            'id': '687406',
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
                                    'id': '687407',
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
                            'id': '687408',
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
                                    'id': '687409',
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
                            'id': '687410',
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
                                    'id': '687411',
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
                            'id': '687412',
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
                                    'id': '687413',
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
                            'id': '687414',
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
                                    'id': '687415',
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
                            'id': '687416',
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
                                    'id': '687417',
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
                            'id': '687418',
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
            'id': '687419',
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
                    'id': '687420',
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
                    'id': '687421',
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
            'id': '687426',
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
            'id': '687427',
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
export const frilanser: RSSoknad = {
    'id': 'a8e40578-682b-4a04-bfda-b7768af2ae13',
    'sykmeldingId': frilanserSykmelding.id,
    'soknadstype': 'SELVSTENDIGE_OG_FRILANSERE',
    'status': 'NY',
    'fom': '2020-04-01',
    'tom': '2020-04-24',
    'opprettetDato': '2020-05-13',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': null,
    'avbruttDato': null,
    'startSykeforlop': '2020-04-01',
    'sykmeldingUtskrevet': '2020-03-31',
    'arbeidsgiver': null,
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'FRILANSER',
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
            'id': '687428',
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
            'id': '687429',
            'tag': 'TILBAKE_I_ARBEID',
            'sporsmalstekst': 'Var du tilbake i fullt arbeid som frilanser før sykmeldingsperioden utløp 24. april 2020?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687430',
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
            'id': '687431',
            'tag': 'JOBBET_DU_100_PROSENT_0',
            'sporsmalstekst': 'I perioden 1. - 24. april 2020 var du 100% sykmeldt som frilanser. Jobbet du noe i denne perioden?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687432',
                    'tag': 'HVOR_MANGE_TIMER_PER_UKE_0',
                    'sporsmalstekst': 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                    'undertekst': null,
                    'svartype': 'TIMER',
                    'min': '1',
                    'max': '150',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '687433',
                    'tag': 'HVOR_MYE_HAR_DU_JOBBET_0',
                    'sporsmalstekst': 'Hvor mye jobbet du totalt i 1. - 24. april 2020 som frilanser?',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_TIMER_PROSENT',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '687434',
                            'tag': 'HVOR_MYE_PROSENT_0',
                            'sporsmalstekst': 'prosent',
                            'undertekst': null,
                            'svartype': 'RADIO',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [
                                {
                                    'verdi': 'CHECKED',
                                    'avgittAv': null
                                }
                            ],
                            'undersporsmal': [
                                {
                                    'id': '687435',
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
                            'id': '687436',
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
                                    'id': '687437',
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
            'id': '687438',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du annen inntekt?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': '687439',
                    'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
                    'sporsmalstekst': 'Hvilke inntektskilder har du?',
                    'undertekst': 'Du trenger ikke oppgi penger fra NAV',
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
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
                            'id': '687442',
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
                                    'id': '687443',
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
                        {
                            'id': '687446',
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
            'id': '687447',
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
                    'id': '687448',
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
                    'id': '687449',
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
                            'id': '687450',
                            'tag': 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                            'sporsmalstekst': null,
                            'undertekst': '<p>DENNE SKAL IKKE VISES! I utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EØS. Du kan likevel <a target=\'_blank\' href=\'https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland\'>søke NAV om å få reise ut av EØS</a> og beholde sykepengene i en begrenset periode.</p>',
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
            'id': '687451',
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
            'id': '687452',
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
                    'id': '687453',
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
                    'id': '687454',
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
            'id': '687456',
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
        {
            'id': '687455',
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
    ],
    'egenmeldtSykmelding': false
}
export const oppholdUtland: RSSoknad = {
    'id': 'b9d67b0d-b1f8-44a5-bcbd-6010b60b90ce',
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
export const soknaderOpplaering = [
    behandlingsdager,
    arbeidstaker,
    arbeidstakerGradert,
    arbeidsledig,
    frilanser,
    oppholdUtland
] as RSSoknad[]
