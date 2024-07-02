import dayjs from 'dayjs'

import { Sporsmal } from '../types/types'

export const fraInputdatoTilJSDato = (inputDato: any) => {
    const datoSplit = inputDato.split('.')
    let ar = datoSplit[2]
    if (ar.length === 2) {
        ar = `20${ar}`
    }
    const s = `${ar}-${datoSplit[1]}-${datoSplit[0]}`
    return new Date(s)
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
    return dayjs(datoArg).format('YYYY-MM-DD')
}

export const fraBackendTilDate = (datoArg: string) => {
    if (datoArg && datoArg.match(RegExp('\\d{4}-\\d{2}-\\d{2}'))) return dayjs(datoArg).toDate()
}

export const tilLesbarDatoUtenAarstall = (datoArg: any): string => {
    if (datoArg) {
        const dato = dayjsToDate(datoArg)!
        const dag = dato.getDate()
        const manedIndex = dato.getMonth()
        const maned = maaneder[manedIndex]
        return `${dag}. ${maned}`
    }
    return ''
}

export const tilLesbarDatoMedArstall = (datoArg: any) => {
    return datoArg ? `${tilLesbarDatoUtenAarstall(dayjsToDate(datoArg))} ${dayjsToDate(datoArg)!.getFullYear()}` : null
}

export const tilLesbarPeriodeMedArstall = (fomArg: any, tomArg: any) => {
    const fom = dayjsToDate(fomArg)
    const tom = dayjsToDate(tomArg)
    const erSammeAar = fom?.getFullYear() === tom?.getFullYear()
    const erSammeMaaned = fom?.getMonth() === tom?.getMonth()
    return erSammeAar && erSammeMaaned
        ? `${fom?.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
          ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
          : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
}

export const tilLesbarPeriodeUtenArstall = (fomArg: any, tomArg: any) => {
    const fom = dayjsToDate(fomArg)!
    const tom = dayjsToDate(tomArg)!
    const erSammeMaaned = fom.getMonth() === tom.getMonth()
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
}

export const getDuration = (from: any, to: any) => {
    return dayjs(to).diff(from, 'days') + 1
}

export const ukeDatoListe = (min: string, max: string) => {
    const ukeListe = []
    let dato = dayjs(min)
    while (dato.toDate() <= dayjs(max).toDate()) {
        ukeListe.push(dato)
        dato = dato.add(1, 'day')
    }
    return ukeListe
}

export const dayjsToDate = (dato: string) => {
    return dato !== null ? dayjs(dato).toDate() : undefined
}

export const parseDate = (dato: string) => {
    return dayjs(dato).toDate()
}

export const sendtForMerEnn30DagerSiden = (sendtTilArbeidsgiverDato?: Date, sendtTilNAVDato?: Date) => {
    let dagerSidenArb = true
    let dagerSidenNav = true
    if (sendtTilArbeidsgiverDato) {
        dagerSidenArb = dayjs(new Date()).diff(dayjs(sendtTilArbeidsgiverDato), 'day') > 30
    }
    if (sendtTilNAVDato) {
        dagerSidenNav = dayjs(new Date()).diff(dayjs(sendtTilNAVDato), 'day') > 30
    }
    return dagerSidenArb && dagerSidenNav
}

export const sammeMnd = (sporsmal: Sporsmal): boolean => {
    const firstMonth = dayjs(sporsmal.min!).month()
    const lastMonth = dayjs(sporsmal.max!).month()
    return firstMonth === lastMonth
}

export const sammeAar = (sporsmal: Sporsmal): boolean => {
    const firstYear = dayjs(sporsmal.min!).year().toString()
    const lastYear = dayjs(sporsmal.max!).year().toString()
    return firstYear === lastYear
}

export function kalkulerStartsmaneden(sporsmal: Sporsmal) {
    const idag = dayjs()
    if (idag.isAfter(sporsmal.max) || idag.isBefore(sporsmal.min)) {
        return fraBackendTilDate(sporsmal.max!)
    }
    return fraBackendTilDate(idag.toString())
}
