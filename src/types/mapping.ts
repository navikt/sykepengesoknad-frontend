import { dayjsToDate, parseDate } from '../utils/dato-utils'

import { RSSporsmal } from './rs-types/rs-sporsmal'
import { RSVisningskriterieType } from './rs-types/rs-visningskriterie'
import { RSSvartype } from './rs-types/rs-svartype'
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
            }
        }),
    }
    const undersporsmal = rsToSporsmal(spm.undersporsmal, spm.kriterieForVisningAvUndersporsmal, false)

    return new Sporsmal(
        spm.id,
        tag,
        tagIndex,
        spm.sporsmalstekst === null ? '' : spm.sporsmalstekst,
        spm.undertekst,
        spm.svartype as any as RSSvartype,
        spm.min,
        spm.max,
        spm.kriterieForVisningAvUndersporsmal as any,
        svarliste,
        undersporsmal,
        kriterie,
        erHovedsporsmal,
        spm.metadata,
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
        sporsmals[sporsmals.length - 1].tag === 'VAER_KLAR_OVER_AT' &&
        sporsmals[sporsmals.length - 2].tag === 'BEKREFT_OPPLYSNINGER'
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

    let kjentOppholdstillatelse = undefined
    if (soknad.kjentOppholdstillatelse) {
        kjentOppholdstillatelse = {
            fom: parseDate(soknad.kjentOppholdstillatelse.fom),
            tom: soknad.kjentOppholdstillatelse.tom ? dayjsToDate(soknad.kjentOppholdstillatelse.tom) : undefined,
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
        soknad.forstegangssoknad,
        soknad.inntektsopplysningerNyKvittering,
        soknad.inntektsopplysningerInnsendingId,
        soknad.inntektsopplysningerInnsendingDokumenter,
        kjentOppholdstillatelse,
        soknad.julesoknad,
    )
}
