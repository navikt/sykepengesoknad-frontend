import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const tilSlutt = ({
    svar = [],
    sporsmalstekst = null,
}: { readonly svar?: RSSvar[]; readonly sporsmalstekst?: string | null } = {}): RSSporsmal => ({
    id: '1623832',
    tag: 'TIL_SLUTT',
    sporsmalstekst,
    undertekst: null,
    svartype: 'OPPSUMMERING',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
