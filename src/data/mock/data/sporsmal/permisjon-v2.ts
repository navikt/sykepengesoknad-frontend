import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'

type PermisjonV2Valg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
    readonly permisjonNarSvar?: RSSvar[]
}

export const permisjonV2 = ({ fom, tom, svar = [], permisjonNarSvar = [] }: PermisjonV2Valg): RSSporsmal => ({
    id: '687345',
    tag: 'PERMISJON_V2',
    sporsmalstekst: `Tok du permisjon mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687346',
            tag: 'PERMISJON_NAR_V2',
            sporsmalstekst: 'Når tok du permisjon?',
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: permisjonNarSvar,
            undersporsmal: [],
        },
    ],
})
