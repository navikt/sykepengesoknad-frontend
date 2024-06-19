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

const medlemskapOriginalOppholdstillatelse = deepcopyMedNyId(brukertestSoknad, '7fdc72b9-30a9-435c-9eb1-f7cc68a8b429')
const oppholdUtlandSpm = medlemskapOriginalOppholdstillatelse.sporsmal.find(
    (spm) => spm.tag === 'UTLAND_V2' || spm.tag === 'OPPHOLD_UTENFOR_EOS',
)
if (!oppholdUtlandSpm) {
    throw new Error('Søknad mangler spørsmål UTLAND_V2 eller OPPHOLD_UTENFOR_EOS')
}
medlemskapOriginalOppholdstillatelse.sporsmal = medlemskapOriginalOppholdstillatelse.sporsmal
    // ARBEID_UTENFOR_NORGE stilles ikke når det stilles spørsmål om medlemskap.
    .filter((spm) => spm.tag !== 'ARBEID_UTENFOR_NORGE')
    // Fjerner spørsmålet sånn at det kan settes inn etter medlemskapspørsmål om opphold utenfor EØS.
    .filter((spm) => spm.tag !== 'UTLAND_V2')
    .filter((spm) => spm.tag !== 'OPPHOLD_UTENFOR_EOS')
const splittSted = medlemskapOriginalOppholdstillatelse.sporsmal.findIndex(
    (spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2',
)
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
medlemskapOriginalOppholdstillatelse.sporsmal = [
    ...medlemskapOriginalOppholdstillatelse.sporsmal.slice(0, splittSted + 1),
    medlemskapUtførtArbeidUtenforNorgeSporsmal,
    medlemskapOppholdUtenforNorgeSporsmal,
    medlemskapOppholdUtenforEøsSporsmal,
    oppholdUtlandSpm,
    medlemskapOppholdstillatelseSporsmal,
    ...medlemskapOriginalOppholdstillatelse.sporsmal.slice(splittSted + 1),
]

const medlemskapOppholdstillatelsePermanent = deepcopyMedNyId(
    medlemskapOriginalOppholdstillatelse,
    '15035122-1f22-4231-be4b-c9e46131d53d',
)

const oppholdstillatelseIndex = medlemskapOppholdstillatelsePermanent.sporsmal.findIndex(
    (spm) => spm.tag === 'MEDLEMSKAP_OPPHOLDSTILLATELSE',
)

medlemskapOppholdstillatelsePermanent.sporsmal = medlemskapOppholdstillatelsePermanent.sporsmal.filter(
    (spm) => spm.tag !== 'MEDLEMSKAP_OPPHOLDSTILLATELSE',
)

// Setter inn nytt spørsmål om oppholdstllatelse der hvor det gamle var.
medlemskapOppholdstillatelsePermanent.sporsmal = [
    ...medlemskapOppholdstillatelsePermanent.sporsmal.slice(0, oppholdstillatelseIndex),
    medlemskapOppholdstillatelseV2Sporsmal,
    ...medlemskapOppholdstillatelsePermanent.sporsmal.slice(oppholdstillatelseIndex),
]

const medlemskapOppholdstillatelseMidlertidig = deepcopyMedNyId(
    medlemskapOppholdstillatelsePermanent,
    'b3c6b4f5-0c6b-4d0c-9c7e-1d5c9d9c1e2e',
)

medlemskapOppholdstillatelsePermanent.kjentOppholdstillatelse = { fom: '2024-05-01' }
medlemskapOppholdstillatelseMidlertidig.kjentOppholdstillatelse = { fom: '2024-05-01', tom: '2024-12-31' }

export const medlemskapPerson: Persona = {
    soknader: [
        medlemskapOriginalOppholdstillatelse,
        medlemskapOppholdstillatelsePermanent,
        medlemskapOppholdstillatelseMidlertidig,
    ],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Person med søknader med forskjellig spørsmål om medlemskap',
}
