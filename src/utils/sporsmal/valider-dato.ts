import dayjs from 'dayjs'
import { DateValidationT, MonthValidationT } from '@navikt/ds-react'

import { Sporsmal } from '../../types/types'

const validerDato = (sporsmal: Sporsmal, value?: Date, dateValidation?: DateValidationT) => {
    if (!dateValidation && value) {
        // Vi må bruke dateValidation fordi Datepicker ikke returnerer noe verdi når de er utenfor min/max
        // Men Datepicker validering skjer ikke når vi laster inn et tidligere svar
        return true
    }
    if (!dateValidation || dateValidation.isEmpty || dateValidation.isInvalid) {
        return 'Datoen følger ikke formatet dd.mm.åååå'
    }
    if (sporsmal.min && dateValidation.isBefore) {
        return 'Datoen kan ikke være før ' + dayjs(sporsmal.min).format('DD.MM.YYYY')
    }
    if (sporsmal.max && dateValidation.isAfter) {
        return 'Datoen kan ikke være etter ' + dayjs(sporsmal.max).format('DD.MM.YYYY')
    }
    if (!dateValidation.isValidDate) {
        return 'Datoen følger ikke formatet dd.mm.åååå'
    }

    return true
}

export default validerDato

export const validerMaaned = (sporsmal: Sporsmal, value?: Date, monthValidation?: MonthValidationT) => {
    if (!monthValidation && value) {
        // Vi må bruke monthValidation fordi Monthpicker ikke returnerer noe verdi når de er utenfor min/max
        // Men Datepicker validering skjer ikke når vi laster inn et tidligere svar
        return true
    }
    if (!monthValidation || monthValidation.isEmpty || monthValidation.isInvalid) {
        return 'Datoen følger ikke formatet dd.mm.åååå'
    }
    if (!monthValidation.isValidMonth) {
        return 'Datoen følger ikke formatet maaned'
    }
    return true
}
