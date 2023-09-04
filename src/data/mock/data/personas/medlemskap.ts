import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import {
    medlemskapOppholdstillatelseSporsmal,
    medlemskapOppholdUtenforEøsSporsmal,
    medlemskapOppholdUtenforNorgeSporsmal,
    medlemskapUtførtArbeidUtenforNorgeSporsmal,
} from '../sporsmal/medlemskap'

import { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertest'

const medlemskapSoknad = deepcopyMedNyId(brukertestSoknad, '7fdc72b9-30a9-435c-9eb1-f7cc68a8b429')
const splittSted = 8
medlemskapSoknad.sporsmal = [
    ...medlemskapSoknad.sporsmal.slice(0, splittSted),
    medlemskapUtførtArbeidUtenforNorgeSporsmal,
    medlemskapOppholdUtenforEøsSporsmal,
    medlemskapOppholdUtenforNorgeSporsmal,
    medlemskapOppholdstillatelseSporsmal,
    ...medlemskapSoknad.sporsmal.slice(splittSted),
]

export const medlemskapPerson: Persona = {
    soknader: [medlemskapSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Søknad med alle medlemskap spørsmålene',
}
