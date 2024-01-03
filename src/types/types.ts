import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon'
import { RSMerknad } from './rs-types/rs-merknad'
import { RSSoknadsperiode } from './rs-types/rs-soknadsperiode'
import { RSSoknadstatus } from './rs-types/rs-soknadstatus'
import { RSSoknadstype } from './rs-types/rs-soknadstype'
import { RSSvarliste } from './rs-types/rs-svarliste'
import { RSSvartype } from './rs-types/rs-svartype'
import { RSVisningskriterieType } from './rs-types/rs-visningskriterie'
import { ArbeidsforholdFraInntektskomponenten } from './rs-types/rs-arbeidsforholdfrainntektskomponenten'
import { ObjectCopier } from './object-copier'

export interface TidsPeriode {
    fom: Date
    tom: Date
}

export interface Arbeidsgiver {
    navn: string
    orgnummer: string
}

export class Soknad extends ObjectCopier {
    constructor(
        readonly id: string,
        readonly sykmeldingId: string | undefined,
        readonly soknadstype: RSSoknadstype,
        readonly status: RSSoknadstatus,
        readonly arbeidssituasjon: RSArbeidssituasjon | undefined,
        readonly fom: Date | undefined,
        readonly tom: Date | undefined,
        readonly avbruttDato: Date | undefined,
        readonly opprettetDato: Date | undefined,
        readonly sendtTilNAVDato: Date | undefined,
        readonly sendtTilArbeidsgiverDato: Date | undefined,
        readonly utenlandskSykmelding: boolean | undefined,
        readonly arbeidsgiver: Arbeidsgiver | undefined,
        readonly sporsmal: ReadonlyArray<Sporsmal>,
        readonly soknadPerioder: ReadonlyArray<RSSoknadsperiode>,
        readonly korrigerer: string | undefined,
        readonly merknaderFraSykmelding: ReadonlyArray<RSMerknad> | undefined,
        readonly opprettetAvInntektsmelding: boolean,
        readonly klippet: boolean,
        readonly inntektskilderDataFraInntektskomponenten?: ReadonlyArray<ArbeidsforholdFraInntektskomponenten>,
        readonly korrigeringsfristUtlopt?: boolean,
        readonly forstegangssoknad?: boolean,
        readonly inntektsopplysningerNyKvittering?: boolean,
        readonly inntektsopplysningerInnsendingId?: string,
        readonly inntektsopplysningerInnsendingDokumenter?: string[],
    ) {
        super()
    }
}

export class Sporsmal extends ObjectCopier {
    constructor(
        readonly id: string,
        readonly tag: string,
        readonly tagIndex: number | undefined,
        readonly sporsmalstekst: string,
        readonly undertekst: string | null,
        readonly svartype: RSSvartype,
        readonly min: string | null,
        readonly max: string | null,
        readonly kriterieForVisningAvUndersporsmal: string,
        readonly svarliste: RSSvarliste,
        readonly undersporsmal: ReadonlyArray<Sporsmal>,
        readonly parentKriterie: RSVisningskriterieType | null,
        readonly erHovedsporsmal: boolean,
        readonly tittel: string | undefined,
    ) {
        super()
    }
}

export interface Ettersend {
    type: 'nav' | 'arbeidsgiver'
    dato: Date
}

export class Kvittering {
    blobId: string
    belop: number // Beløp i heltall øre
    typeUtgift: keyof typeof UtgiftTyper
    opprettet?: string

    constructor(verdi: string) {
        const kvitt = JSON.parse(verdi)
        this.blobId = kvitt.blobId
        this.belop = kvitt.belop
        this.typeUtgift = kvitt.typeUtgift
        this.opprettet = kvitt.opprettet
    }
}

export enum UtgiftTyper {
    OFFENTLIG_TRANSPORT = 'Offentlig transport',
    TAXI = 'Taxi',
    PARKERING = 'Parkering',
    ANNET = 'Annet',
}

export function svarverdiToKvittering(kvittering: string): Kvittering {
    return new Kvittering(kvittering)
}
