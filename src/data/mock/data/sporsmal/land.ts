import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const land = ({
    svar = [],
    undertekst = 'Du kan velge flere land.',
    svartype = 'COMBOBOX_MULTI',
}: {
    svar?: RSSvar[]
    undertekst?: string | null
    svartype?: 'COMBOBOX_MULTI' | 'LAND'
} = {}): RSSporsmal => ({
    id: 'eafa7256-2486-419c-96d9-d077418fa8a2',
    tag: 'LAND',
    sporsmalstekst: 'Hvor skal du reise?',
    undertekst,
    svartype,
    min: null,
    max: '50',
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
