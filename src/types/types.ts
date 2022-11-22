import { dayjsToDate } from '../utils/dato-utils'

import { TagTyper } from './enums'
import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon'
import { RSMerknad } from './rs-types/rs-merknad'
import { RSSoknad } from './rs-types/rs-soknad'
import { RSSoknadsperiode } from './rs-types/rs-soknadsperiode'
import { RSSoknadstatus } from './rs-types/rs-soknadstatus'
import { RSSoknadstype } from './rs-types/rs-soknadstype'
import { RSSporsmal } from './rs-types/rs-sporsmal'
import { RSSvarliste } from './rs-types/rs-svarliste'
import { RSSvartype } from './rs-types/rs-svartype'
import { RSVisningskriterieType } from './rs-types/rs-visningskriterie'

export interface TidsPeriode {
    fom: Date
    tom: Date
}

export interface Arbeidsgiver {
    navn: string
    orgnummer: string
}

export class Soknad {
    id: string
    sykmeldingId: string
    soknadstype: RSSoknadstype
    status: RSSoknadstatus
    arbeidssituasjon?: RSArbeidssituasjon
    fom?: Date
    tom?: Date
    avbruttDato?: Date
    opprettetDato: Date
    sendtTilNAVDato?: Date
    sendtTilArbeidsgiverDato?: Date
    arbeidsgiver?: Arbeidsgiver
    sporsmal: Sporsmal[]
    soknadPerioder: RSSoknadsperiode[]
    korrigerer?: string
    merknaderFraSykmelding?: RSMerknad[]

    constructor(soknad: RSSoknad) {
        this.id = soknad.id
        this.sykmeldingId = soknad.sykmeldingId!
        const type = soknad.soknadstype as keyof typeof RSSoknadstype
        this.soknadstype = RSSoknadstype[type]
        const stat = soknad.status as keyof typeof RSSoknadstatus
        this.status = RSSoknadstatus[stat]
        this.fom = dayjsToDate(soknad.fom!)!
        this.tom = dayjsToDate(soknad.tom!)!
        this.korrigerer = soknad.korrigerer || undefined
        this.avbruttDato = dayjsToDate(soknad.avbruttDato!)!
        this.opprettetDato = dayjsToDate(soknad.opprettetDato!)!
        this.sendtTilNAVDato = dayjsToDate(soknad.sendtTilNAVDato!)!
        this.sendtTilArbeidsgiverDato = dayjsToDate(soknad.sendtTilArbeidsgiverDato!)!
        if (soknad.arbeidsgiver) {
            this.arbeidsgiver = {
                navn: soknad.arbeidsgiver.navn,
                orgnummer: soknad.arbeidsgiver.orgnummer,
            }
        }
        this.arbeidssituasjon = soknad.arbeidssituasjon ? RSArbeidssituasjon[soknad.arbeidssituasjon] : undefined
        this.sporsmal = rsToSporsmal(soknad.sporsmal, undefined as any, true)
        this.soknadPerioder = soknad.soknadPerioder
        this.merknaderFraSykmelding = soknad.merknaderFraSykmelding
    }
}

export class Sporsmal {
    id: string
    tag: TagTyper
    tagIndex?: number
    sporsmalstekst: string
    undertekst: string | null
    svartype: RSSvartype
    min: string | null
    max: string | null
    pavirkerAndreSporsmal: boolean
    kriterieForVisningAvUndersporsmal: string
    svarliste: RSSvarliste
    undersporsmal: Sporsmal[]
    parentKriterie: RSVisningskriterieType | null
    erHovedsporsmal: boolean

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
        this.svarliste = {
            sporsmalId: spm.id,
            svar: spm.svar.map((svar) => {
                const hentVerdi = () => {
                    if (spm.svartype == RSSvartype.BELOP) {
                        return (Number(svar.verdi) / 100).toString()
                    }
                    return svar.verdi
                }
                return {
                    id: svar.id,
                    verdi: hentVerdi(),
                    avgittAv: svar.avgittAv,
                }
            }),
        }
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
    spms.forEach((rssp) => {
        const spm: Sporsmal = new Sporsmal(rssp, kriterie, erHovedsporsmal)
        sporsmals.push(spm)
    })

    if (
        sporsmals.length >= 2 &&
        sporsmals[sporsmals.length - 1].tag === TagTyper.VAER_KLAR_OVER_AT &&
        sporsmals[sporsmals.length - 2].tag === TagTyper.BEKREFT_OPPLYSNINGER
    ) {
        // Det finnes tilfeller opprettet i db før 15 Mai 2020 hvor disse er i "feil rekkefølge" Dette fikser sorteringa
        // Se også https://github.com/navikt/syfosoknad/commit/1983d32f3a7fb28bbf17126ea227d91589ad5f35
        const tmp = sporsmals[sporsmals.length - 1]
        sporsmals[sporsmals.length - 1] = sporsmals[sporsmals.length - 2]
        sporsmals[sporsmals.length - 2] = tmp
    }
    return sporsmals
}

export interface Brodsmule {
    sti: string
    tittel: string
    mobilTittel?: string
    erKlikkbar?: boolean
}

export interface IdParams {
    id: string
    stegId: string
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

export interface Personalia {
    personalia: {
        kontonr: string
    }
}
