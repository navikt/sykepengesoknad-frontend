import { dayjsToDate } from '../utils/dato-utils'

import { RSSporsmal } from './rs-types/rs-sporsmal'
import { RSVisningskriterieType } from './rs-types/rs-visningskriterie'
import { RSSvartype } from './rs-types/rs-svartype'
import { TagTyper } from './enums'
import { Soknad, Sporsmal } from './types'
import { RSSoknad } from './rs-types/rs-soknad'
import { RSSoknadstype } from './rs-types/rs-soknadstype'
import { RSSoknadstatus } from './rs-types/rs-soknadstatus'
import { RSArbeidssituasjon } from './rs-types/rs-arbeidssituasjon'

export function skapSporsmal(spm: RSSporsmal, kriterie: RSVisningskriterieType | null, erHovedsporsmal: boolean) {
    const orgarr: string[] = spm.tag.split('_')
    const numtag: number = parseInt(orgarr.pop() as any)
    let tag = spm.tag
    let tagIndex: number | undefined = undefined
    if (!isNaN(numtag)) {
        tagIndex = numtag
        tag = orgarr.join('_')
    }
    const svarliste = {
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
    const undersporsmal = rsToSporsmal(spm.undersporsmal, spm.kriterieForVisningAvUndersporsmal, false)

    const idtag = tag as keyof typeof TagTyper

    return new Sporsmal(
        spm.id,
        TagTyper[idtag],
        tagIndex,
        spm.sporsmalstekst === null ? '' : spm.sporsmalstekst,
        spm.undertekst,
        spm.svartype as any as RSSvartype,
        spm.min,
        spm.max,
        spm.pavirkerAndreSporsmal,
        spm.kriterieForVisningAvUndersporsmal as any,
        svarliste,
        undersporsmal,
        kriterie,
        erHovedsporsmal,
    )
}

export function rsToSporsmal(
    spms: RSSporsmal[],
    kriterie: RSVisningskriterieType | null,
    erHovedsporsmal: boolean,
): ReadonlyArray<Sporsmal> {
    const sporsmals: Sporsmal[] = []
    if (spms === undefined) {
        return sporsmals
    }
    spms.forEach((rssp) => {
        const spm: Sporsmal = skapSporsmal(rssp, kriterie, erHovedsporsmal)
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

export function rsToSoknad(soknad: RSSoknad): Soknad {
    const stat = soknad.status as keyof typeof RSSoknadstatus
    const type = soknad.soknadstype as keyof typeof RSSoknadstype
    let arbeidsgiver = undefined
    if (soknad.arbeidsgiver) {
        arbeidsgiver = {
            navn: soknad.arbeidsgiver.navn,
            orgnummer: soknad.arbeidsgiver.orgnummer,
        }
    }
    return new Soknad(
        soknad.id,
        soknad.sykmeldingId || undefined,
        RSSoknadstype[type],
        RSSoknadstatus[stat],
        soknad.arbeidssituasjon ? RSArbeidssituasjon[soknad.arbeidssituasjon] : undefined,
        dayjsToDate(soknad.fom!)!,
        dayjsToDate(soknad.tom!)!,
        dayjsToDate(soknad.avbruttDato!)!,
        dayjsToDate(soknad.opprettetDato!)!,
        dayjsToDate(soknad.sendtTilNAVDato!)!,
        dayjsToDate(soknad.sendtTilArbeidsgiverDato!)!,
        soknad.utenlandskSykmelding,
        arbeidsgiver,
        rsToSporsmal(soknad.sporsmal, undefined as any, true),
        soknad.soknadPerioder,
        soknad.korrigerer || undefined,
        soknad.merknaderFraSykmelding,
        soknad.opprettetAvInntektsmelding,
        soknad.klippet,
        soknad.inntektskilderDataFraInntektskomponenten,
        soknad.korrigeringsfristUtlopt,
    )
}