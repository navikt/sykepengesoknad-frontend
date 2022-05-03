import dayjs from 'dayjs'

import { FormPeriode } from '../../components/sporsmal/typer/periode-komp'
import { Sporsmal } from '../../types/types'
import { fraBackendTilDate } from '../dato-utils'

interface Periode {
    fom: Date
    tom: Date
}

export const validerPeriode = (
    sporsmal: Sporsmal,
    id: string,
    values: Record<string, any>
) => {
    const formPeriode = values[id] as FormPeriode

    const valgtPeriode = {
        fom: fraBackendTilDate(formPeriode.fom),
        tom: fraBackendTilDate(formPeriode.tom),
    } as Periode

    const perioder = Object.entries(values)
        .filter(([key]) => key.startsWith(sporsmal.id) && key !== id)
        .map(([key]) => {
            return {
                fom: fraBackendTilDate(values[key].fom),
                tom: fraBackendTilDate(values[key].tom),
            } as Periode
        })
    // Overlapper
    let overlapper = false
    perioder.forEach((p: Periode) => {
        if (valgtPeriode.fom >= p.fom && valgtPeriode.fom <= p.tom) {
            overlapper = true
        }
    })

    return overlapper
        ? 'Du kan ikke legge inn perioder som overlapper med hverandre'
        : true
}

export const validerFom = (
    sporsmal: Sporsmal,
    id: string,
    values: Record<string, any>
) => {
    const formPeriode = values[id] as FormPeriode
    // Enkel null sjekk
    if (formPeriode?.fom === undefined || formPeriode?.fom === '')
        return 'Du må oppgi en fra og med dato'

    const valgtPeriode = {
        fom: fraBackendTilDate(formPeriode.fom),
        tom: fraBackendTilDate(formPeriode.tom),
    } as Periode
    // Formattering er riktig når dato er skrevet inn manuelt
    if (!valgtPeriode.fom) return 'Fra og med følger ikke formatet dd.mm.åååå'
    // Grenseverdier
    if (sporsmal.min && valgtPeriode.fom < fraBackendTilDate(sporsmal.min)!) {
        return (
            'Fra og med kan ikke være før ' +
            dayjs(sporsmal.min).format('DD.MM.YYYY')
        )
    }
    if (valgtPeriode.fom > valgtPeriode.tom)
        return 'Fra og med må være før til og med'

    return true
}

export const validerTom = (
    sporsmal: Sporsmal,
    id: string,
    values: Record<string, any>
) => {
    const formPeriode = values[id] as FormPeriode
    // Enkel null sjekk
    if (formPeriode?.tom === undefined || formPeriode?.tom === '')
        return 'Du må oppgi en til og med dato'

    const valgtPeriode = {
        fom: fraBackendTilDate(formPeriode.fom),
        tom: fraBackendTilDate(formPeriode.tom),
    } as Periode
    // Formattering er riktig når dato er skrevet inn manuelt
    if (!valgtPeriode.tom) return 'Til og med følger ikke formatet dd.mm.åååå'
    // Grenseverdier
    if (sporsmal.max && valgtPeriode.tom > fraBackendTilDate(sporsmal.max)!) {
        return (
            'Til og med kan ikke være etter ' +
            dayjs(sporsmal.max).format('DD.MM.YYYY')
        )
    }
    if (valgtPeriode.fom > valgtPeriode.tom)
        return 'Til og med må være etter fra og med'

    return true
}
