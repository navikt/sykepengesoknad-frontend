import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarDatoMedArstall } from '../../../../utils/dato-utils'

type FriskmeldtValg = {
    readonly fom: string
    readonly tom: string
    readonly id?: string
    readonly startId?: string
    readonly svar?: RSSvar[]
    readonly startSvar?: RSSvar[]
}

export const friskmeldt = ({
    fom,
    tom,
    id = '687400',
    startId = '687401',
    svar = [],
    startSvar = [],
}: FriskmeldtValg): RSSporsmal => ({
    id,
    tag: 'FRISKMELDT',
    sporsmalstekst: `Brukte du hele sykmeldingen fram til ${tilLesbarDatoMedArstall(tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'NEI',
    svar,
    undersporsmal: [
        {
            id: startId,
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
