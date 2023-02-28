import { RangeValidationT } from '@navikt/ds-react'
import dayjs from 'dayjs'

import { FormPeriode } from '../../components/sporsmal/typer/periode-komp'
import { Sporsmal } from '../../types/types'
import { fraBackendTilDate } from '../dato-utils'

interface Periode {
    fom: Date
    tom: Date
}

export const validerPeriode = (sporsmal: Sporsmal, id: string, values: Record<string, any>) => {
    const formPeriode = values[id] as FormPeriode

    const valgtPeriode = {
        fom: fraBackendTilDate(formPeriode.fom),
        tom: fraBackendTilDate(formPeriode.tom),
    } as Periode

    const andreBesvartePerioder = Object.entries(values)
        .filter(([key]) => key.startsWith(sporsmal.id) && key !== id)
        .filter(([key]) => values[key] !== undefined)

    if (andreBesvartePerioder.length === 0) {
        return true
    }

    const perioder = andreBesvartePerioder.map(([key]) => {
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

    return overlapper ? 'Du kan ikke legge inn perioder som overlapper med hverandre' : true
}

export const validerFom = (
    sporsmal: Sporsmal,
    id: string,
    values: Record<string, any>,
    rangeValidation: RangeValidationT | null,
) => {
    const formPeriode = values[id] as FormPeriode

    // Grenseverdier
    if (rangeValidation && rangeValidation.from.isBefore) {
        return 'Fra og med kan ikke være før ' + dayjs(sporsmal.min).format('DD.MM.YYYY')
    }
    if (rangeValidation && rangeValidation.from.isBefore) return 'Fra og med må være før til og med'

    if (!formPeriode?.fom) return 'Du må oppgi en fra og med dato i formatet dd.mm.åååå'

    const valgtPeriode = {
        fom: fraBackendTilDate(formPeriode.fom),
        tom: fraBackendTilDate(formPeriode.tom),
    } as Periode

    // skriv om til generelt gyldig
    if (!valgtPeriode.fom) return 'Du må oppgi en fra og med dato i formatet dd.mm.åååå' // 'Fra og med følger ikke formatet dd.mm.åååå'

    return true
}
export const validerTom = (
    sporsmal: Sporsmal,
    id: string,
    values: Record<string, any>,
    rangeValidation: RangeValidationT | null,
) => {
    const formPeriode = values[id] as FormPeriode

    // Grenseverdier
    if (rangeValidation && rangeValidation.to.isAfter) {
        return 'Til og med kan ikke være etter ' + dayjs(sporsmal.max).format('DD.MM.YYYY')
    }
    if (rangeValidation && rangeValidation?.to.isBeforeFrom) return 'Til og med må være etter fra og med'

    // Grenseverdier

    if (formPeriode?.tom === undefined || formPeriode?.tom === '')
        return 'Du må oppgi en til og med dato i formatet dd.mm.åååå'

    const valgtPeriode = {
        fom: fraBackendTilDate(formPeriode.fom),
        tom: fraBackendTilDate(formPeriode.tom),
    } as Periode
    // Formattering er riktig når dato er skrevet inn manuelt

    // skriv om til generelt gyldig
    if (!valgtPeriode.tom) return 'Du må oppgi en til og med dato i formatet dd.mm.åååå' // 'Til og med følger ikke formatet dd.mm.åååå'

    return true
}
