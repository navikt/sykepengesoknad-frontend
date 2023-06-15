import { Persona } from '../personas'
import { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { brukertestSoknad, brukertestSykmelding } from './brukertest'

export const yrkesskadeSporsmalet: RSSporsmal = {
    id: '234234234234',
    tag: 'YRKESSKADE',
    sporsmalstekst: `Skyldes dette sykefraværet en eller flere av disse godkjente yrkesskadene?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    pavirkerAndreSporsmal: false,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar: [],
    undersporsmal: [
        {
            id: '687381',
            tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
            sporsmalstekst: 'Velg hvilke skadedatoer dette sykefraværet har sammenheng med?',
            undertekst: null,
            svartype: 'CHECKBOX_GRUPPE',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [
                {
                    id: '687382',
                    tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                    sporsmalstekst: '2001-11-09  (vedtakssdato 2022-02-03)',
                    undertekst: null,
                    svartype: 'CHECKBOX',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '3242323324',
                    tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                    sporsmalstekst: '1995-01-15  (vedtakssdato 2022-02-03)',
                    undertekst: null,
                    svartype: 'CHECKBOX',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
}

export function yrkesskadePerson(): Persona {
    const yrkesskadeSoknad = deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db1af')
    const sporsmalene: RSSporsmal[] = []
    const splittSted = 8
    sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(0, splittSted))
    sporsmalene.push(yrkesskadeSporsmalet)
    sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(splittSted))

    yrkesskadeSoknad.sporsmal = sporsmalene
    return {
        soknader: [yrkesskadeSoknad],
        sykmeldinger: [brukertestSykmelding],
        kontonummer: '12340000000',
    }
}
