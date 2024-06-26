import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

import { bekreftOpplysninger } from './bekreft-opplysninger'

export const bekreftelse = (): RSSporsmal => {
    return {
        id: '1623832',
        tag: 'TIL_SLUTT',
        sporsmalstekst: 'Viktig å være klar over:',
        undertekst: null,
        svartype: 'BEKREFTELSESPUNKTER',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [bekreftOpplysninger()],
    }
}
