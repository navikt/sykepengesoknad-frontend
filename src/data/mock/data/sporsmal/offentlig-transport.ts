import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const offentligTransportTilDaglig = ({
    id = '1566426',
    svar = [],
    belop = offentligTransportBelop(),
}: {
    id?: string
    svar?: RSSvar[]
    belop?: RSSporsmal
} = {}): RSSporsmal => ({
    id,
    tag: 'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
    sporsmalstekst: 'Offentlig transport',
    undertekst: null,
    svartype: 'CHECKBOX',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'CHECKED',
    svar,
    undersporsmal: [belop],
})

export const offentligTransportBelop = ({
    id = '1566427',
    svar = [],
}: {
    id?: string
    svar?: RSSvar[]
} = {}): RSSporsmal => ({
    id,
    tag: 'OFFENTLIG_TRANSPORT_BELOP',
    sporsmalstekst: 'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
    undertekst: null,
    svartype: 'BELOP',
    min: '0',
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
