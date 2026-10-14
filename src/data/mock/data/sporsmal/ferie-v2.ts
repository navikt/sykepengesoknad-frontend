import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

type FerieV2Valg = {
    readonly fom: string
    readonly tom: string
    readonly id?: string
    readonly svar?: RSSvar[]
    readonly ferieNarId?: string
    readonly ferieNarSvar?: RSSvar[]
}

export const ferieV2 = ({
    fom,
    tom,
    id = '687343',
    svar = [],
    ferieNarId = '687344',
    ferieNarSvar = [],
}: FerieV2Valg): RSSporsmal => ({
    id,
    tag: 'FERIE_V2',
    sporsmalstekst: `Tok du ut feriedager i tidsrommet ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: ferieNarId,
            tag: 'FERIE_NAR_V2',
            sporsmalstekst: 'Når tok du ut feriedager?',
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: ferieNarSvar,
            undersporsmal: [],
        },
    ],
})
