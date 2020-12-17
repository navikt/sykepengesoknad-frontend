import { Sporsmal } from '../../types/types'
import { fraBackendTilDate } from '../dato-utils'

const validerDato = (sporsmal: Sporsmal, values: Record<string, any>) => {

    const formDato = values[sporsmal.id]
    // Enkel null sjekk
    if (formDato === undefined || formDato === '') return 'Du må oppi en gyldig dato'

    const valgtDato = fraBackendTilDate(formDato)
    // Formattering er riktig når dato er skrevet inn manuelt
    if (isNaN(valgtDato.getTime())) return 'Datoen følger ikke formatet dd.mm.åååå'
    // Grenseverdier
    if (sporsmal.min && valgtDato < fraBackendTilDate(sporsmal.min)) return 'Datoen kan ikke være før ' + sporsmal.min
    if (sporsmal.max && valgtDato > fraBackendTilDate(sporsmal.max)) return 'Datoen kan ikke være etter ' + sporsmal.max

    return true
}

export default validerDato
