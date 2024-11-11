import { Sykmelding } from '../../../types/sykmelding'

export const julesoknadSykmelding = new Sykmelding({
    id: '61e04c94-a4be-45f5-8dbd-5c0b7a8707ea',
    mottattTidspunkt: '2020-04-01T20:00:00Z',
    behandlingsutfall: {
        status: 'MANUAL_PROCESSING',
        ruleHits: [],
    },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: {
        navn: 'Posten Norge AS, Bærum',
        stillingsprosent: 100,
    },
    sykmeldingsperioder: [
        {
            fom: '2024-12-01',
            tom: '2024-12-31',
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
        timestamp: '2024-11-30T09:00:00.123456Z',
        arbeidsgiver: {
            orgnummer: '972674818',
            juridiskOrgnummer: '928497704',
            orgNavn: 'PENGELØS SPAREBANK',
        },
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt fra',
                shortName: 'ARBEIDSSITUASJON',
                svar: {
                    svarType: 'ARBEIDSSITUASJON',
                    svar: 'ARBEIDSTAKER',
                },
            },
        ],
    },
    medisinskVurdering: {
        hovedDiagnose: {
            kode: 'L87',
            system: 'ICPC-2',
            tekst: 'TENDINITT INA',
        },
        biDiagnoser: [
            {
                kode: 'L87',
                system: 'ICPC-2',
                tekst: 'GANGLION SENE',
            },
        ],
        annenFraversArsak: null,
        svangerskap: false,
        yrkesskade: false,
        yrkesskadeDato: '2021-05-03',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2025-01-01',
            vurderingsdato: '2024-11-30',
        },
        erIkkeIArbeid: null,
    },
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
    tiltakArbeidsplassen: 'Fortsett som sist.',
    tiltakNAV:
        'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
    andreTiltak: null,
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: null,
        begrunnelseIkkeKontakt: null,
    },
    behandletTidspunkt: '2024-11-30T00:00:00Z',
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
    syketilfelleStartDato: '2024-12-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})
