import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { kjenteInntektskilder } from '../sporsmal/kjente-inntektskilder'

import { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertest'

const soknad = deepcopyMedNyId(brukertestSoknad, '7fdc72b9-30a9-435c-9eb1-f7cc68a8b444')

const splittSted = soknad.sporsmal.findIndex((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
soknad.sporsmal = [
    ...soknad.sporsmal.slice(0, splittSted),
    kjenteInntektskilder(['Butikken', 'Rikstrygdeverket']),
    ...soknad.sporsmal.slice(splittSted),
]

export const kjenteInntektskilderPerson: Persona = {
    soknader: [soknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Søknad med avviklet kjente inntektskilder spørsmål',
}
