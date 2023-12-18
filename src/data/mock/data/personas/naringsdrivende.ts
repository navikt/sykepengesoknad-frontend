import { naringsdrivendeSoknad } from '../soknad/naringsdrivende'
import { naringsdrivende100syk } from '../sykmeldinger'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { Persona } from './personas'

export const selvstendigNaringsdrivende: Persona = {
    soknader: [naringsdrivendeSoknad],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende',
}

const sendtSoknad = deepcopyMedNyId(naringsdrivendeSoknad, '3708c4de-d16c-4835-841b-a6716b688888')
sendtSoknad.status = 'SENDT'
// sendt nå
sendtSoknad.sendtTilNAVDato = new Date().toISOString()
sendtSoknad.sporsmal.forEach((sporsmal) => {
    sporsmal.svar = [{ verdi: 'NEI' }]
})
export const selvstendigNaringsdrivendeSendt: Persona = {
    soknader: [sendtSoknad],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende med sendt søknad',
}
