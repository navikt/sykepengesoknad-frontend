import { Sykmelding } from '../../../types/sykmelding'
import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { oppsummering } from './sporsmal/oppsummering'
import { andreInntektskilderV2 } from './sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from './sporsmal/ansvarserklaring'
import { tilbakeIArbeid } from './sporsmal/tilbake-i-arbeid'
import { ferieV2 } from './sporsmal/ferie-v2'
import { permisjonV2 } from './sporsmal/permisjon-v2'
import { arbeidUnderveis100Prosent } from './sporsmal/arbeid-underveis-100-prosent'
import { arbeidUtenforNorge } from './sporsmal/arbeid-utenfor-norge'
import { oppholdUtenforEos } from './sporsmal/opphold-utenfor-eos'

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
    opprettetDato?: string
}): RSSoknad {
    const { fom, tom, hovedjobb, sykmeldingId, soknadId, opprettetDato } = opts

    return {
        id: soknadId,
        sykmeldingId: sykmeldingId,
        soknadstype: 'ARBEIDSTAKERE',
        status: 'NY',
        fom: fom,
        tom: tom,
        opprettetDato: opprettetDato ?? '2022-11-17',
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
            ansvarserklaring(),
            tilbakeIArbeid({ fom, tom, arbeidsgiver: hovedjobb }),
            ferieV2({ fom, tom }),
            permisjonV2({ fom, tom }),
            arbeidUnderveis100Prosent({ fom, tom, arbeidsgiver: hovedjobb }),
            arbeidUtenforNorge(),
            andreInntektskilderV2(),
            oppholdUtenforEos({ fom, tom }),
            oppsummering(),
        ],
        egenmeldtSykmelding: false,
        opprettetAvInntektsmelding: false,
        klippet: false,
    }
}
