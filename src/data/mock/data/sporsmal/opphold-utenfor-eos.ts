import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './utils/backend-datoformat'

type OppholdUtenforEosValg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
    readonly oppholdNarSvar?: RSSvar[]
    readonly oppholdNarTag?: 'OPPHOLD_UTENFOR_EOS_NAR' | 'PERIODER'
    readonly tekstvariant?: 'eos' | 'eu-eos'
    readonly sporsmalstekst?: string
}

export const oppholdUtenforEos = ({
    fom,
    tom,
    svar = [],
    oppholdNarSvar = [],
    oppholdNarTag = 'OPPHOLD_UTENFOR_EOS_NAR',
    tekstvariant = 'eu-eos',
    sporsmalstekst,
}: OppholdUtenforEosValg): RSSporsmal => ({
    id: '687347',
    tag: 'OPPHOLD_UTENFOR_EOS',
    sporsmalstekst:
        sporsmalstekst ??
        `Var du på reise utenfor ${tekstvariant === 'eos' ? 'EØS' : 'EU/EØS'} mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687348',
            tag: oppholdNarTag,
            sporsmalstekst: `Når var du utenfor ${tekstvariant === 'eos' ? 'EØS' : 'EU/EØS'}?`,
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: oppholdNarSvar,
            undersporsmal: [],
        },
    ],
})
