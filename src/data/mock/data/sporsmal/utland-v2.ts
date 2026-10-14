import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

type UtlandV2Valg = {
    readonly fom: string
    readonly tom: string
    readonly id?: string
    readonly svar?: RSSvar[]
    readonly utlandNarId?: string
    readonly utlandNarSvar?: RSSvar[]
    readonly tekstvariant?: 'eos' | 'eu-eos'
}

export const utlandV2 = ({
    fom,
    tom,
    id = '687347',
    svar = [],
    utlandNarId = '687348',
    utlandNarSvar = [],
    tekstvariant = 'eu-eos',
}: UtlandV2Valg): RSSporsmal => ({
    id,
    tag: 'UTLAND_V2',
    sporsmalstekst: `Var du på reise utenfor ${tekstvariant === 'eos' ? 'EØS' : 'EU/EØS'} mens du var sykmeldt ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: utlandNarId,
            tag: 'UTLAND_NAR_V2',
            sporsmalstekst: `Når var du utenfor ${tekstvariant === 'eos' ? 'EØS' : 'EU/EØS'}?`,
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: utlandNarSvar,
            undersporsmal: [],
        },
    ],
})
