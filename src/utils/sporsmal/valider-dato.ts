import dayjs from 'dayjs'

import { Sporsmal } from '../../types/types'
import { fraBackendTilDate } from '../dato-utils'

const validerDato = (sporsmal: Sporsmal, valgtDato?: Date) => {
    // Enkel null sjekk
    if (!valgtDato) return 'Datoen følger ikke formatet dd.mm.åååå'

    // Grenseverdier
    if (sporsmal.min && valgtDato < fraBackendTilDate(sporsmal.min)!) {
        return 'Datoen kan ikke være før ' + dayjs(sporsmal.min).format('DD.MM.YYYY')
    }
    if (sporsmal.max && valgtDato > fraBackendTilDate(sporsmal.max)!) {
        return 'Datoen kan ikke være etter ' + dayjs(sporsmal.max).format('DD.MM.YYYY')
    }

    return true
}

export default validerDato
