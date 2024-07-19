import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { tilkommenInntektForstegangSporsmal } from '../sporsmal/tilkommen-inntekt'

import { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertest'

const soknad = deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4cac')

const splittSted = soknad.sporsmal.findIndex((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
soknad.sporsmal = [
    ...soknad.sporsmal.slice(0, splittSted),
    tilkommenInntektForstegangSporsmal({ orgnavn: 'Kaffebrenneriet', orgnr: '123324', tom: soknad.tom! }),
    ...soknad.sporsmal.slice(splittSted),
]
soknad.inntektskilderDataFraInntektskomponenten?.push({
    orgnummer: '123324',
    navn: 'Kaffebrenneriet',
    arbeidsforholdstype: 'ARBEIDSTAKER',
})

export const tilkommenInntektForstegangs: Persona = {
    soknader: [soknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Førstegangsspørsmål om tilkommen inntekt',
}
