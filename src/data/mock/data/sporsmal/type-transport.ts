import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const typeTransport = ({
    svar = [],
    undersporsmal = [
        {
            id: '1566426',
            tag: 'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
            sporsmalstekst: 'Offentlig transport',
            undertekst: null,
            svartype: 'CHECKBOX',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'CHECKED',
            svar: [],
            undersporsmal: [
                {
                    id: '1566427',
                    tag: 'OFFENTLIG_TRANSPORT_BELOP',
                    sporsmalstekst: 'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
                    undertekst: null,
                    svartype: 'BELOP',
                    min: '0',
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1566428',
            tag: 'BIL_TIL_DAGLIG',
            sporsmalstekst: 'Bil',
            undertekst: null,
            svartype: 'CHECKBOX',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
}: {
    svar?: RSSvar[]
    undersporsmal?: RSSporsmal[]
} = {}): RSSporsmal => ({
    id: '1566425',
    tag: 'TYPE_TRANSPORT',
    sporsmalstekst: 'Hva slags type transport brukte du?',
    undertekst: null,
    svartype: 'CHECKBOX_GRUPPE',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal,
})
