import { Soknad, Sporsmal } from '../types/types'


export const getSendtTilSuffix = (soknad: Soknad): string => {
    if (soknad.sendtTilArbeidsgiverDato && soknad.sendtTilNAVDato) {
        return '.til-arbeidsgiver-og-nav'
    }
    if (soknad.sendtTilArbeidsgiverDato) {
        return '.til-arbeidsgiver'
    }
    if (soknad.sendtTilNAVDato) {
        return '.til-nav'
    }
    return ''
}

export const getRiktigDato = (soknad: Soknad): Date | string => {
    if (soknad.sendtTilArbeidsgiverDato && soknad.sendtTilNAVDato) {
        return soknad.sendtTilNAVDato
    }
    if (soknad.sendtTilArbeidsgiverDato) {
        return soknad.sendtTilArbeidsgiverDato
    }
    if (soknad.sendtTilNAVDato) {
        return soknad.sendtTilNAVDato
    }
    return ''
}

export const flattenSporsmal = (sporsmal: Sporsmal[]) => {
    let flatArr: Sporsmal[] = []
    for (let i = 0; i < sporsmal.length; i++) {
        flatArr.push(sporsmal[i])
        flatArr = flatArr.concat(flattenSporsmal(sporsmal[i].undersporsmal))
    }
    return flatArr
}

export const hentSporsmal = (soknad: Soknad, tag: string): Sporsmal | undefined => {
    return flattenSporsmal(soknad.sporsmal).find(spm => spm.tag === tag)
}

export const hentUndersporsmal = (sporsmal: Sporsmal, tag: string): Sporsmal | undefined => {
    return flattenSporsmal(sporsmal.undersporsmal).find(spm => spm.tag === tag)
}

export const finnHovedSporsmal = ( soknad: Soknad, sporsmal: Sporsmal ): Sporsmal | undefined => {
    if (sporsmal.erHovedsporsmal) {
        return sporsmal
    }
    return soknad.sporsmal.find(spm =>
        flattenSporsmal(spm.undersporsmal).map(underspm => underspm.id).includes(sporsmal.id))
}
