import dayjs from 'dayjs'
import { RangeValidationT } from '@navikt/ds-react'

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

export const validerFom = (sporsmal: Sporsmal, value?: FormPeriode, rangeValidation?: RangeValidationT) => {
    if (!rangeValidation && value) {
        // Vi må bruke rangeValidation fordi Datepicker ikke returnerer noe verdi når de er utenfor min/max,
        // men Datepicker validering skjer ikke når vi laster inn et tidligere svar
        return true
    }
    if (rangeValidation?.from === undefined || rangeValidation.from.isEmpty || rangeValidation.from.isInvalid) {
        return 'Du må oppgi en fra og med dato i formatet dd.mm.åååå'
    }
    if (sporsmal.min && rangeValidation.from.isBefore) {
        return 'Fra og med kan ikke være før ' + dayjs(sporsmal.min).format('DD.MM.YYYY')
    }
    if (!rangeValidation.from.isValidDate) {
        return 'Du må oppgi en fra og med dato i formatet dd.mm.åååå'
    }

    return true
}
export const validerTom = (sporsmal: Sporsmal, value?: FormPeriode, rangeValidation?: RangeValidationT) => {
    if (!rangeValidation && value) {
        // Vi må bruke rangeValidation fordi Datepicker ikke returnerer noe verdi når de er utenfor min/max,
        // men Datepicker validering skjer ikke når vi laster inn et tidligere svar
        return true
    }
    if (rangeValidation?.to === undefined || rangeValidation.to.isEmpty || rangeValidation.to.isInvalid) {
        return 'Du må oppgi en til og med dato i formatet dd.mm.åååå'
    }
    if (sporsmal.max && rangeValidation.to.isAfter) {
        return 'Til og med kan ikke være etter ' + dayjs(sporsmal.max).format('DD.MM.YYYY')
    }
    if (rangeValidation.to.isBeforeFrom) {
        return 'Til og med må være etter fra og med'
    }
    if (!rangeValidation.to.isValidDate) {
        return 'Du må oppgi en til og med dato i formatet dd.mm.åååå'
    }

    return true
}
