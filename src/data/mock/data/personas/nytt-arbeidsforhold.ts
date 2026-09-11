import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { nyttArbeidsforholdSporsmal } from '../sporsmal/nytt-arbeidsforhold'

import type { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertestPerosn'

export const nyttArbeidsforholdSoknad = deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4cac')

const splittSted = nyttArbeidsforholdSoknad.sporsmal.findIndex((spm) => spm.tag === 'FLERE_INNTEKTSKILDER_GHOST')
if (splittSted === -1) {
    throw new Error('Søknad mangler spørsmål FLERE_INNTEKTSKILDER_GHOST')
}
nyttArbeidsforholdSoknad.sporsmal = [
    ...nyttArbeidsforholdSoknad.sporsmal.slice(0, splittSted),
    nyttArbeidsforholdSporsmal({
        arbeidsstedNavn: 'Kaffebrenneriet',
        arbeidsstedOrgnummer: '123324',
        tom: nyttArbeidsforholdSoknad.tom!,
        fom: nyttArbeidsforholdSoknad.fom!,
    }),
    ...nyttArbeidsforholdSoknad.sporsmal.slice(splittSted),
]
nyttArbeidsforholdSoknad.inntektskilderDataFraInntektskomponenten?.push({
    orgnummer: '123324',
    navn: 'Kaffebrenneriet',
    arbeidsforholdstype: 'ARBEIDSTAKER',
})

nyttArbeidsforholdSoknad.sporsmal.find((spm) => spm.tag === 'FLERE_INNTEKTSKILDER_GHOST')!.metadata = {
    kjenteInntektskilder: [
        { orgnummer: '123324', navn: 'Matbutikken AS' },
        { orgnummer: '123324', navn: 'Smørebussen AS' },
        { orgnummer: '123324', navn: 'Kaffebrenneriet' },
    ],
}

export const nyttArbeidsforholdPerson: Persona = {
    soknader: [nyttArbeidsforholdSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Spørsmål om nytt arbeidsforhold',
}
