import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const brukteReisetilskuddet = ({
    id = '1563341',
    svar = [],
    tekstvariant = 'ekstra-reiseutgifter',
}: {
    id?: string
    svar?: RSSvar[]
    tekstvariant?: 'ekstra-reiseutgifter' | 'brukt-reisetilskuddet'
} = {}): RSSporsmal => ({
    id,
    tag: 'BRUKTE_REISETILSKUDDET',
    sporsmalstekst:
        tekstvariant === 'ekstra-reiseutgifter'
            ? 'Hadde du ekstra reiseutgifter mens du var sykmeldt?'
            : 'Har du brukt reisetilskuddet mens du var sykmeldt?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
