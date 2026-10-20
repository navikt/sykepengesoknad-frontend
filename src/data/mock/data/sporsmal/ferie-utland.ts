import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const ferieUtland = ({
    svar = [],
}: {
    svar?: RSSvar[]
} = {}): RSSporsmal => ({
    id: '43389c36-d107-4ad2-a06b-26831bd84bdc',
    tag: 'FERIE',
    sporsmalstekst: 'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
