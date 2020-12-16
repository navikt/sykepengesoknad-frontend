import { Sporsmal } from '../../types/types'
import { FormPeriode } from '../../components/sporsmal/typer/periode-komp'
import { fraBackendTilDate } from '../dato-utils'

interface Periode {
    fom: Date;
    tom: Date;
}

const validerPeriode = ( sporsmal: Sporsmal, id: string, values: Record<string, any>) => {
    const formPeriode = values[id] as FormPeriode
    // Enkel null sjekk
    if (formPeriode.fom === undefined || formPeriode.fom === '') return 'Du må oppi en fra og med dato'
    if (formPeriode.tom === undefined || formPeriode.tom === '') return 'Du må oppi en til og med dato'

    const valgtPeriode = { fom: fraBackendTilDate(formPeriode.fom), tom: fraBackendTilDate(formPeriode.tom) } as Periode
    // Formattering er riktig når dato er skrevet inn manuelt
    if (isNaN(valgtPeriode.fom.getTime())) return 'Fra og med følger ikke formatet dd.mm.åååå'
    if (isNaN(valgtPeriode.tom.getTime())) return 'Til og med følger ikke formatet dd.mm.åååå'
    // Grenseverdier
    if (valgtPeriode.fom < fraBackendTilDate(sporsmal.min!)) return 'Fra og med kan ikke være før ' + sporsmal.min
    if (valgtPeriode.tom > fraBackendTilDate(sporsmal.max!)) return 'Til og med kan ikke være etter ' + sporsmal.max
    if (valgtPeriode.fom > valgtPeriode.tom) return 'Fra og med må være før til og med'
    if (valgtPeriode.fom > valgtPeriode.tom) return 'Fra og med må være før til og med'

    const perioder = Object.entries(values)
        .filter(([ key ]) => key.startsWith(sporsmal.id) && key !== id)
        .map(([ key ]) => {
            return {
                fom: fraBackendTilDate(values[key].fom),
                tom: fraBackendTilDate(values[key].tom)
            } as Periode
        })
    // Overlapper
    let overlapper = false
    perioder.forEach((p: Periode) => {
        if ((valgtPeriode.fom >= p.fom && valgtPeriode.fom <= p.tom)) {
            overlapper = true
        }
    })

    return overlapper ? 'Du kan ikke legge inn perioder som overlapper med hverandre' : true
}

export default validerPeriode
