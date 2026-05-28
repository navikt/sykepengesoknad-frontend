import { format } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import { DateValidationT, MonthValidationT } from '@navikt/ds-react'

import { Sporsmal } from '../../types/types'
import { toDate } from '../dato-utils'

const validerDato = (sporsmal: Sporsmal, value?: Date, dateValidation?: DateValidationT) => {
    if (!dateValidation && value) {
        // Vi må bruke dateValidation fordi Datepicker ikke returnerer noe verdi når de er utenfor min/max,
        // men Datepicker validering skjer ikke når vi laster inn et tidligere svar
        return true
    }
    if (!dateValidation || dateValidation.isEmpty || dateValidation.isInvalid) {
        return 'Datoen følger ikke formatet dd.mm.åååå'
    }
    if (sporsmal.min && dateValidation.isBefore) {
        return 'Datoen kan ikke være før ' + format(toDate(sporsmal.min), 'dd.MM.yyyy')
    }
    if (sporsmal.max && dateValidation.isAfter) {
        return 'Datoen kan ikke være etter ' + format(toDate(sporsmal.max), 'dd.MM.yyyy')
    }
    if (!dateValidation.isValidDate) {
        return 'Datoen følger ikke formatet dd.mm.åååå'
    }

    return true
}

export default validerDato

export const validerMaaned = (sporsmal: Sporsmal, value?: Date, monthValidation?: MonthValidationT) => {
    if (!monthValidation && value) {
        // Vi må bruke monthValidation fordi Monthpicker ikke returnerer noe verdi når de er utenfor min/max,
        // men Datepicker validering skjer ikke når vi laster inn et tidligere svar
        return true
    }
    if (!monthValidation || monthValidation.isEmpty || monthValidation.isInvalid) {
        return 'Datoen følger ikke formatet dd.mm.åååå eller måned åååå'
    }
    if (sporsmal.min && monthValidation.isBefore) {
        return 'Datoen kan ikke være før ' + format(toDate(sporsmal.min), 'MMMM yyyy', { locale: nb })
    }
    if (sporsmal.max && monthValidation.isAfter) {
        return 'Datoen kan ikke være etter ' + format(toDate(sporsmal.max), 'MMMM yyyy', { locale: nb })
    }
    if (!monthValidation.isValidMonth) {
        return 'Datoen følger ikke formatet dd.mm.åååå eller måned åååå'
    }
    return true
}
