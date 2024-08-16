import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { tilkommenInntektForstegangSporsmal, tilkommenInntektPafolgendeSporsmal } from '../sporsmal/tilkommen-inntekt'

import { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertest'

const tilkommenInntektForstegangSoknad = deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4cac')

const splittSted = tilkommenInntektForstegangSoknad.sporsmal.findIndex((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
tilkommenInntektForstegangSoknad.sporsmal = [
    ...tilkommenInntektForstegangSoknad.sporsmal.slice(0, splittSted),
    tilkommenInntektForstegangSporsmal({
        orgnavn: 'Kaffebrenneriet',
        orgnr: '123324',
        tom: tilkommenInntektForstegangSoknad.tom!,
    }),
    ...tilkommenInntektForstegangSoknad.sporsmal.slice(splittSted),
]
tilkommenInntektForstegangSoknad.inntektskilderDataFraInntektskomponenten?.push({
    orgnummer: '123324',
    navn: 'Kaffebrenneriet',
    arbeidsforholdstype: 'ARBEIDSTAKER',
})

export const tilkommenInntektForstegangs: Persona = {
    soknader: [tilkommenInntektForstegangSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Førstegangsspørsmål om tilkommen inntekt',
}
const tilkommenInntektPaafolgendeSoknad = deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4ddd')

const splittStedPaafolgende = tilkommenInntektPaafolgendeSoknad.sporsmal.findIndex(
    (spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2',
)
if (splittStedPaafolgende === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
tilkommenInntektPaafolgendeSoknad.sporsmal = [
    ...tilkommenInntektPaafolgendeSoknad.sporsmal.slice(0, splittStedPaafolgende),
    tilkommenInntektPafolgendeSporsmal({
        orgnavn: 'Kaffebrenneriet',
        orgnr: '123324',
        tom: tilkommenInntektForstegangSoknad.tom!,
        fom: tilkommenInntektForstegangSoknad.fom!,
    }),
    ...tilkommenInntektPaafolgendeSoknad.sporsmal.slice(splittStedPaafolgende),
]
tilkommenInntektForstegangSoknad.inntektskilderDataFraInntektskomponenten?.push({
    orgnummer: '123324',
    navn: 'Kaffebrenneriet',
    arbeidsforholdstype: 'ARBEIDSTAKER',
})

export const tilkommenInntektPaafolgende: Persona = {
    soknader: [tilkommenInntektPaafolgendeSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Påfølgende spørsmål om tilkommen inntekt',
}
