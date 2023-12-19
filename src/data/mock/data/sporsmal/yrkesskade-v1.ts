import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const yrkesskadeV1Sporsmal: RSSporsmal = {
    id: '234234234234',
    tag: 'YRKESSKADE',
    sporsmalstekst: `Er du sykmeldt på grunn av en yrkesskade eller yrkessykdom?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
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
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
}
