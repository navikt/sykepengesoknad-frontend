import dayjs from 'dayjs'

import { Sporsmal } from '../../types/types'
import { fraBackendTilDate } from '../dato-utils'

const validerDato = (sporsmal: Sporsmal, values: Record<string, any>) => {

    const formDato = values[sporsmal.id]
    // Enkel null sjekk
    if (formDato === undefined || formDato === '') return 'Du må oppgi en gyldig dato'

    const valgtDato = fraBackendTilDate(formDato)
    // Formattering er riktig når dato er skrevet inn manuelt
    if (isNaN(valgtDato.getTime())) return 'Datoen følger ikke formatet dd.mm.åååå'
    // Grenseverdier
    if (sporsmal.min && valgtDato < fraBackendTilDate(sporsmal.min)) {
        return 'Datoen kan ikke være før ' + dayjs(sporsmal.min).format('DD.MM.YYYY')
    }
    if (sporsmal.max && valgtDato > fraBackendTilDate(sporsmal.max)) {
        return 'Datoen kan ikke være etter ' + dayjs(sporsmal.max).format('DD.MM.YYYY')
    }

    return true
}

export default validerDato
