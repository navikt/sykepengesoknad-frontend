import { Sykmelding } from '../../../../types/sykmelding'
import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { formatterPeriode } from '../sporsmal/backend-datoformat'
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

const fom = '2024-01-16'
const tom = '2024-01-22'
const fiskerSporsmal = () => [
    ansvarserklaring({ id: '43f3c0c5-65cb-3d4e-b31f-c02c2599ee95' }),
    tilbakeIArbeid({
        fom,
        tom,
        id: '79c730fc-155e-3088-97cd-8817df252068',
        tilbakeNarId: 'e9a48ebc-3ce0-3e37-9e70-f670c299ba23',
        tekstvariant: 'selvstendigNaeringsdrivende',
    }),
    arbeidUnderveis100Prosent({
        fom,
        tom,
        id: 'e753746d-b9d5-34b8-a1cf-2820230349e7',
        tekstvariant: 'selvstendigNaeringsdrivende',
        timerMaks: '150',
        normalArbeidsukeTekst: 'Jobber du vanligvis 37,5 timer i uka?',
        ids: {
            arbeidsmengde: '44205b66-543f-3c16-aa33-6a3409fb5c29',
            prosent: '743a28f0-49ef-3afe-9c9f-10fa36900863',
            prosentVerdi: 'e07582c1-d467-396d-a23c-5c3341755137',
            timer: 'fc08b217-339f-3cad-9042-74cdc3b847b1',
            timerVerdi: 'f68a1f4b-1f6e-3492-9135-64a558b3f41f',
            normalArbeidsuke: '10c77174-b2a5-3af9-88d9-fc4a68b8c5a1',
            timerPerUke: '30741b9d-ea65-3a74-81c9-cb53ee2e50f5',
        },
    }),
    arbeidUtenforNorge({ id: '1e68ef44-be0f-3238-ac37-3c75127040aa' }),
    andreInntektskilder({
        fom,
        tom,
        id: '9b7bb2ac-fb1f-3a81-8050-c115b1c34fab',
        gruppeId: '5dd63529-a2d6-3f1d-bd4d-c30e44ed56b5',
        sporsmalstekst: 'Har du annen inntekt?',
        gruppeTekst: 'Hvilke inntektskilder har du?',
        kilder: [
            {
                tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD',
                id: 'ce35ceb6-faf5-3d25-a84c-03fd1203cc3d',
                erDuSykmeldtId: '4fdece55-db3d-3ead-a13f-a8248beddc79',
            },
            {
                tag: 'INNTEKTSKILDE_JORDBRUKER',
                id: '29737553-f79e-3ada-b7d5-144b27708d68',
                erDuSykmeldtId: '579801e4-fda2-3f02-905b-dfd977b64b2a',
            },
            {
                tag: 'INNTEKTSKILDE_FRILANSER_SELVSTENDIG',
                id: '9c5312f2-95ab-3c5e-9f32-cc0ceec1ac6f',
                erDuSykmeldtId: 'cb41b700-b2e2-36a2-a38b-568ca5442b76',
            },
            { tag: 'INNTEKTSKILDE_ANNET', id: '50bd58f9-2b59-3090-a72e-72e2eb4de935' },
        ],
    }),
    oppholdUtenforEos({
        fom,
        tom,
        id: '58f48c4f-3bc2-3f17-a642-a24383db8e6c',
        oppholdNarId: 'c03398c6-55ac-3e90-a809-79a63f106260',
        oppholdNarTag: 'PERIODER',
        sporsmalstekst: `Har du vært utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    }),
    naringsdrivendeVirksomhetenAvviklet(),
    naringsdrivendeNyIArbeidslivet(),
    naringsdrivendeVarigEndring(),
    tilSlutt({ id: '2c102d54-1d2a-3929-be27-09bfbb7ee7cb', sporsmalstekst: 'Viktig å være klar over:' }),
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
}

const sykmelding = new Sykmelding({
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
    soknader: [{ ...soknad, demoinfo: 'Fisker på hyre og lott' }],
    sykmeldinger: [sykmelding],
    beskrivelse: 'Fisker',
}
