import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const utbetaling = ({
    svar = [],
}: {
    svar?: RSSvar[]
} = {}): RSSporsmal => ({
    id: '1566435',
    tag: 'UTBETALING',
    sporsmalstekst: 'Legger arbeidsgiveren din ut for reisene?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
