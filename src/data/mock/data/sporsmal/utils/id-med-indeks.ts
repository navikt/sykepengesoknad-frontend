import type { RSSporsmal } from '../../../../../types/rs-types/rs-sporsmal'

// Spørsmål som kan gjentas i samme søknad (tagg med _0, _1 osv.) må få unike id-er.
// Indeks 0 beholder den faste id-en. Tall-id-er får indeksen lagt til, siden de ofte ligger i sekvens.
// UUID-er får siste hex-siffer forskjøvet med indeksen, så de fortsatt ser ut som UUID-er fra backend.
export const idMedIndeks = (id: string, index: number): string => {
    if (index === 0) return id
    if (/^\d+$/.test(id)) return `${id}${index}`
    const sisteSiffer = (parseInt(id.slice(-1), 16) + index) % 16
    return `${id.slice(0, -1)}${sisteSiffer.toString(16)}`
}

// For søknader som bevisst viser samme spørsmål flere ganger: like id-er får løpenummer
export const medUnikeIder = (sporsmal: RSSporsmal[]): RSSporsmal[] => {
    const antallSett = new Map<string, number>()
    const unik = (spm: RSSporsmal): RSSporsmal => {
        const antall = antallSett.get(spm.id) ?? 0
        antallSett.set(spm.id, antall + 1)
        return { ...spm, id: idMedIndeks(spm.id, antall), undersporsmal: spm.undersporsmal.map(unik) }
    }
    return sporsmal.map(unik)
}
