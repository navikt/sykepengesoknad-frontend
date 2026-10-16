import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const tilSlutt = ({
    id = '1623832',
    svar = [],
    sporsmalstekst = null,
}: { readonly id?: string; readonly svar?: RSSvar[]; readonly sporsmalstekst?: string | null } = {}): RSSporsmal => ({
    id,
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
