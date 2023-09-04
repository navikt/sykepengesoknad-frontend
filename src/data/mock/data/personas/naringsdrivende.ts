import { naringsdrivendeSoknad } from '../soknad/naringsdrivende'
import { naringsdrivende100syk } from '../sykmeldinger'

import { Persona } from './personas'

export const selvstendigNaringsdrivende: Persona = {
    soknader: [naringsdrivendeSoknad],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende',
}
