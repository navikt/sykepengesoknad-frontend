import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterDato } from './backend-datoformat'

type FriskmeldtValg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
    readonly startSvar?: RSSvar[]
}

export const friskmeldt = ({ fom, tom, svar = [], startSvar = [] }: FriskmeldtValg): RSSporsmal => ({
    id: '687400',
    tag: 'FRISKMELDT',
    sporsmalstekst: `Brukte du hele sykmeldingen fram til ${formatterDato(tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'NEI',
    svar,
    undersporsmal: [
        {
            id: '687401',
            tag: 'FRISKMELDT_START',
            sporsmalstekst: 'Fra hvilken dato trengte du ikke lenger sykmeldingen?',
            undertekst: null,
            svartype: 'DATO',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: startSvar,
            undersporsmal: [],
        },
    ],
})
