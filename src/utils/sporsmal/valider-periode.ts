import { Sporsmal } from '../../types/types'

interface Periode {
    fom: Date;
    tom: Date;
}

const validerPeriode = ( sporsmal: Sporsmal, id: string, values: Record<string, any>, ferdigValgt: boolean ) => {
    if (ferdigValgt && values[id].length !== 2) return 'Du må oppi en gyldig periode'

    const valgtPeriode = { fom: values[id][0], tom: values[id][1] } as Periode
    const perioder = Object.entries(values)
        .filter(([ key ]) => key.startsWith(sporsmal.id) && key !== id)
        .map(([ key ]) => {
            return {
                fom: values[key][0],
                tom: values[key][1]
            } as Periode
        })

    let overlapper = false
    perioder.forEach((p: Periode) => {
        if ((valgtPeriode.fom >= p.fom && valgtPeriode.fom <= p.tom)) {
            overlapper = true
        }
    })

    return overlapper ? 'Du kan ikke legge inn perioder som overlapper med hverandre' : true
}

export default validerPeriode
