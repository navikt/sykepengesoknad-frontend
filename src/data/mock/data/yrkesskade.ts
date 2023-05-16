import { Persona } from '../personas'
import { RSSporsmal } from '../../../types/rs-types/rs-sporsmal'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

import { brukertestSoknad, brukertestSykmelding } from './brukertest'

export const yrkesskadeSporsmalet: RSSporsmal = {
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

const yrkesskadeSoknad = jsonDeepCopy(brukertestSoknad)
yrkesskadeSoknad.utenlandskSykmelding = true
const sporsmalene: RSSporsmal[] = []
const splittSted = 9
sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(0, splittSted))
sporsmalene.push(yrkesskadeSporsmalet)
sporsmalene.push(...yrkesskadeSoknad.sporsmal.slice(splittSted))

yrkesskadeSoknad.sporsmal = sporsmalene

export const yrkesskadePerson: Persona = {
    soknader: [yrkesskadeSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
}
