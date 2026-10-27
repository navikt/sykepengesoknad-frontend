import { Sykmelding } from '../../../../types/sykmelding'
import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import {
    naringsdrivendeVirksomhetenAvviklet,
    naringsdrivendeNyIArbeidslivet,
    naringsdrivendeVarigEndring,
} from '../sporsmal/naringsdrivende'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { tilSlutt } from '../sporsmal/til-slutt'

import { Persona } from './personas'
import { fiskerLottOgHyre, fiskerLottOgHyreMedArbeidsgiver } from '../soknad/fisker-lott-og-hyre'
import { fiskerHyre, fiskerHyreMedArbeidsgiver } from '../soknad/fisker-hyre'
import { RSFiskerBlad } from '../../../../types/rs-types/rs-fiskerblad'
import { RSFiskerLottOgHyre } from '../../../../types/rs-types/rs-fiskerlottoghyre'

const fom = '2024-01-16'
const tom = '2024-01-22'
const fiskerSporsmal = () => [
    ansvarserklaring(),
    tilbakeIArbeid({
        fom,
        tom,
        tekstvariant: 'selvstendigNaeringsdrivende',
    }),
    arbeidUnderveis100Prosent({
        fom,
        tom,
        tekstvariant: 'selvstendigNaeringsdrivende',
        timerMaks: '150',
        normalArbeidsukeTekst: 'Jobber du vanligvis 37,5 timer i uka?',
    }),
    arbeidUtenforNorge(),
    andreInntektskilder({
        fom,
        tom,
        sporsmalstekst: 'Har du annen inntekt?',
        gruppeTekst: 'Hvilke inntektskilder har du?',
        kilder: [
            {
                tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD',
            },
            {
                tag: 'INNTEKTSKILDE_JORDBRUKER',
            },
            {
                tag: 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG',
            },
            { tag: 'INNTEKTSKILDE_ANNET' },
        ],
    }),
    oppholdUtenforEos({
        fom,
        tom,
        oppholdNarTag: 'PERIODER',
    }),
    naringsdrivendeVirksomhetenAvviklet(),
    naringsdrivendeNyIArbeidslivet(),
    naringsdrivendeVarigEndring(),
    tilSlutt({ sporsmalstekst: 'Viktig å være klar over:' }),
]

const soknad: RSSoknad = {
    id: '528a8b46-949f-330d-aac8-1e6cbe08d024',
    sykmeldingId: '7cbdefcc-0969-4da1-97b3-5989fbf89c68',
    soknadstype: 'SELVSTENDIGE_OG_FRILANSERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2024-01-23',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2024-01-16',
    sykmeldingUtskrevet: '2024-01-16',
    arbeidsgiver: null,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'FISKER',
    soknadPerioder: [
        {
            fom,
            tom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: fiskerSporsmal(),
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    utenlandskSykmelding: false,
    klippet: false,
    forstegangssoknad: true,
    fiskerBlad: RSFiskerBlad.B,
    fiskerLottOgHyre: RSFiskerLottOgHyre.LOTT,
}

export const fiskerLottOgHyreSykmelding = new Sykmelding({
    id: '7cbdefcc-0969-4da1-97b3-5989fbf89c68',
    pasient: {
        fnr: '23909698111',
        fornavn: 'UNDERDANIG',
        mellomnavn: null,
        etternavn: 'REGEL',
    },
    mottattTidspunkt: '2024-01-15T23:00:00Z',
    behandlingsutfall: {
        status: 'MANUAL_PROCESSING',
        ruleHits: [
            {
                messageForSender: 'Infotrygd returnerte en feil, vi kan ikke automatisk oppdatere Infotrygd',
                messageForUser: 'Infotrygd returnerte en feil, vi kan ikke automatisk oppdatere Infotrygd',
                ruleName: 'ERROR_FROM_IT_HOUVED_STATUS_KODEMELDING',
                ruleStatus: 'MANUAL_PROCESSING',
            },
        ],
    },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: {
        navn: 'Eksempel Arbeidsgiversen AS',
        stillingsprosent: 100,
    },
    sykmeldingsperioder: [
        {
            fom: '2024-01-16',
            tom: '2024-01-22',
            gradert: null,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'medisinske årsaker til sykefravær',
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
        timestamp: '2024-01-23T13:22:00.062397Z',
        arbeidsgiver: null,
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
                shortName: 'ARBEIDSSITUASJON',
                svar: {
                    svarType: 'ARBEIDSSITUASJON',
                    svar: 'NAERINGSDRIVENDE',
                },
            },
            {
                tekst: 'Vi har registrert at du ble syk 16. januar 2024. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                shortName: 'FRAVAER',
                svar: {
                    svarType: 'JA_NEI',
                    svar: 'NEI',
                },
            },
            {
                tekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                shortName: 'FORSIKRING',
                svar: {
                    svarType: 'JA_NEI',
                    svar: 'JA',
                },
            },
        ],
        brukerSvar: {
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'JA',
            },
            uriktigeOpplysninger: null,
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'FISKER',
            },
            arbeidsgiverOrgnummer: null,
            riktigNarmesteLeder: null,
            harBruktEgenmelding: {
                sporsmaltekst:
                    'Vi har registrert at du ble syk 16. januar 2024. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                svar: 'NEI',
            },
            egenmeldingsperioder: null,
            harForsikring: {
                sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                svar: 'JA',
            },
            egenmeldingsdager: null,
            harBruktEgenmeldingsdager: null,
            fisker: {
                blad: {
                    sporsmaltekst: 'Velg blad',
                    svar: 'A',
                },
                lottOgHyre: {
                    sporsmaltekst: 'Mottar du lott eller er du på hyre?',
                    svar: 'BEGGE',
                },
            },
        },
    },
    medisinskVurdering: {
        hovedDiagnose: {
            kode: 'H100',
            system: '2.16.578.1.12.4.1.1.7110',
            tekst: 'Mukopurulent konjunktivitt',
        },
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
                svar: 'Henvist til fysio. Duplikatbuster: 40468258-60cd-4619-b33c-bcfbaad92d4b',
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
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: null,
        begrunnelseIkkeKontakt: null,
    },
    behandletTidspunkt: '2024-01-16T00:00:00Z',
    behandler: {
        fornavn: 'VAKKER',
        mellomnavn: 'SLØVENDE',
        etternavn: 'STAUDE',
        adresse: {
            gate: null,
            postnummer: null,
            kommune: null,
            postboks: null,
            land: null,
        },
        tlf: ' 90909090',
    },
    syketilfelleStartDato: '2024-01-16',
    navnFastlege: null,
    egenmeldt: false,
    papirsykmelding: false,
    merknader: null,
    rulesetVersion: '3',
    utenlandskSykmelding: null,
})

export const fiskePerson: Persona = {
    soknader: [
        { ...soknad, demoinfo: 'Fisker på lott' },
        { ...fiskerLottOgHyre, demoinfo: 'Fisker lott og hyre uten arbeidsgiver' },
        { ...fiskerLottOgHyreMedArbeidsgiver, demoinfo: 'Fisker lott og hyre med arbeidsgiver' },
        { ...fiskerHyre, demoinfo: 'Fisker hyre uten arbeidsgiver' },
        { ...fiskerHyreMedArbeidsgiver, demoinfo: 'Fisker hyre med arbeidsgiver' },
    ],
    sykmeldinger: [fiskerLottOgHyreSykmelding],
    beskrivelse: 'Fisker',
}
