import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const offentligTransportTilDaglig = ({
    svar = [],
    belop = offentligTransportBelop(),
}: {
    svar?: RSSvar[]
    belop?: RSSporsmal
} = {}): RSSporsmal => ({
    id: '1566426',
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
    svar = [],
}: {
    svar?: RSSvar[]
} = {}): RSSporsmal => ({
    id: '1566427',
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
