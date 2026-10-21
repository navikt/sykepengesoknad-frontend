import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './utils/backend-datoformat'

type FerieV2Valg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
}

export const ferieV2 = ({ fom, tom, svar = [] }: FerieV2Valg): RSSporsmal => ({
    id: '687343',
    tag: 'FERIE_V2',
    sporsmalstekst: `Tok du ut feriedager i tidsrommet ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687344',
            tag: 'FERIE_NAR_V2',
            sporsmalstekst: 'Når tok du ut feriedager?',
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
})
