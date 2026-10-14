import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

type PermitertNaaValg = {
    readonly sykmeldtFom: string
    readonly min: string
    readonly max: string
    readonly id?: string
    readonly narId?: string
    readonly svar?: RSSvar[]
}
export const permittertNaa = ({
    sykmeldtFom,
    min,
    max,
    id = '687337',
    narId = '687338',
    svar = [],
}: PermitertNaaValg): RSSporsmal => ({
    id,
    tag: 'PERMITTERT_NAA',
    sporsmalstekst: `Var du permittert av arbeidsgiveren din da du ble sykmeldt ${tilLesbarDatoMedArstall(sykmeldtFom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: narId,
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
    readonly id?: string
    readonly narId?: string
    readonly svar?: RSSvar[]
}
export const permittertPeriode = ({
    fom,
    tom,
    id = '687339',
    narId = '687340',
    svar = [],
}: PermitertPeriodeValg): RSSporsmal => ({
    id,
    tag: 'PERMITTERT_PERIODE',
    sporsmalstekst: `Har du vært permittert av arbeidsgiveren din i mer enn 14 sammenhengende dager mellom ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: narId,
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
