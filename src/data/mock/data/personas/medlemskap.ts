import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import {
    medlemskapOppholdstillatelseSporsmal,
    medlemskapOppholdstillatelseV2Sporsmal,
    medlemskapOppholdUtenforEøsSporsmal,
    medlemskapOppholdUtenforNorgeSporsmal,
    medlemskapUtførtArbeidUtenforNorgeSporsmal,
} from '../sporsmal/medlemskap'

import { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertest'

const medlemskapSoknad = deepcopyMedNyId(brukertestSoknad, '7fdc72b9-30a9-435c-9eb1-f7cc68a8b429')
const oppholdUtlandSpm = medlemskapSoknad.sporsmal.find((spm) => spm.tag == 'UTLAND_V2')
if (!oppholdUtlandSpm) {
    throw new Error('Søknad mangler spørsmål UTLAND_V2')
}
medlemskapSoknad.sporsmal = medlemskapSoknad.sporsmal
    // ARBEID_UTENFOR_NORGE stilles ikke når det stilles spørsmål om medlemskap.
    .filter((spm) => spm.tag !== 'ARBEID_UTENFOR_NORGE')
    // Fjerner spørsmålet sånn at det kan settes inn etter medlemskapspørsmål om opphold utenfor EØS.
    .filter((spm) => spm.tag !== 'UTLAND_V2')
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

const medlemskapSoknadOppholdstillatelseV2 = deepcopyMedNyId(medlemskapSoknad, '15035122-1f22-4231-be4b-c9e46131d53d')

const oppholdstillatelseIndex = medlemskapSoknadOppholdstillatelseV2.sporsmal.findIndex(
    (spm) => spm.tag === 'MEDLEMSKAP_OPPHOLDSTILLATELSE',
)

medlemskapSoknadOppholdstillatelseV2.sporsmal = medlemskapSoknadOppholdstillatelseV2.sporsmal.filter(
    (spm) => spm.tag !== 'MEDLEMSKAP_OPPHOLDSTILLATELSE',
)

// Setter inn nytt spørsmål om oppholdstllatelse der hvor det gamle var.
medlemskapSoknadOppholdstillatelseV2.sporsmal = [
    ...medlemskapSoknadOppholdstillatelseV2.sporsmal.slice(0, oppholdstillatelseIndex),
    medlemskapOppholdstillatelseV2Sporsmal,
    ...medlemskapSoknadOppholdstillatelseV2.sporsmal.slice(oppholdstillatelseIndex),
]

export const medlemskapPerson: Persona = {
    soknader: [medlemskapSoknad, medlemskapSoknadOppholdstillatelseV2],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Person med søknader med forskjellig spørsmål om medlemskap',
}
