import { dayjsToDate } from '../utils/dato-utils';
import { SykmeldingStatuser, TagTyper } from './enums';
import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon';
import { RSSoknad } from './rs-types/rs-soknad';
import { RSSoknadsperiode } from './rs-types/rs-soknadsperiode';
import { RSSoknadstatus } from './rs-types/rs-soknadstatus';
import { RSSoknadstype } from './rs-types/rs-soknadstype';
import { RSSporsmal } from './rs-types/rs-sporsmal';
import { RSSvarliste } from './rs-types/rs-svarliste';
import { RSSvartype } from './rs-types/rs-svartype';

export interface TidsPeriode {
    fom: Date;
    tom: Date;
}

export interface NaermesteLeder {
    navn: string;
    epost: string;
    mobil: string;
    orgnummer: string;
    organisasjonsnavn: string;
    aktivTom: string;
}

export interface Arbeidsgiver {
    navn: string;
    orgnummer: string;
    naermesteLeder?: NaermesteLeder;
}

export interface SykmeldingDiagnose {
    diagnose: string;
    diagnosekode: string;
    diagnosesystem: string;
}

export interface SykmeldingPeriode {
    fom: Date;
    tom: Date;
    grad: number;
    behandlingsdager: number;
    reisetilskudd: boolean;
    avventende: string;
}

export interface Sykmelding {
    id: string;
    startLegemeldtFravaer: Date;
    skalViseSkravertFelt: boolean;
    identdato: Date;
    status: SykmeldingStatuser;
    naermesteLederStatus: string;
    innsendtArbeidsgivernavn: string;
    valgtArbeidssituasjon: RSArbeidssituasjon;
    mottakendeArbeidsgiver: {
        navn: string;
        virksomhetsnummer: string;
        juridiskOrgnummer: string;
    };
    orgnummer: string;
    sendtDato: Date;
    sporsmal: {
        harForsikring: boolean;
    };
    pasient: {
        fnr: string;
        fornavn: string;
        mellomnavn: string;
        etternavn: string;
    };
    arbeidsgiver: string;
    stillingsprosent: number;
    diagnose: {
        hoveddiagnose: SykmeldingDiagnose;
        bidiagnoser: SykmeldingDiagnose[];
        fravaersgrunnLovfestet: string;
        fravaerBeskrivelse: string;
        svangerskap: boolean;
        yrkesskade: boolean;
        yrkesskadeDato: Date;
    };
    mulighetForArbeid: {
        perioder: SykmeldingPeriode[];
        aktivitetIkkeMulig433: string[];
        aktivitetIkkeMulig434: string[];
        aarsakAktivitetIkkeMulig433: string;
        aarsakAktivitetIkkeMulig434: string;
    };
    friskmelding: {
        arbeidsfoerEtterPerioden: boolean;
        hensynPaaArbeidsplassen: string;
        antarReturSammeArbeidsgiver: boolean;
        antattDatoReturSammeArbeidsgiver: Date;
        antarReturAnnenArbeidsgiver: boolean;
        tilbakemeldingReturArbeid: Date;
        utenArbeidsgiverAntarTilbakeIArbeid: boolean;
        utenArbeidsgiverAntarTilbakeIArbeidDato: Date;
        utenArbeidsgiverTilbakemelding: Date;
    };
    utdypendeOpplysninger: {
        sykehistorie: string;
        paavirkningArbeidsevne: string;
        resultatAvBehandling: string;
        henvisningUtredningBehandling: string;
        grupper: {
            id: string;
            sporsmal: {
                id: string;
                svar: string;
            }[];
        }[];
    };
    arbeidsevne: {
        tilretteleggingArbeidsplass: string;
        tiltakNAV: string;
        tiltakAndre: string;
    };
    meldingTilNav: {
        navBoerTaTakISaken: boolean;
        navBoerTaTakISakenBegrunnelse: string;
    };
    innspillTilArbeidsgiver: string;
    tilbakedatering: {
        dokumenterbarPasientkontakt: Date;
        tilbakedatertBegrunnelse: string;
    };
    bekreftelse: {
        utstedelsesdato: Date;
        sykmelder: string;
        sykmelderTlf: string;
    };
}

export class Soknad {
    id: string;
    sykmeldingId: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    fom?: Date;
    tom?: Date;
    avbruttDato?: Date;
    opprettetDato: Date;
    sendtTilNAVDato?: Date;
    sendtTilArbeidsgiverDato?: Date;
    arbeidsgiver?: Arbeidsgiver;
    sporsmal: Sporsmal[];
    soknadPerioder: RSSoknadsperiode[];

    constructor(
        soknad: RSSoknad
    ) {
        this.id = soknad.id;
        this.sykmeldingId = soknad.sykmeldingId!;
        const type = soknad.soknadstype as keyof typeof RSSoknadstype;
        this.soknadstype = RSSoknadstype[type];
        const stat = soknad.status as keyof typeof RSSoknadstatus;
        this.status = RSSoknadstatus[stat];
        this.fom = dayjsToDate(soknad.fom!)!;
        this.tom = dayjsToDate(soknad.tom!)!;
        this.avbruttDato = dayjsToDate(soknad.avbruttDato!)!;
        this.opprettetDato = dayjsToDate(soknad.opprettetDato!)!;
        this.sendtTilNAVDato = dayjsToDate(soknad.sendtTilNAVDato!)!;
        this.sendtTilArbeidsgiverDato = dayjsToDate(soknad.sendtTilArbeidsgiverDato!)!;
        if (soknad.arbeidsgiver) {
            this.arbeidsgiver = {
                naermesteLeder: soknad.arbeidsgiver.naermesteLeder,
                navn: soknad.arbeidsgiver.navn,
                orgnummer: soknad.arbeidsgiver.orgnummer
            };
        }
        this.sporsmal = rsToSporsmal(soknad.sporsmal, undefined as any, true);
        this.soknadPerioder = soknad.soknadPerioder;
    }
}

export class Sporsmal {
    id: string;
    tag: TagTyper;
    tagIndex?: number;
    sporsmalstekst: string;
    undertekst: string;
    svartype: RSSvartype;
    min: string;
    max: string;
    pavirkerAndreSporsmal: boolean;
    kriterieForVisningAvUndersporsmal: string;
    svarliste: RSSvarliste;
    undersporsmal: Sporsmal[];
    parentKriterie?: string;
    erHovedsporsmal: boolean;

    constructor(spm: RSSporsmal, kriterie: string, erHovedsporsmal: boolean) {
        this.id = spm.id;
        const orgarr: string[] = spm.tag.split('_');
        const numtag: number = parseInt(orgarr.pop() as any);
        let tag = spm.tag;
        if (!isNaN(numtag)) {
            this.tagIndex = numtag;
            tag = orgarr.join('_');
        }
        const idtag = tag as keyof typeof TagTyper;
        this.tag = TagTyper[idtag];
        this.sporsmalstekst = spm.sporsmalstekst === null ? '' : spm.sporsmalstekst;
        this.undertekst = spm.undertekst;
        this.svartype = spm.svartype;
        this.min = spm.min;
        this.max = spm.max;
        this.pavirkerAndreSporsmal = spm.pavirkerAndreSporsmal;
        this.kriterieForVisningAvUndersporsmal = spm.kriterieForVisningAvUndersporsmal;
        this.svarliste = { sporsmalId: spm.id, svar: spm.svar };
        this.undersporsmal = rsToSporsmal(spm.undersporsmal, spm.kriterieForVisningAvUndersporsmal, false);
        this.parentKriterie = kriterie;
        this.erHovedsporsmal = erHovedsporsmal;
    }
}

function rsToSporsmal(spms: RSSporsmal[], kriterie: string, erHovedsporsmal: boolean) {
    const sporsmals: Sporsmal[] = [];
    if (spms === undefined) {
        return sporsmals;
    }
    spms.forEach(rssp => {
        const spm: Sporsmal = new Sporsmal(rssp, kriterie, erHovedsporsmal);
        sporsmals.push(spm);
    });
    return sporsmals;
}

export interface UnleashToggles {
    [index: string]: boolean;
}

export interface Brodsmule {
    sti: string;
    tittel: string;
    sisteSmule?: boolean;
    erKlikkbar?: boolean;
}

export interface IdParams {
    id: string;
    stegId: string;
}
