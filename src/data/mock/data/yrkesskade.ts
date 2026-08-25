import type { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { deepcopyMedNyId } from '../deepcopyMedNyId'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

import type { Persona } from './personas/personas'
import { brukertestSoknad, brukertestSykmelding } from './personas/brukertestPerosn'
import { yrkesskadeV2Sporsmal } from './sporsmal/yrkesskade-v2'
import { yrkesskadeV1Sporsmal } from './sporsmal/yrkesskade-v1'

export function medYrkesskadeV1Sporsmal(soknad: RSSoknad): RSSoknad {
    return {
        ...soknad,
        sporsmal: [...soknad.sporsmal.slice(0, 8), jsonDeepCopy(yrkesskadeV1Sporsmal), ...soknad.sporsmal.slice(8)],
    }
}

export function medYrkesskadeV2Sporsmal(soknad: RSSoknad): RSSoknad {
    return {
        ...soknad,
        sporsmal: [...soknad.sporsmal.slice(0, 8), jsonDeepCopy(yrkesskadeV2Sporsmal), ...soknad.sporsmal.slice(8)],
    }
}

export const yrkesskadeSoknadV1 = medYrkesskadeV1Sporsmal(
    deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db1af'),
)

export const yrkesskadePerson: Persona = {
    soknader: [{ ...yrkesskadeSoknadV1, demoinfo: 'Yrkesskade med gammel spørsmålsstilling' }],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Yrkesskade 1',
}

export const yrkesskadeSoknad = medYrkesskadeV2Sporsmal(
    deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db133'),
)

export const yrkesskadeV2Person: Persona = {
    soknader: [{ ...yrkesskadeSoknad, demoinfo: 'Yrkesskade med ny spørsmålsstilling' }],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Yrkesskade v2',
}
