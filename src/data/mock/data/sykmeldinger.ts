import { Sykmelding } from '../../../types/sykmelding'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

import { brukertestSykmelding } from './personas/brukertest'
import { julesoknadSykmelding } from './julesoknad-sykmelding'

export const arbeidstaker100Syk = new Sykmelding({
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
            fom: '2020-04-01',
            tom: '2020-04-24',
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
        timestamp: '2020-04-01T07:34:53.478109Z',
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
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})
export const arbeidstaker50Syk = new Sykmelding({
    id: 'c27f8d88-64f5-4926-b1d0-559e69d40849',
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
            fom: '2020-04-01',
            tom: '2020-04-24',
            gradert: {
                grad: 50,
                reisetilskudd: false,
            },
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: 'GRADERT',
            aktivitetIkkeMulig: null,
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: 'SENDT',
        timestamp: '2021-06-14T13:33:40.423806Z',
        arbeidsgiver: {
            orgnummer: '972674818',
            juridiskOrgnummer: '928497704',
            orgNavn: 'PENGELØS SPAREBANK',
        },
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
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
        yrkesskadeDato: '2020-04-01',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 122a4494-eb32-4927-936b-07a2b7d857fb',
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
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})
export const arbeidsledig100Syk = new Sykmelding({
    id: '17ee4fc0-43cc-48ac-b765-6cdc5682f544',
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
            fom: '2020-04-01',
            tom: '2020-04-24',
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
        statusEvent: 'BEKREFTET',
        timestamp: '2021-06-14T10:12:31.047753Z',
        arbeidsgiver: null,
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
                shortName: 'ARBEIDSSITUASJON',
                svar: {
                    svarType: 'ARBEIDSSITUASJON',
                    svar: 'ARBEIDSLEDIG',
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
        yrkesskadeDato: '2020-04-01',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 05170fd3-3273-45de-b19c-8fc5ee21feb6',
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
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})
export const frilanser100Syk = new Sykmelding({
    id: '7abc3d05-f5dc-4aef-913d-8823b3a5c065',
    mottattTidspunkt: '2020-03-31T20:00:00Z',
    behandlingsutfall: {
        status: 'MANUAL_PROCESSING',
        ruleHits: [],
    },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: {
        navn: 'LOMMEN BARNEHAVE',
        stillingsprosent: 100,
    },
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-24',
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
        statusEvent: 'BEKREFTET',
        timestamp: '2021-06-15T09:01:22.917386Z',
        arbeidsgiver: null,
        sporsmalOgSvarListe: [
            {
                tekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                shortName: 'FORSIKRING',
                svar: {
                    svarType: 'JA_NEI',
                    svar: 'NEI',
                },
            },
            {
                tekst: 'Hvilke dager var du borte fra jobb før 1. april 2020?',
                shortName: 'PERIODE',
                svar: {
                    svarType: 'PERIODER',
                    svar: '[{"fom":"2020-01-01","tom":"2020-03-13"}]',
                },
            },
            {
                tekst: 'Vi har registrert at du ble syk 1. april 2020. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                shortName: 'FRAVAER',
                svar: {
                    svarType: 'JA_NEI',
                    svar: 'JA',
                },
            },
            {
                tekst: 'Jeg er sykmeldt som',
                shortName: 'ARBEIDSSITUASJON',
                svar: {
                    svarType: 'ARBEIDSSITUASJON',
                    svar: 'FRILANSER',
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
        yrkesskadeDato: '2020-04-01',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 3090aa88-1aec-44da-aad9-3da5e9ce145b',
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
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})
export const naringsdrivende100syk = jsonDeepCopy(frilanser100Syk)
naringsdrivende100syk.id = 'a8e40578-682b-4a04-bfda-b7768af2ae99'
naringsdrivende100syk.sykmeldingStatus.sporsmalOgSvarListe.find((a) => a.shortName == 'ARBEIDSSITUASJON')!.svar.svar =
    'NAERINGSDRIVENDE'
export const arbeidstakerBehandlingsdagSyk = new Sykmelding({
    id: '9acc8456-ef38-45a3-a3b7-efb4dac24f93',
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
            fom: '2020-04-01',
            tom: '2020-04-24',
            gradert: null,
            behandlingsdager: 1,
            innspillTilArbeidsgiver: null,
            type: 'BEHANDLINGSDAGER',
            aktivitetIkkeMulig: null,
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: 'SENDT',
        timestamp: '2021-06-14T13:44:17.137825Z',
        arbeidsgiver: {
            orgnummer: '972674818',
            juridiskOrgnummer: '928497704',
            orgNavn: 'PENGELØS SPAREBANK',
        },
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
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
        yrkesskadeDato: '2020-04-01',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 71a3aaaa-aef2-461b-a480-d735074e731b',
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
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})
export const arbeidstakerReisetilskuddSyk = new Sykmelding({
    id: '8bb5be49-593c-465b-b77b-cb277a132b71',
    mottattTidspunkt: '2020-03-31T20:00:00Z',
    behandlingsutfall: {
        status: 'MANUAL_PROCESSING',
        ruleHits: [],
    },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: {
        navn: 'LOMMEN BARNEHAVE',
        stillingsprosent: 100,
    },
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-24',
            gradert: null,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: 'REISETILSKUDD',
            aktivitetIkkeMulig: null,
            reisetilskudd: true,
        },
    ],
    sykmeldingStatus: {
        statusEvent: 'SENDT',
        timestamp: '2021-06-15T10:45:27.543204Z',
        arbeidsgiver: {
            orgnummer: '972674818',
            juridiskOrgnummer: '928497704',
            orgNavn: 'PENGELØS SPAREBANK',
        },
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
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
        yrkesskadeDato: '2020-04-01',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 008d026c-6325-40a5-b8ca-011bd8263ee5',
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
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})

export const syk1 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk1',
    sykmeldingsperioder: [
        {
            fom: '2020-01-01',
            tom: '2020-01-05',
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
})
export const syk2 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk2',
    sykmeldingsperioder: [
        {
            fom: '2020-01-01',
            tom: '2020-01-20',
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
})
export const syk3 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk3',
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-10',
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
})
export const syk4 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk4',
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-16',
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
})
export const syk5 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk5',
    sykmeldingsperioder: [
        {
            fom: '2020-01-21',
            tom: '2020-01-25',
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
})
export const syk7 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk7',
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-16',
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
})
export const syk8 = new Sykmelding({
    ...arbeidstaker100Syk,
    id: 'syk8',
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-05',
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
})

export const gradertReisetilskuddSm = new Sykmelding({
    id: '76214ab1-2eae-439b-8f73-2713eb97989e',
    pasient: {
        fnr: '24127426046',
        fornavn: 'LUR',
        mellomnavn: null,
        etternavn: 'SNERK',
    },
    mottattTidspunkt: '2020-03-31T20:00:00Z',
    behandlingsutfall: { status: 'MANUAL_PROCESSING', ruleHits: [] },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: { navn: 'LOMMEN BARNEHAVE', stillingsprosent: 100 },
    sykmeldingsperioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-24',
            gradert: { grad: 60, reisetilskudd: true },
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: 'GRADERT',
            aktivitetIkkeMulig: null,
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: 'SENDT',
        timestamp: '2021-07-26T11:48:32.182605Z',
        arbeidsgiver: {
            orgnummer: '967170232',
            juridiskOrgnummer: '928497704',
            orgNavn: 'SNILL TORPEDO',
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
        yrkesskadeDato: '2020-04-01',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2020-04-01',
            vurderingsdato: '2020-04-01',
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
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: ad349a50-38df-40bc-aa5a-1ff063cda46c',
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
    kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
    behandletTidspunkt: '2020-04-01T00:00:00Z',
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
    syketilfelleStartDato: '2020-04-01',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
})

export const sykmeldingMedEgenmeldingsdager = new Sykmelding({
    id: 'd22f6e8d-29c7-4c04-94e2-70103e3b8b5d',
    pasient: { fnr: '16856899687', fornavn: 'FAMILIÆR', mellomnavn: null, etternavn: 'BETALING' },
    mottattTidspunkt: '2023-03-16T23:00:00Z',
    behandlingsutfall: {
        status: 'MANUAL_PROCESSING',
        ruleHits: [
            {
                messageForSender: 'Pasienten finnes ikke i Infotrygd',
                messageForUser: 'Pasienten finnes ikke i Infotrygd',
                ruleName: 'PATIENT_NOT_IN_IP',
                ruleStatus: 'MANUAL_PROCESSING',
            },
        ],
    },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: { navn: 'LOMMEN BARNEHAVE', stillingsprosent: 100 },
    sykmeldingsperioder: [
        {
            fom: '2023-03-17',
            tom: '2023-03-23',
            gradert: null,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'medisinske årsaker til sykefravær',
                    arsak: ['AKTIVITET_FORHINDRER_BEDRING'],
                },
                arbeidsrelatertArsak: { beskrivelse: 'andre årsaker til sykefravær', arsak: ['ANNET'] },
            },
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: 'SENDT',
        timestamp: '2023-03-24T08:40:53.971138Z',
        arbeidsgiver: { orgnummer: '896929119', juridiskOrgnummer: '963743254', orgNavn: 'SAUEFABRIKK' },
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
                shortName: 'ARBEIDSSITUASJON',
                svar: { svarType: 'ARBEIDSSITUASJON', svar: 'ARBEIDSTAKER' },
            },
            {
                tekst: 'Velg dagene du brukte egenmelding',
                shortName: 'EGENMELDINGSDAGER',
                svar: {
                    svarType: 'DAGER',
                    svar: '["2023-02-24","2023-03-06","2023-03-07","2023-03-08","2023-03-09","2023-03-10","2023-02-20","2023-02-21","2023-02-22","2023-02-23","2023-02-25","2023-02-26"]',
                },
            },
        ],
    },
    medisinskVurdering: {
        hovedDiagnose: { kode: 'H100', system: '2.16.578.1.12.4.1.1.7110', tekst: 'Mukopurulent konjunktivitt' },
        biDiagnoser: [],
        annenFraversArsak: null,
        svangerskap: false,
        yrkesskade: false,
        yrkesskadeDato: null,
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: null,
        erIkkeIArbeid: null,
    },
    utdypendeOpplysninger: {
        '6.5': {
            '6.5.1': {
                sporsmal:
                    'Beskriv kort sykdomsutviklingen, symptomer og funn. Hvordan påvirker helsetilstanden funksjonen i arbeid og dagligliv?',
                svar: 'Har ikke blitt noe bedre. Klarer ikke å jobbe eller drive med aktiviteter',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.5.2': {
                sporsmal:
                    'Beskriv pågående og planlagt utredning og/eller behandling. Lar dette seg kombinere med delvis arbeid?',
                svar: 'Henvist til fysio. Duplikatbuster: b0e5c7f1-3216-47c9-9244-4c9c894d65dc',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.5.3': {
                sporsmal:
                    'Kan arbeidsevnen bedres gjennom medisinsk behandling og/eller arbeidsrelatert aktivitet? I så fall hvordan? Angi tidsperspektiv',
                svar: 'Nei',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
        },
    },
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
    andreTiltak: null,
    meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Trenger bistand' },
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
    behandletTidspunkt: '2023-03-17T00:00:00Z',
    behandler: {
        fornavn: 'NOBEL',
        mellomnavn: null,
        etternavn: 'BUSK',
        adresse: { gate: null, postnummer: null, kommune: null, postboks: null, land: null },
        tlf: ' 90909090',
    },
    syketilfelleStartDato: '2023-03-17',
    navnFastlege: null,
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
    rulesetVersion: '3',
    utenlandskSykmelding: null,
})

export const sykmeldinger: Sykmelding[] = [
    arbeidstaker100Syk,
    arbeidstaker50Syk,
    arbeidsledig100Syk,
    frilanser100Syk,
    gradertReisetilskuddSm,
    arbeidstakerBehandlingsdagSyk,
    arbeidstakerReisetilskuddSyk,
    syk1,
    syk2,
    syk3,
    syk4,
    syk5,
    syk7,
    syk8,
    brukertestSykmelding,
    julesoknadSykmelding,
]
