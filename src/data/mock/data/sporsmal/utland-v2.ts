import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './utils/backend-datoformat'

type UtlandV2Valg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
    readonly tekstvariant?: 'eos' | 'eu-eos'
}

export const utlandV2 = ({ fom, tom, svar = [], tekstvariant = 'eu-eos' }: UtlandV2Valg): RSSporsmal => ({
    id: '687347',
    tag: 'UTLAND_V2',
    sporsmalstekst: `Var du på reise utenfor ${tekstvariant === 'eos' ? 'EØS' : 'EU/EØS'} mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687348',
            tag: 'UTLAND_NAR_V2',
            sporsmalstekst: `Når var du utenfor ${tekstvariant === 'eos' ? 'EØS' : 'EU/EØS'}?`,
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
