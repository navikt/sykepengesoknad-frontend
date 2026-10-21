import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterDato, formatterPeriode } from './utils/backend-datoformat'

type PermitertNaaValg = {
    readonly sykmeldtFom: string
    readonly min: string
    readonly max: string
    readonly svar?: RSSvar[]
}
export const permittertNaa = ({ sykmeldtFom, min, max, svar = [] }: PermitertNaaValg): RSSporsmal => ({
    id: '687337',
    tag: 'PERMITTERT_NAA',
    sporsmalstekst: `Var du permittert av arbeidsgiveren din da du ble sykmeldt ${formatterDato(sykmeldtFom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687338',
            tag: 'PERMITTERT_NAA_NAR',
            sporsmalstekst: 'Velg første dag i permitteringen',
            undertekst: null,
            svartype: 'DATO',
            min,
            max,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
})

type PermitertPeriodeValg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
}
export const permittertPeriode = ({ fom, tom, svar = [] }: PermitertPeriodeValg): RSSporsmal => ({
    id: '687339',
    tag: 'PERMITTERT_PERIODE',
    sporsmalstekst: `Har du vært permittert av arbeidsgiveren din i mer enn 14 sammenhengende dager mellom ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687340',
            tag: 'PERMITTERT_PERIODE_NAR',
            sporsmalstekst: null,
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
})
