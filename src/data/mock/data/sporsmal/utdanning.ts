import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './backend-datoformat'

export const utdanning = ({
    fom,
    tom,
    svar = [],
}: {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
}): RSSporsmal => ({
    id: '687369',
    tag: 'UTDANNING',
    sporsmalstekst: `Har du vært under utdanning i løpet av perioden ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687370',
            tag: 'UTDANNING_START',
            sporsmalstekst: 'Når startet du på utdanningen?',
            undertekst: null,
            svartype: 'DATO',
            min: null,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '687371',
            tag: 'FULLTIDSSTUDIUM',
            sporsmalstekst: 'Er utdanningen et fulltidsstudium?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
})
