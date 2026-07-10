import { format } from 'date-fns'

import { osloDate, tilLokalDatoFraDato, tilOsloDatoFraDato, toDate } from '../../../utils/dato-utils'

export const erSammeKalenderDag = (forsteDato: Date, andreDato: Date) => {
    const forsteOsloDato = tilOsloDatoFraDato(forsteDato)
    const andreOsloDato = tilOsloDatoFraDato(andreDato)
    return (
        forsteOsloDato.getFullYear() === andreOsloDato.getFullYear() &&
        forsteOsloDato.getMonth() === andreOsloDato.getMonth() &&
        forsteOsloDato.getDate() === andreOsloDato.getDate()
    )
}

type EndringIValgteDatoer = { type: 'ny'; dato: Date } | { type: 'avvalgt'; dato: Date } | { type: 'ingen' }

export function finnEndringIValgteDatoer(
    datoerFraKalender: Date[],
    tidligereValgteDatoer: Date[],
): EndringIValgteDatoer {
    const nyValgtDato = datoerFraKalender.find(
        (dato) => !tidligereValgteDatoer.some((tidligereDato) => erSammeKalenderDag(tidligereDato, dato)),
    )
    if (nyValgtDato) {
        return { type: 'ny', dato: nyValgtDato }
    }

    const avvalgtDato = tidligereValgteDatoer.find(
        (tidligereDato) => !datoerFraKalender.some((dato) => erSammeKalenderDag(tidligereDato, dato)),
    )
    if (avvalgtDato) {
        return { type: 'avvalgt', dato: avvalgtDato }
    }

    return { type: 'ingen' }
}

export function fjernKalenderDato(datoer: Date[], datoSomSkalFjernes: Date): Date[] {
    return datoer.filter((dato) => !erSammeKalenderDag(dato, datoSomSkalFjernes))
}

export function tilLokalKalenderDato(dato: Date | string): Date {
    const osloDato = typeof dato === 'string' ? toDate(dato) : tilOsloDatoFraDato(dato)
    return tilLokalDatoFraDato(osloDato)
}

export function tilLokalKalenderDatoOpt(dato?: Date | string | null): Date | undefined {
    return dato ? tilLokalKalenderDato(dato) : undefined
}

export function tilLokalKalenderDatoEllerStandard(dato: string | null | undefined, standardDato: string): Date {
    return tilLokalKalenderDato(dato ?? standardDato)
}

export function tilOsloKalenderDatoFraDato(dato: Date): Date {
    return osloDate(dato.getFullYear(), dato.getMonth() + 1, dato.getDate())
}

export function tilOsloKalenderDatoOpt(dato?: Date): Date | undefined {
    return dato ? tilOsloKalenderDatoFraDato(dato) : undefined
}

export function tilOsloKalenderDatoIsoStreng(dato: Date): string {
    return format(tilOsloKalenderDatoFraDato(dato), 'yyyy-MM-dd')
}
