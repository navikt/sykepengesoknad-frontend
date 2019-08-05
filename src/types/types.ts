import { InntektskildeTyper, SporsmalsTyper, SykepengesoknadSvartyper, SykmeldingStatuser } from './enums';
import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon';
import { RSSvartype } from './rs-types/rs-svartype';
import { RSSoknadstype } from './rs-types/rs-soknadstype';
import { RSSoknadstatus } from './rs-types/rs-soknadstatus';
import dayjs from 'dayjs';
import { RSSporsmal } from './rs-types/rs-sporsmal';
import { RSSvar } from './rs-types/rs-svar';

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
    innsendtDato: Date;
    sendtTilNAVDato?: Date;
    sendtTilArbeidsgiverDato: Date;
    arbeidsgiver: Arbeidsgiver;
    sporsmal: Sporsmal[];

    constructor(
        id: string,
        sykmeldingId: string,
        soknadstype: string,
        status: string,
        fom: string, // yyyy-mm-dd
        tom: string,
        avbruttDato: string,
        opprettetDato: string,
        innsendtDato: string,
        sendtTilNAVDato: string,
        sendtTilArbeidsgiverDato: string,
        arbeidsgiver: Arbeidsgiver,
        sporsmal: RSSporsmal[],
    ) {
        this.id = id;
        this.sykmeldingId = sykmeldingId;
        const type = soknadstype as keyof typeof RSSoknadstype;
        this.soknadstype = RSSoknadstype[type];
        const stat = status as keyof typeof RSSoknadstatus;
        this.status = RSSoknadstatus[stat];
        this.fom = dayjs(fom).toDate();
        this.tom = dayjs(tom).toDate();
        this.avbruttDato = dayjs(avbruttDato).toDate();
        this.opprettetDato = dayjs(opprettetDato).toDate();
        this.innsendtDato = dayjs(innsendtDato).toDate();
        this.sendtTilNAVDato = dayjs(sendtTilNAVDato).toDate();
        this.sendtTilArbeidsgiverDato = dayjs(sendtTilArbeidsgiverDato).toDate();
        this.arbeidsgiver = {
            naermesteLeder: arbeidsgiver.naermesteLeder,
            navn: arbeidsgiver.navn,
            orgnummer: arbeidsgiver.orgnummer
        };
        this.sporsmal = rsToSporsmal(sporsmal);
    }
}

export class Sporsmal {
    id: string;
    tag: string;
    sporsmalstekst: string;
    undertekst: string;
    svartype: RSSvartype;
    min: Date;
    max: Date;
    pavirkerAndreSporsmal: boolean;
    kriterieForVisningAvUndersporsmal: string;
    svar: RSSvar[];
    undersporsmal: Sporsmal[];

    constructor(spm: RSSporsmal) {
        this.id = spm.id;
        this.tag = spm.tag;
        this.sporsmalstekst = spm.sporsmalstekst;
        this.undertekst = spm.undertekst;
        this.svartype = spm.svartype;
        this.min = dayjs(spm.min).toDate();
        this.max = dayjs(spm.max).toDate();
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

export interface OppsummeringSporsmal {
    svar: RSSvar,
    sporsmalstekst: string,
    tag: string
}

export interface Ledetekster {
    [s: string]: string
}
