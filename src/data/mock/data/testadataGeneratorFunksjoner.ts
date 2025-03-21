import dayjs from 'dayjs'

import { Sykmelding } from '../../../types/sykmelding'
import { ArbeidsforholdFraInntektskomponenten } from '../../../types/rs-types/rs-arbeidsforholdfrainntektskomponenten'
import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'

import { oppsummering } from './sporsmal/oppsummering'

export function skapSykmelding(opts: { fom: string; tom: string; hovedjobb: string; id: string }) {
    const { fom, tom, hovedjobb, id } = opts
    return new Sykmelding({
        id: id,
        pasient: {
            fnr: '08089404496',
            fornavn: 'TYKKMAGET',
            mellomnavn: null,
            etternavn: 'BOLLE',
        },
        mottattTidspunkt: fom + 'T22:00:00Z',
        behandlingsutfall: { status: 'MANUAL_PROCESSING', ruleHits: [] },
        legekontorOrgnummer: '223456789',
        arbeidsgiver: { navn: hovedjobb, stillingsprosent: 100 },
        sykmeldingsperioder: [
            {
                fom: fom,
                tom: tom,
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'AKTIVITET_IKKE_MULIG',
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'andre årsaker til sykefravær',
                        arsak: ['AKTIVITET_FORHINDRER_BEDRING'],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'andre årsaker til sykefravær',
                        arsak: ['ANNET'],
                    },
                },
                reisetilskudd: false,
            },
        ],
        sykmeldingStatus: {
            statusEvent: 'SENDT',
            timestamp: fom + 'T15:45:33.551189Z',
            arbeidsgiver: {
                orgnummer: '967170232',
                juridiskOrgnummer: '928497704',
                orgNavn: `${hovedjobb}`,
            },
            sporsmalOgSvarListe: [
                {
                    tekst: 'Jeg er sykmeldt som',
                    shortName: 'ARBEIDSSITUASJON',
                    svar: { svarType: 'ARBEIDSSITUASJON', svar: 'ARBEIDSTAKER' },
                },
            ],
        },
        medisinskVurdering: {
            hovedDiagnose: {
                kode: 'L87',
                system: 'ICPC-2',
                tekst: 'TENDINITT INA',
            },
            biDiagnoser: [{ kode: 'L87', system: 'ICPC-2', tekst: 'GANGLION SENE' }],
            annenFraversArsak: null,
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: fom,
        },
        skjermesForPasient: false,
        prognose: {
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'Må ta det pent',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: fom,
                vurderingsdato: fom,
            },
            erIkkeIArbeid: null,
        },
        tiltakArbeidsplassen: 'Fortsett som sist.',
        tiltakNAV:
            'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
        andreTiltak: null,
        meldingTilNAV: null,
        meldingTilArbeidsgiver: null,
        kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
        behandletTidspunkt: fom + 'T00:00:00Z',
        behandler: {
            fornavn: 'Frida',
            mellomnavn: 'Perma',
            etternavn: 'Frost',
            adresse: {
                gate: 'Kirkegårdsveien 3',
                postnummer: 1348,
                kommune: 'Rykkinn',
                postboks: null,
                land: 'Country',
            },
            tlf: 'tel:94431152',
        },
        syketilfelleStartDato: fom,
        navnFastlege: 'Victor Frankenstein',
        egenmeldt: false,
        papirsykmelding: false,
        harRedusertArbeidsgiverperiode: false,
        merknader: null,
        utdypendeOpplysninger: {
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.',
                    svar: 'Langvarig korsryggsmerter. Ømhet og smerte',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.2.2': {
                    sporsmal: 'Hvordan påvirker sykdommen arbeidsevnen',
                    svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: d79c75bb-af99-4357-8b7d-b0d5cbfd8f1b',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.2.3': {
                    sporsmal: 'Har behandlingen frem til nå bedret arbeidsevnen?',
                    svar: 'Nei',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
                '6.2.4': {
                    sporsmal: 'Beskriv Pågående og planlagt henvisning, utredning og/eller behandling',
                    svar: 'Henvist til fysio',
                    restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                },
            },
        },
    })
}

export function skapSoknad(opts: {
    fom: string
    tom: string
    hovedjobb: string
    sykmeldingId: string
    soknadId: string
}): RSSoknad {
    const { fom, tom, hovedjobb, sykmeldingId, soknadId } = opts

    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    const inntektskilderDataFraInntektskomponenten: ArbeidsforholdFraInntektskomponenten[] = [
        {
            navn: 'Ruter',
            orgnummer: '222',
            arbeidsforholdstype: 'ARBEIDSTAKER',
        },
        {
            navn: 'Blomsterbutikken',
            orgnummer: '111',
            arbeidsforholdstype: 'ARBEIDSTAKER',
        },
        {
            navn: 'Bensinstasjonen',
            orgnummer: '333',
            arbeidsforholdstype: 'ARBEIDSTAKER',
        },
    ]
    return {
        id: soknadId,
        sykmeldingId: sykmeldingId,
        soknadstype: 'ARBEIDSTAKERE',
        status: 'NY',
        inntektskilderDataFraInntektskomponenten: inntektskilderDataFraInntektskomponenten,
        fom: fom,
        tom: tom,
        opprettetDato: '2022-11-17',
        sendtTilNAVDato: null,
        sendtTilArbeidsgiverDato: null,
        avbruttDato: null,
        startSykeforlop: fom,
        sykmeldingUtskrevet: fom,
        arbeidsgiver: { navn: `${hovedjobb}`, orgnummer: '967170232' },
        korrigerer: null,
        korrigertAv: null,
        arbeidssituasjon: 'ARBEIDSTAKER',
        soknadPerioder: [
            {
                fom: fom,
                tom: tom,
                grad: 100,
                sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
            },
        ],
        sporsmal: [
            {
                id: '1623807',
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
                id: '1623808',
                tag: 'TILBAKE_I_ARBEID',
                sporsmalstekst: `Var du tilbake i fullt arbeid hos ${hovedjobb} i løpet av perioden ${periodeTekst}?`,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '1623809',
                        tag: 'TILBAKE_NAR',
                        sporsmalstekst: 'Når begynte du å jobbe igjen?',
                        undertekst: null,
                        svartype: 'DATO',
                        min: fom,
                        max: tom,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '1623810',
                tag: 'FERIE_V2',
                sporsmalstekst: `Tok du ut feriedager i tidsrommet ${periodeTekst}?`,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '1623811',
                        tag: 'FERIE_NAR_V2',
                        sporsmalstekst: 'Når tok du ut feriedager?',
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: fom,
                        max: tom,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '1623812',
                tag: 'PERMISJON_V2',
                sporsmalstekst: `Tok du permisjon mens du var sykmeldt ${periodeTekst}?`,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '1623813',
                        tag: 'PERMISJON_NAR_V2',
                        sporsmalstekst: 'Når tok du permisjon?',
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: fom,
                        max: tom,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '63448066-fa24-3d9b-bf38-fb2ea23a353f',
                tag: 'ARBEID_UNDERVEIS_100_PROSENT_0',
                sporsmalstekst: `I perioden ${periodeTekst} var du 100 % sykmeldt fra ${hovedjobb}. Jobbet du noe hos ${hovedjobb} i denne perioden?`,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '9f5b48c7-f461-359d-a27c-a0ad42ab6c22',
                        tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                        sporsmalstekst: 'Oppgi arbeidsmengde i timer eller prosent:',
                        undertekst: null,
                        svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [
                            {
                                id: '8ba29062-f412-30ad-8851-33577d8034ab',
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
                                        id: '796cf7ed-8a7e-39de-9cbc-6e789aa5af3f',
                                        tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                        sporsmalstekst: `Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos ${hovedjobb} i perioden ${periodeTekst}?`,
                                        undertekst: 'Oppgi i prosent. Eksempel: 40',
                                        svartype: 'PROSENT',
                                        min: '1',
                                        max: '99',
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '27d3d9f1-d31f-3c0e-a1ec-3246c3b48b0a',
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
                                        id: '6cc620d8-d4b0-3e82-a038-2757df6fc311',
                                        tag: 'HVOR_MYE_TIMER_VERDI_0',
                                        sporsmalstekst: `Oppgi totalt antall timer du jobbet i perioden ${periodeTekst} hos ${hovedjobb}`,
                                        undertekst: 'Oppgi i timer. Eksempel: 12',
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
                    {
                        id: 'af302d17-f35d-38a6-ac23-ccde5db369cb',
                        tag: 'JOBBER_DU_NORMAL_ARBEIDSUKE_0',
                        sporsmalstekst: `Jobber du vanligvis 37,5 timer i uka hos ${hovedjobb}?`,
                        undertekst: null,
                        svartype: 'JA_NEI',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'NEI',
                        svar: [],
                        undersporsmal: [
                            {
                                id: 'ecc14b80-402a-32e6-9f93-e832ff0560d6',
                                tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                                sporsmalstekst: 'Oppgi timer per uke',
                                undertekst: null,
                                svartype: 'TIMER',
                                min: '1',
                                max: '150',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: '1623836',
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
                sporsmalstekst: `Har du andre inntektskilder enn ${hovedjobb}?`,
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
                                id: '7b4d4adc-de4f-38fd-a997-e5337fbb9555',
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
                id: '1623814',
                tag: 'OPPHOLD_UTENFOR_EOS',
                sporsmalstekst: `Var du på reise utenfor EU/EØS mens du var sykmeldt ${periodeTekst}?`,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '1623815',
                        tag: 'OPPHOLD_UTENFOR_EOS_NAR',
                        sporsmalstekst: 'Når var du utenfor EU/EØS?',
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: fom,
                        max: tom,
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
}
