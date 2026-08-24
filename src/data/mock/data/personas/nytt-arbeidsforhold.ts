import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { nyttArbeidsforholdSporsmal } from '../sporsmal/nytt-arbeidsforhold'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'
import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'

import type { Persona } from './personas'
import { brukertestSoknad, brukertestSykmelding } from './brukertestPerosn'

export function medNyttArbeidsforholdSporsmal(soknad: RSSoknad): RSSoknad {
    const kopi = jsonDeepCopy(soknad)
    const splittSted = kopi.sporsmal.findIndex((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')

    if (splittSted === -1) {
        throw new Error('Søknad mangler spørsmål ANDRE_INNTEKTSKILDER_V2')
    }

    kopi.sporsmal.splice(
        splittSted,
        0,
        nyttArbeidsforholdSporsmal({
            arbeidsstedNavn: 'Kaffebrenneriet',
            arbeidsstedOrgnummer: '123324',
            fom: kopi.fom!,
            tom: kopi.tom!,
        }),
    )
    kopi.inntektskilderDataFraInntektskomponenten?.push({
        orgnummer: '123324',
        navn: 'Kaffebrenneriet',
        arbeidsforholdstype: 'ARBEIDSTAKER',
    })

    kopi.sporsmal.find((spm) => spm.tag === 'ANDRE_INNTEKTSKILDER_V2')!.metadata = {
        kjenteInntektskilder: [
            { orgnummer: '123324', navn: 'Matbutikken AS' },
            { orgnummer: '123324', navn: 'Smørebussen AS' },
            { orgnummer: '123324', navn: 'Kaffebrenneriet' },
        ],
    }

    return kopi
}

export const nyttArbeidsforholdSoknad = medNyttArbeidsforholdSporsmal(
    deepcopyMedNyId(brukertestSoknad, '260f06b5-9fd0-4b30-94d2-4f90851b4cac'),
)

export const nyttArbeidsforholdPerson: Persona = {
    soknader: [nyttArbeidsforholdSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
    beskrivelse: 'Spørsmål om nytt arbeidsforhold',
}
