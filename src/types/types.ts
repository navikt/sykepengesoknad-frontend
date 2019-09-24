import { InntektskildeTyper, SporsmalsTyper, SykepengesoknadSvartyper, SykmeldingStatuser, TagTyper } from './enums';
import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon';
import { RSSvartype } from './rs-types/rs-svartype';
import { RSSoknadstype } from './rs-types/rs-soknadstype';
import { RSSoknadstatus } from './rs-types/rs-soknadstatus';
import dayjs from 'dayjs';
import { RSSporsmal } from './rs-types/rs-sporsmal';
import { RSSvar } from './rs-types/rs-svar';
import { RSSoknad } from './rs-types/rs-soknad';
import { RSSoknadsperiode } from './rs-types/rs-soknadsperiode';

export interface SykepengesoknadOppsummeringLedetekst {
    nokkel: string,
    tekst: string,
    verdier: {}
}

export interface SykepengesoknadOppsummeringTilleggstekst {
    ledetekst: SykepengesoknadOppsummeringLedetekst,
    type: SykepengesoknadSvartyper
}

export interface SykepengesoknadOppsummeringSvar {
    ledetekst: SykepengesoknadOppsummeringLedetekst,
    type: SykepengesoknadSvartyper,
    tilleggstekst: SykepengesoknadOppsummeringTilleggstekst,
}

export interface SykepengesoknadOppsummeringSporsmal {
    ledetekst: SykepengesoknadOppsummeringLedetekst,
    svar: SykepengesoknadOppsummeringSvar[],
    type: SporsmalsTyper
}

export interface oppsummeringsoknad {
    bekreftetKorrektInformasjon: SykepengesoknadOppsummeringSporsmal,
    oppsummering: SykepengesoknadOppsummeringSporsmal[],
    vaerKlarOverAt: SykepengesoknadOppsummeringTilleggstekst,
}

export interface TidslinjeHendelse {
    antallDager: number,
    bilde: string,
    data: Object,
    id: string,
    inntruffetdato: Date,
    tekstkey: string,
    type: string,
    erApen: boolean,
    medAnimasjon: boolean,
    hindreToggle: boolean,
    hoyde: string,
    visBudskap: boolean,
    alt: number,
}

export interface SoknadPeriode {
    fom: Date,
    tom: Date
}

export interface TidsPeriode {
    fom: Date,
    tom: Date
}

export interface AnnenInntektskilde {
    sykmeldt: boolean,
    annenInntektskildeType: InntektskildeTyper
}

export interface NaermesteLeder {
    navn: string,
    epost: string,
    mobil: string,
    orgnummer: string,
    organisasjonsnavn: string,
    aktivTom: string
}

export interface Arbeidsgiver {
    navn: string,
    orgnummer: string,
    naermesteLeder?: NaermesteLeder
}

export interface SoknadsAktivitet {
    periode: SoknadPeriode,
    grad: number,
    avvik: {
        arbeidstimerNormalUke: number,
        arbeidsgrad: number,
        timer: number,
        beregnetArbeidsgrad: number,
    },
    id: number,
}

export interface SykmeldingDiagnose {
    diagnose: string,
    diagnosekode: string,
    diagnosesystem: string,
}

export interface SykmeldingPeriode {
    fom: Date,
    tom: Date,
    grad: number,
    behandlingsdager: number,
    reisetilskudd: boolean,
    avventende: string,
}

export interface Sykmelding {
    id: string,
    sporsmal: any,
    startLegemeldtFravaer: Date,
    skalViseSkravertFelt: boolean,
    identdato: Date,
    status: SykmeldingStatuser,
    naermesteLederStatus: string,
    innsendtArbeidsgivernavn: string,
    valgtArbeidssituasjon: RSArbeidssituasjon,
    mottakendeArbeidsgiver: {
        navn: string,
        virksomhetsnummer: string,
        juridiskOrgnummer: string,
    },
    orgnummer: string,
    sendtDato: Date,
    pasient: {
        fnr: string,
        fornavn: string,
        mellomnavn: string,
        etternavn: string,
    },
    arbeidsgiver: string,
    stillingsprosent: number,
    diagnose: {
        hoveddiagnose: SykmeldingDiagnose,
        bidiagnoser: SykmeldingDiagnose[],
        fravaersgrunnLovfestet: string,
        fravaerBeskrivelse: string,
        svangerskap: boolean,
        yrkesskade: boolean,
        yrkesskadeDato: Date,
    },
    mulighetForArbeid: {
        perioder: SykmeldingPeriode[],
        aktivitetIkkeMulig433: string[],
        aktivitetIkkeMulig434: string[],
        aarsakAktivitetIkkeMulig433: string,
        aarsakAktivitetIkkeMulig434: string,
    },
    friskmelding: {
        arbeidsfoerEtterPerioden: boolean,
        hensynPaaArbeidsplassen: string,
        antarReturSammeArbeidsgiver: boolean,
        antattDatoReturSammeArbeidsgiver: Date,
        antarReturAnnenArbeidsgiver: boolean,
        tilbakemeldingReturArbeid: Date,
        utenArbeidsgiverAntarTilbakeIArbeid: boolean,
        utenArbeidsgiverAntarTilbakeIArbeidDato: Date,
        utenArbeidsgiverTilbakemelding: Date,
    },
    utdypendeOpplysninger: {
        sykehistorie: string,
        paavirkningArbeidsevne: string,
        resultatAvBehandling: string,
        henvisningUtredningBehandling: string,
        grupper: {
            id: string,
            sporsmal: {
                id: string,
                svar: string,
            }[],
        }[],
    },
    arbeidsevne: {
        tilretteleggingArbeidsplass: string,
        tiltakNAV: string,
        tiltakAndre: string,
    },
    meldingTilNav: {
        navBoerTaTakISaken: boolean,
        navBoerTaTakISakenBegrunnelse: string,
    },
    innspillTilArbeidsgiver: string,
    tilbakedatering: {
        dokumenterbarPasientkontakt: Date,
        tilbakedatertBegrunnelse: string,
    },
    bekreftelse: {
        utstedelsesdato: Date,
        sykmelder: string,
        sykmelderTlf: string,
    }
}

export interface Toggles {
    data: Map<string, boolean>,
    henter: boolean,
    hentingFeilet: boolean,
    hentet: boolean,
}

export interface SykeForloep {
    senesteTom: {
        grad: number,
        dato: Date,
    },
    tidligsteFom: {
        grad: number,
        dato: Date,
        identdato: Date,
    },
}

export interface FnrVirksomhetsNummer {
    fnr: string,
    virksomhetsnummer: string,
}

export interface SykeforlopPeriode {
    fom: string | Date,
    tom: string | Date,
    grad: number,
    behandlingsdager: number,
    reisetilskudd: boolean,
    avventende: string,
}

export class Soknad {
    id: string;
    sykmeldingId?: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    fom?: Date;
    tom?: Date;
    avbruttDato?: Date;
    opprettetDato: Date;
    sendtTilNAVDato?: Date;
    sendtTilArbeidsgiverDato: Date;
    arbeidsgiver?: Arbeidsgiver;
    sporsmal: Sporsmal[];
    soknadPerioder: RSSoknadsperiode[];

    constructor(
        soknad: RSSoknad
    ) {
        this.id = soknad.id;
        this.sykmeldingId = soknad.sykmeldingId;
        const type = soknad.soknadstype as keyof typeof RSSoknadstype;
        this.soknadstype = RSSoknadstype[type];
        const stat = soknad.status as keyof typeof RSSoknadstatus;
        this.status = RSSoknadstatus[stat];
        this.fom = dayjs(soknad.fom).toDate();
        this.tom = dayjs(soknad.tom).toDate();
        this.avbruttDato = dayjs(soknad.avbruttDato).toDate();
        this.opprettetDato = dayjs(soknad.opprettetDato).toDate();
        this.sendtTilNAVDato = dayjs(soknad.sendtTilNAVDato).toDate();
        this.sendtTilArbeidsgiverDato = dayjs(soknad.sendtTilArbeidsgiverDato).toDate();
        if (soknad.arbeidsgiver) {
            this.arbeidsgiver = {
                naermesteLeder: soknad.arbeidsgiver.naermesteLeder,
                navn: soknad.arbeidsgiver.navn,
                orgnummer: soknad.arbeidsgiver.orgnummer
            };
        }
        this.sporsmal = rsToSporsmal(soknad.sporsmal);
        this.soknadPerioder = soknad.soknadPerioder;
    }
}

export class Sporsmal {
    id: string;
    tag: TagTyper;
    sporsmalstekst: string;
    undertekst: string;
    svartype: RSSvartype;
    min: string;
    max: string;
    pavirkerAndreSporsmal: boolean;
    kriterieForVisningAvUndersporsmal: string;
    svar: RSSvar[];
    undersporsmal: Sporsmal[];

    constructor(spm: RSSporsmal) {
        this.id = spm.id;
        const tag = spm.tag as keyof typeof TagTyper;
        this.tag = TagTyper[tag];
        this.sporsmalstekst = spm.sporsmalstekst;
        this.undertekst = spm.undertekst;
        this.svartype = spm.svartype;
        this.min = spm.min;
        this.max = spm.max;
        this.pavirkerAndreSporsmal = spm.pavirkerAndreSporsmal;
        this.kriterieForVisningAvUndersporsmal = spm.kriterieForVisningAvUndersporsmal;
        this.svar = spm.svar;
        this.undersporsmal = rsToSporsmal(spm.undersporsmal);
    }
}

function rsToSporsmal(spms: RSSporsmal[]) {
    let sporsmals: Sporsmal[] = [];
    spms.forEach(rssp => {
        const spm: Sporsmal = new Sporsmal(rssp);
        sporsmals.push(spm);
    });
    return sporsmals;
}

export interface Brodsmule {
    sti: string,
    tittel: string,
    sisteSmule?: boolean,
    erKlikkbar?: boolean,
}

interface Meta {
    error: string,
    touched: boolean
}

interface Input {
    name: string,
    onBlur: Function,
    onChange: Function,
    onDragStart: Function,
    onDrop: Function,
    onFocus: Function
}

export interface Fields {
    push: Function,
    map: Function,
    length: number
}

export interface Ledetekster {
    [s: string]: string
}

export interface SvarVerdi {
    key: RSSvartype,
    value: any
}

export interface Feil {
    tom: string,
    fom: string
}
