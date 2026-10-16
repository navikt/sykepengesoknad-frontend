import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'

export const ansvarserklaring = ({
    id = '1623807',
    svar = [],
}: { readonly id?: string; readonly svar?: RSSvar[] } = {}): RSSporsmal => {
    return {
        id,
        tag: 'ANSVARSERKLARING',
        sporsmalstekst: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
        undertekst: null,
        svartype: 'CHECKBOX_PANEL',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar,
        undersporsmal: [],
    }
}
