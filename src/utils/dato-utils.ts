import { differenceInDays, format, isSameMonth, isSameYear, isAfter, isBefore, addDays, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import { TZDate } from '@date-fns/tz'

import { Sporsmal } from '../types/types'

const OSLO = 'Europe/Oslo'

// Parser dato-streng til Date med riktig tidssone.
// Strenger med tz-info (Z eller ±HH:MM) parses korrekt med parseISO.
// Strenger uten tz-info (dato og datetime) tolkes som Europe/Oslo for å unngå
// at UTC-midnatt forskyver datoen for brukere vest for UTC.
export function toDate(date: string, defaultTimezone = OSLO): Date {
    if (isoTimestampHarTidssone(date)) {
        return parseISO(date)
    }
    return new TZDate(date, defaultTimezone)
}

function isoTimestampHarTidssone(iso: string): boolean {
    return /([Zz]|[+-]\d{2}:\d{2})$/.test(iso)
}

/** Nåtidspunkt i Oslo-tidssone. */
export function now(): Date {
    return new TZDate(new Date(), OSLO)
}

/** Bygger en dato fra år, måned og dag i Oslo-tidssone. */
export function osloDate(year: number, month: number, day: number): Date {
    const m = String(month).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return new TZDate(`${year}-${m}-${d}`, OSLO)
}

export function tilOsloDatoFraDato(dato: Date): Date {
    const osloView = new TZDate(dato, OSLO)
    return osloDate(osloView.getFullYear(), osloView.getMonth() + 1, osloView.getDate())
}

export function tilLokalDatoFraDato(dato: Date): Date {
    return new Date(dato.getFullYear(), dato.getMonth(), dato.getDate())
}

/**
 * Formaterer en dato til lesbar dato og klokkeslett i Oslo-tidssone,
 * f.eks. «Torsdag 23. april, kl 11:56». Brukes på kvitteringssiden.
 */
export function tilLesbarDatoOgTid(dato: Date | string): string {
    // TZDate har ikke overload for Date | string — bruk instanceof for å hjelpe TypeScript
    const tzDato = dato instanceof Date ? new TZDate(dato, OSLO) : new TZDate(dato, OSLO)
    const formatert = format(tzDato, "EEEE d. MMMM, 'kl' HH:mm", { locale: nb })
    return formatert.charAt(0).toUpperCase() + formatert.slice(1)
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

export const tilBackendDatoFraDatoobjekt = (dato: Date) => {
    return format(tilOsloDatoFraDato(dato), 'yyyy-MM-dd')
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
    if (val instanceof Date) return tilOsloDatoFraDato(val)
    if (typeof val === 'string') return toDate(val)
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

export const parseDate = (dato: string) => {
    return toDate(dato)
}

export function toDateEllerUndefined(dato: string | null | undefined): Date | undefined {
    return dato ? toDate(dato) : undefined
}

export const sendtForMerEnn30DagerSiden = (sendtTilArbeidsgiverDato?: Date, sendtTilNAVDato?: Date) => {
    const iDag = now()
    let dagerSidenArb = true
    let dagerSidenNav = true
    if (sendtTilArbeidsgiverDato) {
        dagerSidenArb = differenceInDays(iDag, sendtTilArbeidsgiverDato) > 30
    }
    if (sendtTilNAVDato) {
        dagerSidenNav = differenceInDays(iDag, sendtTilNAVDato) > 30
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
    const idag = now()
    if (isAfter(idag, toDate(sporsmal.max!)) || isBefore(idag, toDate(sporsmal.min!))) {
        return fraBackendTilDate(sporsmal.max!)
    }
    return idag
}
