import { dayjsToDate } from '../utils/dato-utils'
import { SykmeldingStatuser, TagTyper } from './enums'
import { RSArbeidssituasjon, RSArbeidssituasjonType } from './rs-types/rs-arbeidssituasjon'
import { RSSoknad } from './rs-types/rs-soknad'
import { RSSoknadsperiode } from './rs-types/rs-soknadsperiode'
import { RSSoknadstatus } from './rs-types/rs-soknadstatus'
import { RSSoknadstype } from './rs-types/rs-soknadstype'
import { RSSporsmal } from './rs-types/rs-sporsmal'
import { RSSvarliste } from './rs-types/rs-svarliste'
import { RSSvartype } from './rs-types/rs-svartype'
import { RSVisningskriterieType } from './rs-types/rs-visningskriterie'

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
    diagnose?: string;
    diagnosekode: string;
    diagnosesystem: string;
    diagnosetekst?: string | null;
}

export interface SykmeldingPeriode {
    fom: string;
    tom: string;
    grad: number | null;
    behandlingsdager: number | null;
    reisetilskudd: boolean | null;
    avventende?: string | null;
    redusertVenteperiode?: boolean | null;
}

export interface Datospenn {
    fom: string | null;
    tom: string | null;
}

export interface Sykmelding {
    id: string;
    startLegemeldtFravaer: string | null;
    skalViseSkravertFelt: boolean;
    identdato: string;
    status: SykmeldingStatuser;
    naermesteLederStatus: string | null;
    erEgenmeldt?: boolean | null;
    erPapirsykmelding?: boolean | null;
    innsendtArbeidsgivernavn: string | null;
    valgtArbeidssituasjon: RSArbeidssituasjonType | null;
    mottakendeArbeidsgiver?: {
        navn: string;
        virksomhetsnummer: string;
        juridiskOrgnummer: string;
    } | null;
    orgnummer?: string | null;
    sendtdato: string;
    sporsmal: {
        harForsikring: boolean | null;
        'arbeidssituasjon': RSArbeidssituasjonType | null;
        'fravaersperioder': Datospenn[] | null;
        'harAnnetFravaer': boolean | null;
    };
    pasient: {
        fnr: string | null;
        fornavn: string | null;
        mellomnavn: string | null;
        etternavn: string | null;
    };
    arbeidsgiver: string | null;
    stillingsprosent: number | null;
    diagnose: {
        hoveddiagnose: SykmeldingDiagnose;
        bidiagnoser: SykmeldingDiagnose[] | null;
        fravaersgrunnLovfestet: string | null;
        fravaerBeskrivelse: string | null;
        svangerskap: boolean | null;
        yrkesskade: boolean | null;
        yrkesskadeDato: string | null;
    };
    mulighetForArbeid: {
        perioder: SykmeldingPeriode[];
        aktivitetIkkeMulig433: string[] | null;
        aktivitetIkkeMulig434: string[] | null;
        aarsakAktivitetIkkeMulig433: string | null;
        aarsakAktivitetIkkeMulig434: string | null;
    };
    friskmelding: {
        arbeidsfoerEtterPerioden: boolean | null;
        hensynPaaArbeidsplassen: string | null;
        antarReturSammeArbeidsgiver: boolean;
        antattDatoReturSammeArbeidsgiver: string | null;
        antarReturAnnenArbeidsgiver: boolean;
        tilbakemeldingReturArbeid: string | null;
        utenArbeidsgiverAntarTilbakeIArbeid: boolean;
        utenArbeidsgiverAntarTilbakeIArbeidDato: string | null;
        utenArbeidsgiverTilbakemelding: string | null;
    };
    utdypendeOpplysninger: {
        sykehistorie?: string | null;
        paavirkningArbeidsevne?: string | null;
        resultatAvBehandling?: string | null;
        henvisningUtredningBehandling?: string | null;
        grupper: {
            id: string;
            sporsmal: {
                id: string;
                svar: string;
            }[];
        }[];
    };
    arbeidsevne: {
        tilretteleggingArbeidsplass: string | null;
        tiltakNAV: string | null;
        tiltakAndre: string | null;
    };
    meldingTilNav: {
        navBoerTaTakISaken: boolean;
        navBoerTaTakISakenBegrunnelse: string | null;
    };
    innspillTilArbeidsgiver: string | null;
    tilbakedatering: {
        dokumenterbarPasientkontakt: string | null;
        tilbakedatertBegrunnelse: string | null;
    };
    bekreftelse: {
        utstedelsesdato: string | null;
        sykmelder: string | null;
        sykmelderTlf: string | null;
    };
}

export class Soknad {
    id: string;
    sykmeldingId: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    arbeidssituasjon: RSArbeidssituasjon | null;
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
        this.id = soknad.id
        this.sykmeldingId = soknad.sykmeldingId!
        const type = soknad.soknadstype as keyof typeof RSSoknadstype
        this.soknadstype = RSSoknadstype[type]
        const stat = soknad.status as keyof typeof RSSoknadstatus
        this.status = RSSoknadstatus[stat]
        this.fom = dayjsToDate(soknad.fom!)!
        this.tom = dayjsToDate(soknad.tom!)!
        this.avbruttDato = dayjsToDate(soknad.avbruttDato!)!
        this.opprettetDato = dayjsToDate(soknad.opprettetDato!)!
        this.sendtTilNAVDato = dayjsToDate(soknad.sendtTilNAVDato!)!
        this.sendtTilArbeidsgiverDato = dayjsToDate(soknad.sendtTilArbeidsgiverDato!)!
        if (soknad.arbeidsgiver) {
            this.arbeidsgiver = {
                naermesteLeder: soknad.arbeidsgiver.naermesteLeder,
                navn: soknad.arbeidsgiver.navn,
                orgnummer: soknad.arbeidsgiver.orgnummer
            }
        }
        this.arbeidssituasjon = soknad.arbeidssituasjon as any
        this.sporsmal = rsToSporsmal(soknad.sporsmal, undefined as any, true)
        this.soknadPerioder = soknad.soknadPerioder
    }
}

export class Sporsmal {
    id: string;
    tag: TagTyper;
    tagIndex?: number;
    sporsmalstekst: string;
    undertekst: string | null;
    svartype: RSSvartype;
    min: string | null;
    max: string | null;
    pavirkerAndreSporsmal: boolean;
    kriterieForVisningAvUndersporsmal: string;
    svarliste: RSSvarliste;
    undersporsmal: Sporsmal[];
    parentKriterie: RSVisningskriterieType | null;
    erHovedsporsmal: boolean;

    constructor(spm: RSSporsmal, kriterie: RSVisningskriterieType | null, erHovedsporsmal: boolean) {
        this.id = spm.id
        const orgarr: string[] = spm.tag.split('_')
        const numtag: number = parseInt(orgarr.pop() as any)
        let tag = spm.tag
        if (!isNaN(numtag)) {
            this.tagIndex = numtag
            tag = orgarr.join('_')
        }
        const idtag = tag as keyof typeof TagTyper
        this.tag = TagTyper[idtag]
        this.sporsmalstekst = spm.sporsmalstekst === null ? '' : spm.sporsmalstekst
        this.undertekst = spm.undertekst
        this.svartype = spm.svartype as any as RSSvartype
        this.min = spm.min
        this.max = spm.max
        this.pavirkerAndreSporsmal = spm.pavirkerAndreSporsmal
        this.kriterieForVisningAvUndersporsmal = spm.kriterieForVisningAvUndersporsmal as any
        this.svarliste = { sporsmalId: spm.id, svar: spm.svar }
        this.undersporsmal = rsToSporsmal(spm.undersporsmal, spm.kriterieForVisningAvUndersporsmal, false)
        this.parentKriterie = kriterie
        this.erHovedsporsmal = erHovedsporsmal
    }
}

function rsToSporsmal(spms: RSSporsmal[], kriterie: RSVisningskriterieType | null, erHovedsporsmal: boolean) {
    const sporsmals: Sporsmal[] = []
    if (spms === undefined) {
        return sporsmals
    }
    spms.forEach(rssp => {
        const spm: Sporsmal = new Sporsmal(rssp, kriterie, erHovedsporsmal)
        sporsmals.push(spm)
    })

    if (sporsmals.length >= 2 && sporsmals[sporsmals.length - 1].tag === TagTyper.VAER_KLAR_OVER_AT && sporsmals[sporsmals.length - 2].tag === TagTyper.BEKREFT_OPPLYSNINGER) {
        // Det finnes tilfeller opprettet i db før 15 Mai 2020 hvor disse er i "feil rekkefølge" Dette fikser sorteringa
        // Se også https://github.com/navikt/syfosoknad/commit/1983d32f3a7fb28bbf17126ea227d91589ad5f35
        const tmp = sporsmals[sporsmals.length - 1]
        sporsmals[sporsmals.length - 1] = sporsmals[sporsmals.length - 2]
        sporsmals[sporsmals.length - 2] = tmp
    }
    return sporsmals
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

export interface Ettersend {
    type: 'nav' | 'arbeidsgiver';
    dato: Date;
}
