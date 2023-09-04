import { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { Persona } from './personas/personas'
import { brukertestSoknad, brukertestSykmelding } from './personas/brukertest'
import { yrkesskadeV2Sporsmal } from './sporsmal/yrkesskade-v2'
import { yrkesskadeV1Sporsmal } from './sporsmal/yrkesskade-v1'

const yrkesskadeSoknadV1 = deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db1af')
const sporsmaleneV1: RSSporsmal[] = []
const splittStedV1 = 8
sporsmaleneV1.push(...yrkesskadeSoknadV1.sporsmal.slice(0, splittStedV1))
sporsmaleneV1.push(yrkesskadeV1Sporsmal)
sporsmaleneV1.push(...yrkesskadeSoknadV1.sporsmal.slice(splittStedV1))
yrkesskadeSoknadV1.sporsmal = sporsmaleneV1

export const yrkesskadePerson: Persona = {
    soknader: [yrkesskadeSoknadV1],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Yrkesskade v1',
}

const yrkesskadeSoknad = deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db133')
const sporsmalene: RSSporsmal[] = []
const splittSted = 8
sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(0, splittSted))
sporsmalene.push(yrkesskadeV2Sporsmal)
sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(splittSted))
yrkesskadeSoknad.sporsmal = sporsmalene

export const yrkesskadeV2Person: Persona = {
    soknader: [yrkesskadeSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Yrkesskade v2',
}
