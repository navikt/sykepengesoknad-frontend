import { Persona } from '../personas'
import { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { deepcopyMedNyId } from '../deepcopyMedNyId'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'

import { brukertestSoknad, brukertestSykmelding } from './brukertest'

function skapSkadedatoTekst(y: { skadedato: string; vedtaksdato: string }) {
    return `Skadedato ${tilLesbarDatoMedArstall(y.skadedato)} (Vedtaksdato ${tilLesbarDatoMedArstall(y.vedtaksdato)})`
}

export const yrkesskadeV1Sporsmal: RSSporsmal = {
    id: '234234234234',
    tag: 'YRKESSKADE',
    sporsmalstekst: `Er du sykmeldt på grunn av en yrkesskade eller yrkessykdom?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    pavirkerAndreSporsmal: false,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar: [],
    undersporsmal: [
        {
            id: 'fawef2352342d323r',
            tag: 'YRKESSKADE_SAMMENHENG',
            sporsmalstekst: `Er det en sammenheng mellom dette sykefraværet og tidligere yrkesskade?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
}

export function yrkesskadePerson(): Persona {
    const yrkesskadeSoknad = deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db1af')
    const sporsmalene: RSSporsmal[] = []
    const splittSted = 8
    sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(0, splittSted))
    sporsmalene.push(yrkesskadeV1Sporsmal)
    sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(splittSted))

    yrkesskadeSoknad.sporsmal = sporsmalene
    return {
        soknader: [yrkesskadeSoknad],
        sykmeldinger: [brukertestSykmelding],
        kontonummer: '12340000000',
    }
}

const yrkesskadeDatoer = [
    { skadedato: '2020-01-01', vedtaksdato: '2021-04-05' },
    { skadedato: '1997-04-02', vedtaksdato: '1999-12-03' },
]

export const yrkesskadeV2Sporsmal: RSSporsmal = {
    id: '123123654612312',
    tag: 'YRKESSKADE_V2',
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
            id: '12312317654657231',
            tag: 'YRKESSKADE_V2_VELG_DATO',
            sporsmalstekst: 'Velg hvilken skadedato dette sykefraværet har sammenheng med',
            undertekst: null,
            svartype: 'CHECKBOX_GRUPPE',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: yrkesskadeDatoer.map((d, i) => {
                return {
                    id: '3242323324' + i,
                    tag: 'YRKESSKADE_V2_DATO',
                    sporsmalstekst: skapSkadedatoTekst(d),
                    undertekst: null,
                    svartype: 'CHECKBOX',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                }
            }),
        },
    ],
}

export function yrkesskadeV2Person(): Persona {
    const yrkesskadeSoknad = deepcopyMedNyId(brukertestSoknad, '04247ad5-9c15-4b7d-ae55-f238003db133')
    const sporsmalene: RSSporsmal[] = []
    const splittSted = 8
    sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(0, splittSted))
    sporsmalene.push(yrkesskadeV2Sporsmal)
    sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(splittSted))
    yrkesskadeSoknad.sporsmal = sporsmalene
    return {
        soknader: [yrkesskadeSoknad],
        sykmeldinger: [brukertestSykmelding],
        kontonummer: '12340000000',
    }
}
