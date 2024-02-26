// Class for objects that need parsing (e.g. dates and enums)
// Interface for all other objects.
// Type for string literals.
// Enum for string literals with corresponding value.
import dayjs from 'dayjs'

import { dayjsToDate } from '../utils/dato-utils'

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

class MedisinskArsak {
    beskrivelse: string
    arsak: MedisinskArsakType[]

    constructor(medisinskArsak: any) {
        this.beskrivelse = medisinskArsak.beskrivelse
        this.arsak = medisinskArsak.arsak.map(
            (arsak: string) => MedisinskArsakType[arsak as keyof typeof MedisinskArsakType],
        )
    }
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

class ArbeidsrelatertArsak {
    beskrivelse: string
    arsak: ArbeidsrelatertArsakType[]

    constructor(arbeidsrelatertArsak: any) {
        this.beskrivelse = arbeidsrelatertArsak.beskrivelse
        this.arsak = arbeidsrelatertArsak.arsak.map(
            (arsak: string) => ArbeidsrelatertArsakType[arsak as keyof typeof ArbeidsrelatertArsakType],
        )
    }
}

class AktivitetIkkeMulig {
    medisinskArsak?: MedisinskArsak
    arbeidsrelatertArsak?: ArbeidsrelatertArsak

    constructor(aktivitetIkkeMulig: any) {
        this.medisinskArsak = aktivitetIkkeMulig.medisinskArsak
            ? new MedisinskArsak(aktivitetIkkeMulig.medisinskArsak)
            : undefined
        this.arbeidsrelatertArsak = aktivitetIkkeMulig.arbeidsrelatertArsak
            ? new ArbeidsrelatertArsak(aktivitetIkkeMulig.arbeidsrelatertArsak)
            : undefined
    }
}

interface Gradert {
    grad: number
    reisetilskudd: boolean
}

type Periodetype = 'AKTIVITET_IKKE_MULIG' | 'AVVENTENDE' | 'BEHANDLINGSDAGER' | 'GRADERT' | 'REISETILSKUDD'

export class Periode {
    fom: Date
    tom: Date
    aktivitetIkkeMulig?: AktivitetIkkeMulig
    gradert?: Gradert
    behandlingsdager?: number
    type: Periodetype

    constructor(periode: any) {
        this.fom = dayjsToDate(periode.fom)!
        this.tom = dayjsToDate(periode.tom)!
        this.aktivitetIkkeMulig = periode.aktivitetIkkeMulig
            ? new AktivitetIkkeMulig(periode.aktivitetIkkeMulig)
            : undefined
        this.gradert = periode.gradert || undefined
        this.behandlingsdager = periode.behandlingsdager || undefined
        this.type = periode.type
    }
}

export type StatusEvent = 'SENDT' | 'APEN' | 'AVBRUTT' | 'UTGATT' | 'BEKREFTET'

interface ArbeidsgiverStatus {
    orgnummer: string
    orgNavn: string
}

type SvarType = 'ARBEIDSSITUASJON' | 'PERIODER' | 'JA_NEI' | 'DAGER'

interface Svar {
    svar: string
    svarType: SvarType
}

type SporsmalShortName =
    | 'ARBEIDSSITUASJON'
    | 'NY_NARMESTE_LEDER'
    | 'FRAVAER'
    | 'PERIODE'
    | 'FORSIKRING'
    | 'EGENMELDINGSDAGER'

interface SporsmalOgSvar {
    tekst: string
    svar: Svar
    shortName: SporsmalShortName
}

interface ArbeidssituasjonSvar {
    svar: string
}
interface FiskerSvar {
    sporsmaltekst: string
    svar: string
}
interface Fisker {
    blad: FiskerSvar
    lottOgHyre: FiskerSvar
}
interface BrukerSvar {
    arbeidssituasjon: ArbeidssituasjonSvar
    fisker: Fisker
}

class SykmeldingStatus {
    timestamp: Date
    statusEvent: StatusEvent
    arbeidsgiver?: ArbeidsgiverStatus
    sporsmalOgSvarListe: SporsmalOgSvar[]
    brukerSvar?: BrukerSvar

    constructor(sykmeldingStatus: any) {
        this.timestamp = dayjsToDate(sykmeldingStatus.timestamp)!
        this.statusEvent = sykmeldingStatus.statusEvent
        this.arbeidsgiver = sykmeldingStatus.arbeidsgiver
        this.sporsmalOgSvarListe = sykmeldingStatus.sporsmalOgSvarListe
        this.brukerSvar = sykmeldingStatus.brukerSvar
    }
}
interface Pasient {
    overSyttiAar?: boolean
}

export class Sykmelding {
    id: string
    mottattTidspunkt: Date
    sykmeldingsperioder: Periode[]
    sykmeldingStatus: SykmeldingStatus
    behandletTidspunkt: Date
    syketilfelleStartDato: Date
    pasient?: Pasient

    constructor(sykmelding: any) {
        this.id = sykmelding.id
        this.mottattTidspunkt = dayjsToDate(sykmelding.mottattTidspunkt)!
        this.sykmeldingsperioder = sykmelding.sykmeldingsperioder.map((periode: any) => new Periode(periode))
        this.sykmeldingStatus = new SykmeldingStatus(sykmelding.sykmeldingStatus)
        this.behandletTidspunkt = dayjsToDate(sykmelding.behandletTidspunkt)!
        this.syketilfelleStartDato = dayjsToDate(sykmelding.syketilfelleStartDato)!
        this.pasient = sykmelding.pasient
    }
}

export function getSykmeldingStartDate(sykmelding: Sykmelding): dayjs.Dayjs {
    return dayjs(
        sykmelding.sykmeldingsperioder.reduce((acc, value) => {
            if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
                return value
            }
            return acc
        }).fom,
    )
}
