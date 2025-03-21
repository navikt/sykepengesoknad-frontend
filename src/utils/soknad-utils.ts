import { Soknad, Sporsmal } from '../types/types'

export const flattenSporsmal = (sporsmal: ReadonlyArray<Sporsmal>) => {
    let flatArr: Sporsmal[] = []
    for (let i = 0; i < sporsmal.length; i++) {
        flatArr.push(sporsmal[i])
        flatArr = flatArr.concat(flattenSporsmal(sporsmal[i].undersporsmal))
    }
    return flatArr
}

export const harSvart = (soknad: Soknad, tag: string, svar: string): boolean => {
    return flattenSporsmal(soknad.sporsmal).some(
        (spm) => spm.tag === tag && spm.svarliste.svar.some((s) => s.verdi === svar),
    )
}
export const hentSporsmal = (soknad: Soknad, tag: string): Sporsmal | undefined => {
    return flattenSporsmal(soknad.sporsmal).find((spm) => spm.tag === tag)
}
export const hentSvar = (soknad: Soknad, tag: string): string | undefined => {
    const spm = hentSporsmal(soknad, tag)
    return spm?.svarliste.svar.find((s) => s.verdi)?.verdi
}

export const hentUndersporsmal = (sporsmal: Sporsmal, tag: string): Sporsmal | undefined => {
    return flattenSporsmal(sporsmal.undersporsmal).find((spm) => spm.tag === tag)
}

export const finnHovedSporsmal = (soknad: Soknad, sporsmal: Sporsmal): Sporsmal | undefined => {
    if (sporsmal.erHovedsporsmal) {
        return sporsmal
    }
    return soknad.sporsmal.find((spm) =>
        flattenSporsmal(spm.undersporsmal)
            .map((underspm) => underspm.id)
            .includes(sporsmal.id),
    )
}
