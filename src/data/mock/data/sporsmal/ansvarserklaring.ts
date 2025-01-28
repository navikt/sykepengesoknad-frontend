import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const ansvarserklaring = (): RSSporsmal => {
    return {
        id: '1623807',
        tag: 'ANSVARSERKLARING',
        sporsmalstekst: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
        undertekst: null,
        svartype: 'CHECKBOX_PANEL',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    }
}
