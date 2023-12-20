import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const bekreftOpplysninger = (svar: RSSvar[] = []): RSSporsmal => {
    return {
        id: '1623833',
        tag: 'BEKREFT_OPPLYSNINGER',
        sporsmalstekst:
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        undertekst: null,
        svartype: 'CHECKBOX_PANEL',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar,
        undersporsmal: [],
    }
}
