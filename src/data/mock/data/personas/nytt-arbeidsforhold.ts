import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import {
    nyttArbeidsforholdForstegangSporsmal,
    nyttArbeidsforholdPafolgendeSporsmal,
} from '../sporsmal/nytt-arbeidsforhold'

import { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertest'

const nyttArbeidsforholdForstegangSoknad = deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4cac')

const splittSted = nyttArbeidsforholdForstegangSoknad.sporsmal.findIndex((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}
nyttArbeidsforholdForstegangSoknad.sporsmal = [
    ...nyttArbeidsforholdForstegangSoknad.sporsmal.slice(0, splittSted),
    nyttArbeidsforholdForstegangSporsmal({
        orgnavn: 'Kaffebrenneriet',
        orgnr: '123324',
        tom: nyttArbeidsforholdForstegangSoknad.tom!,
        fom: nyttArbeidsforholdForstegangSoknad.fom!,
    }),
    ...nyttArbeidsforholdForstegangSoknad.sporsmal.slice(splittSted),
]
nyttArbeidsforholdForstegangSoknad.inntektskilderDataFraInntektskomponenten?.push({
    orgnummer: '123324',
    navn: 'Kaffebrenneriet',
    arbeidsforholdstype: 'ARBEIDSTAKER',
})

export const nyttArbeidsforholdForstegangs: Persona = {
    soknader: [nyttArbeidsforholdForstegangSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Førstegangsspørsmål om nytt arbeidsforhold',
}
const nyttArbeidsforholdPaafolgendeSoknad = deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4ddd')

const splittStedPaafolgende = nyttArbeidsforholdPaafolgendeSoknad.sporsmal.findIndex(
    (spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2',
)
if (splittStedPaafolgende === -1) {
    throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
}

nyttArbeidsforholdPaafolgendeSoknad.sporsmal = [
    ...nyttArbeidsforholdPaafolgendeSoknad.sporsmal.slice(0, splittStedPaafolgende),
    nyttArbeidsforholdPafolgendeSporsmal({
        orgnavn: 'Kaffebrenneriet',
        orgnr: '123324',
        tom: nyttArbeidsforholdForstegangSoknad.tom!,
        fom: nyttArbeidsforholdForstegangSoknad.fom!,
    }),
    ...nyttArbeidsforholdPaafolgendeSoknad.sporsmal.slice(splittStedPaafolgende),
]
nyttArbeidsforholdForstegangSoknad.inntektskilderDataFraInntektskomponenten?.push({
    orgnummer: '123324',
    navn: 'Kaffebrenneriet',
    arbeidsforholdstype: 'ARBEIDSTAKER',
})

export const nyttArbeidsforholdPaafolgende: Persona = {
    soknader: [nyttArbeidsforholdPaafolgendeSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Påfølgende spørsmål om nytt arbeidsforhold',
}
