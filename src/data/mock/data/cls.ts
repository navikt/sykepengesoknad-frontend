import { Persona } from '../personas'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { brukertestSoknad, brukertestSykmelding } from './brukertest'

export const clsPerson: Persona = {
    soknader: [deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f23807777777')],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
}
