import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './utils/backend-datoformat'

type OppholdUtenforEosValg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
    readonly oppholdNarSvar?: RSSvar[]
    readonly oppholdNarTag?: 'OPPHOLD_UTENFOR_EOS_NAR' | 'PERIODER'
}

export const oppholdUtenforEos = ({
    fom,
    tom,
    svar = [],
    oppholdNarSvar = [],
    oppholdNarTag = 'OPPHOLD_UTENFOR_EOS_NAR',
}: OppholdUtenforEosValg): RSSporsmal => ({
    id: '687347',
    tag: 'OPPHOLD_UTENFOR_EOS',
    sporsmalstekst: `Var du på reise utenfor EU/EØS og Storbritannia mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
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
            sporsmalstekst: 'Når var du på reise?',
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
