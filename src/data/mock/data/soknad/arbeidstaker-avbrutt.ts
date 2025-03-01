import dayjs from 'dayjs'

import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'

export const avbruttSoknad: RSSoknad = {
    id: '811d15b2-2a76-4623-9530-1ba55617e0a5',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'AVBRUTT',
    fom: '2020-04-01',
    tom: '2020-04-24',
    opprettetDato: dayjs().add(-1, 'days').format('YYYY-MM-DD'),
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: '2020-06-12',
    startSykeforlop: '2020-05-20',
    sykmeldingUtskrevet: '2020-05-27',
    arbeidsgiver: {
        navn: '995816598 sitt orgnavn :)',
        orgnummer: '995816598',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-05-20',
            tom: '2020-06-05',
            grad: 80,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        {
            id: '84',
            tag: 'ANSVARSERKLARING',
            sporsmalstekst: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '89',
            tag: 'EGENMELDINGER',
            sporsmalstekst:
                'Vi har registrert at du ble sykmeldt onsdag 20. mai 2020. Var du syk og borte fra jobb i perioden 4. - 19. mai 2020?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '90',
                    tag: 'TIDLIGERE_SYK',
                    sporsmalstekst: null,
                    undertekst: null,
                    svartype: 'CHECKBOX_GRUPPE',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: '91',
                            tag: 'TIDLIGERE_EGENMELDING',
                            sporsmalstekst: 'Jeg var syk med egenmelding',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '92',
                                    tag: 'EGENMELDINGER_NAR',
                                    sporsmalstekst:
                                        'Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 20. mai 2020.',
                                    undertekst: null,
                                    svartype: 'PERIODER',
                                    min: '2019-11-20',
                                    max: '2020-05-19',
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                        {
                            id: '93',
                            tag: 'TIDLIGERE_PAPIRSYKMELDING',
                            sporsmalstekst: 'Jeg var syk med papirsykmelding',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '94',
                                    tag: 'PAPIRSYKMELDING_NAR',
                                    sporsmalstekst:
                                        'Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 20. mai 2020.',
                                    undertekst: null,
                                    svartype: 'PERIODER',
                                    min: '2019-11-20',
                                    max: '2020-05-19',
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '95',
            tag: 'TILBAKE_I_ARBEID',
            sporsmalstekst:
                'Var du tilbake i fullt arbeid hos 995816598 sitt orgnavn :) i løpet av perioden 20. mai - 5. juni 2020?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '96',
                    tag: 'TILBAKE_NAR',
                    sporsmalstekst: 'Når begynte du å jobbe igjen?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: '2020-05-20',
                    max: '2020-06-05',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '97',
            tag: 'FERIE_V2',
            sporsmalstekst: 'Tok du ut feriedager i tidsrommet 20. mai - 5. juni 2020?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '98',
                    tag: 'FERIE_NAR_V2',
                    sporsmalstekst: 'Når tok du ut feriedager?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2020-05-20',
                    max: '2020-06-05',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '99',
            tag: 'PERMISJON_V2',
            sporsmalstekst: 'Tok du permisjon mens du var sykmeldt 20. mai - 5. juni 2020?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '100',
                    tag: 'PERMISJON_NAR_V2',
                    sporsmalstekst: 'Når tok du permisjon?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2020-05-20',
                    max: '2020-06-05',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: 'd146b1c5-661f-35ed-b72f-172fc17ead5d',
            tag: 'JOBBET_DU_GRADERT_0',
            sporsmalstekst:
                'Sykmeldingen sier du kunne jobbe 20 % i jobben din hos Posten Norge AS, Bærum. Jobbet du mer enn det?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '495730df-717d-3774-bd19-e6bcf76e3ba2',
                    tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                    sporsmalstekst:
                        'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                    undertekst: null,
                    svartype: 'TALL',
                    min: '1',
                    max: '150',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: 'e3a6bd7d-8f10-381c-8cd3-cdab3e410c95',
                    tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                    sporsmalstekst: 'Hvor mye jobbet du tilsammen 20. mai - 5. juni 2020?',
                    undertekst: 'Velg timer eller prosent',
                    svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: '0e368ffc-1840-35e5-bbb5-b994cbaa8ef1',
                            tag: 'HVOR_MYE_PROSENT_0',
                            sporsmalstekst: 'Prosent',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '13acfccb-3f39-3893-8054-058270add6ab',
                                    tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'PROSENT',
                                    min: '21',
                                    max: '99',
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                        {
                            id: '348f75cd-a87d-397b-8428-cbcb9e50a5d7',
                            tag: 'HVOR_MYE_TIMER_0',
                            sporsmalstekst: 'Timer',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539',
                                    tag: 'HVOR_MYE_TIMER_VERDI_0',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'TIMER',
                                    min: '1',
                                    max: '364',
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '103',
            tag: 'ARBEID_UTENFOR_NORGE',
            sporsmalstekst: 'Har du arbeidet i utlandet i løpet av de siste 12 månedene?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: 'ed62a3b3-4203-3b61-a684-2300bea2ffac',
            tag: 'ANDRE_INNTEKTSKILDER_V2',
            sporsmalstekst: 'Har du andre inntektskilder enn 995816598 sitt orgnavn :)?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: 'd25b338d-9a9a-379f-b474-517738a9523b',
                    tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
                    sporsmalstekst:
                        'Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei',
                    undertekst: null,
                    svartype: 'CHECKBOX_GRUPPE',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: 'd9ac4359-5519-34f1-b59d-b5ab24e55821',
                            tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                            sporsmalstekst: 'ansatt et annet sted enn nevnt over',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '989711be-5362-3f24-a02a-f1b3e3c31f99',
                            tag: 'INNTEKTSKILDE_SELVSTENDIG',
                            sporsmalstekst: 'selvstendig næringsdrivende',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '3e710b2b-1e91-3d62-8d5d-55cb5eef120f',
                            tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                            sporsmalstekst: 'dagmamma',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'c1a746d9-bd9f-396a-99b9-18feece3b9cc',
                            tag: 'INNTEKTSKILDE_JORDBRUKER',
                            sporsmalstekst: 'jordbruk / fiske / reindrift',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'ab377350-e3fe-3e46-8eb7-d3bb38d6506d',
                            tag: 'INNTEKTSKILDE_FRILANSER',
                            sporsmalstekst: 'frilanser',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '7b4d4adc-de4f-38fd-a997-e5337fbb999',
                            tag: 'INNTEKTSKILDE_OMSORGSLONN',
                            sporsmalstekst: 'kommunal omsorgstønad',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '7b4d4adc-de4f-38fd-a997-e5337fbb9a5c',
                            tag: 'INNTEKTSKILDE_FOSTERHJEM',
                            sporsmalstekst: 'fosterhjemsgodtgjørelse',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'bb9418bf-8b6a-3472-9ae6-ecd464e86b7a',
                            tag: 'INNTEKTSKILDE_STYREVERV',
                            sporsmalstekst: 'styreverv',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                    ],
                },
            ],
        },
        {
            id: '101',
            tag: 'OPPHOLD_UTENFOR_EOS',
            sporsmalstekst: 'Var du på reise utenfor EU/EØS mens du var sykmeldt 20. mai - 5. juni 2020?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '102',
                    tag: 'OPPHOLD_UTENFOR_EOS_NAR',
                    sporsmalstekst: 'Når var du utenfor EU/EØS?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2020-05-20',
                    max: '2020-06-05',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
