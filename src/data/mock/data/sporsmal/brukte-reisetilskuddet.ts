import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const brukteReisetilskuddet = ({
    svar = [],
    tekstvariant = 'ekstra-reiseutgifter',
}: {
    svar?: RSSvar[]
    tekstvariant?: 'ekstra-reiseutgifter' | 'brukt-reisetilskuddet'
} = {}): RSSporsmal => ({
    id: '1563341',
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
