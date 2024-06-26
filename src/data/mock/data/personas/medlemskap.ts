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
const oppholdUtlandSpm = medlemskapSoknad.sporsmal.find(
    (spm) => spm.tag === 'UTLAND_V2' || spm.tag === 'OPPHOLD_UTENFOR_EOS',
)
if (!oppholdUtlandSpm) {
    throw new Error('Søknad mangler spørsmål UTLAND_V2 eller OPPHOLD_UTENFOR_EOS')
}
medlemskapSoknad.sporsmal = medlemskapSoknad.sporsmal
    .filter((spm) => spm.tag !== 'ARBEID_UTENFOR_NORGE')
    .filter((spm) => spm.tag !== 'UTLAND_V2')
    .filter((spm) => spm.tag !== 'OPPHOLD_UTENFOR_EOS')
const splittSted = medlemskapSoknad.sporsmal.findIndex((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
medlemskapSoknad.sporsmal = [
    ...medlemskapSoknad.sporsmal.slice(0, splittSted + 1),
    medlemskapUtførtArbeidUtenforNorgeSporsmal,
    medlemskapOppholdUtenforNorgeSporsmal,
    medlemskapOppholdUtenforEøsSporsmal,
    oppholdUtlandSpm,
    medlemskapOppholdstillatelseSporsmal,
    ...medlemskapSoknad.sporsmal.slice(splittSted + 1),
]

export const medlemskapPerson: Persona = {
    soknader: [medlemskapSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Søknad med alle medlemskap spørsmålene',
}
