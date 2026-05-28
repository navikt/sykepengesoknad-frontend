import { differenceInDays, format, isSameMonth, isSameYear, isAfter, isBefore, addDays } from 'date-fns'
import { TZDate } from '@date-fns/tz'

import { Sporsmal } from '../types/types'

const OSLO = 'Europe/Oslo'

/**
 * Parser en ISO-datostreng til en Date i Oslo-tidssone.
 * Unngår problemet med new Date('2020-01-01') som gir UTC midnight
 * og dermed feil dato i tidssoner vest for UTC.
 */
export function toDate(date: string): Date {
    return new TZDate(date, OSLO)
}

export const fraInputdatoTilJSDato = (inputDato: any) => {
    const datoSplit = inputDato.split('.')
    let ar = datoSplit[2]
    if (ar.length === 2) {
        ar = `20${ar}`
    }
    const s = `${ar}-${datoSplit[1]}-${datoSplit[0]}`
    return toDate(s)
}

export const maaneder = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
]
const SKILLETEGN_PERIODE = '–'

export const tilBackendDato = (datoArg: string) => {
    return format(toDate(datoArg), 'yyyy-MM-dd')
}

export const fraBackendTilDate = (datoArg: string) => {
    if (datoArg && datoArg.match(RegExp('\\d{4}-\\d{2}-\\d{2}'))) return toDate(datoArg)
}

export const tilLesbarDatoUtenAarstall = (datoArg: any): string => {
    if (datoArg) {
        const dato = ensureDate(datoArg)
        if (!dato) return ''
        const dag = dato.getDate()
        const manedIndex = dato.getMonth()
        const maned = maaneder[manedIndex]
        return `${dag}. ${maned}`
    }
    return ''
}

function ensureDate(val: any): Date | undefined {
    if (!val) return undefined
    if (val instanceof Date) return val
    if (typeof val === 'string') return toDate(val)
    // Handle dayjs-like objects from mock data
    if (typeof val === 'object' && typeof val.toDate === 'function') return val.toDate()
    return undefined
}

export const tilLesbarDatoMedArstall = (datoArg: any) => {
    if (!datoArg) return null
    const dato = ensureDate(datoArg)
    if (!dato) return null
    return `${tilLesbarDatoUtenAarstall(dato)} ${dato.getFullYear()}`
}

export const tilLesbarPeriodeMedArstall = (fomArg: any, tomArg: any) => {
    const fom = ensureDate(fomArg)
    const tom = ensureDate(tomArg)
    const erSammeAar = fom?.getFullYear() === tom?.getFullYear()
    const erSammeMaaned = fom?.getMonth() === tom?.getMonth()
    return erSammeAar && erSammeMaaned
        ? `${fom?.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
          ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
          : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
}

export const tilLesbarPeriodeUtenArstall = (fomArg: any, tomArg: any) => {
    const fom = ensureDate(fomArg)!
    const tom = ensureDate(tomArg)!
    const erSammeMaaned = fom.getMonth() === tom.getMonth()
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
}

export const getDuration = (from: any, to: any) => {
    const fromDate = typeof from === 'string' ? toDate(from) : from
    const toDateVal = typeof to === 'string' ? toDate(to) : to
    return differenceInDays(toDateVal, fromDate) + 1
}

export const ukeDatoListe = (min: string, max: string) => {
    const ukeListe: Date[] = []
    let dato = toDate(min)
    const maxDate = toDate(max)
    while (dato <= maxDate) {
        ukeListe.push(dato)
        dato = addDays(dato, 1)
    }
    return ukeListe
}

export const dayjsToDate = (dato: string) => {
    return dato !== null ? toDate(dato) : undefined
}

export const parseDate = (dato: string) => {
    return toDate(dato)
}

export const sendtForMerEnn30DagerSiden = (sendtTilArbeidsgiverDato?: Date, sendtTilNAVDato?: Date) => {
    const now = new TZDate(new Date(), OSLO)
    let dagerSidenArb = true
    let dagerSidenNav = true
    if (sendtTilArbeidsgiverDato) {
        dagerSidenArb = differenceInDays(now, sendtTilArbeidsgiverDato) > 30
    }
    if (sendtTilNAVDato) {
        dagerSidenNav = differenceInDays(now, sendtTilNAVDato) > 30
    }
    return dagerSidenArb && dagerSidenNav
}

export const sammeMnd = (sporsmal: Sporsmal): boolean => {
    return isSameMonth(toDate(sporsmal.min!), toDate(sporsmal.max!))
}

export const sammeAar = (sporsmal: Sporsmal): boolean => {
    return isSameYear(toDate(sporsmal.min!), toDate(sporsmal.max!))
}

export function kalkulerStartsmaneden(sporsmal: Sporsmal) {
    const idag = new TZDate(new Date(), OSLO)
    if (isAfter(idag, toDate(sporsmal.max!)) || isBefore(idag, toDate(sporsmal.min!))) {
        return fraBackendTilDate(sporsmal.max!)
    }
    return idag
}
