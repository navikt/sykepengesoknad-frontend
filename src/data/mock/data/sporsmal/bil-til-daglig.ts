import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const bilTilDaglig = ({
    svar = [],
    undersporsmal = [],
    kriterieForVisningAvUndersporsmal = null,
}: {
    svar?: RSSvar[]
    undersporsmal?: RSSporsmal[]
    kriterieForVisningAvUndersporsmal?: 'CHECKED' | null
} = {}): RSSporsmal => ({
    id: '1566428',
    tag: 'BIL_TIL_DAGLIG',
    sporsmalstekst: 'Bil',
    undertekst: null,
    svartype: 'CHECKBOX',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal,
    svar,
    undersporsmal,
})

export const kmHjemJobb = ({
    svar = [],
    tekstvariant = 'lang',
}: {
    svar?: RSSvar[]
    tekstvariant?: 'kort' | 'lang'
} = {}): RSSporsmal => ({
    id: '1566448',
    tag: 'KM_HJEM_JOBB',
    sporsmalstekst:
        tekstvariant === 'kort'
            ? 'Hvor mange km er kjøreturen mellom hjemmet ditt og jobben?'
            : 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?',
    undertekst: null,
    svartype: 'KILOMETER',
    min: '0',
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})

export const bilBompenger = ({
    svar = [],
    belop = bilBompengerBelop(),
}: {
    svar?: RSSvar[]
    belop?: RSSporsmal
} = {}): RSSporsmal => ({
    id: '1566446',
    tag: 'BIL_BOMPENGER',
    sporsmalstekst: 'Hadde du utgifter til bompenger?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [belop],
})

export const bilBompengerBelop = ({
    svar = [],
    tekstvariant = 'mellom-hjem-og-jobb',
}: {
    svar?: RSSvar[]
    tekstvariant?: 'mellom-hjem-og-jobb' | 'i-perioden'
} = {}): RSSporsmal => ({
    id: '1566447',
    tag: 'BIL_BOMPENGER_BELOP',
    sporsmalstekst:
        tekstvariant === 'i-perioden'
            ? 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben i perioden?'
            : 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?',
    undertekst: null,
    svartype: 'BELOP',
    min: '0',
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
