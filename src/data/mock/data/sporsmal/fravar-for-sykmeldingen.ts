import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterDato, formatterPeriode } from './backend-datoformat'

type FravarValg = {
    readonly fom: string
    readonly tom: string
    readonly narMin: string
    readonly narMax: string
    readonly id?: string
    readonly narId?: string
    readonly svar?: RSSvar[]
    readonly narSvar?: RSSvar[]
    readonly tekstFom?: string
    readonly tekstTom?: string
}

export const fravarForSykmeldingen = ({
    fom,
    tom,
    narMin,
    narMax,
    id = '12345678',
    narId = '1234567899',
    svar = [],
    narSvar = [],
    tekstFom = fom,
    tekstTom = tom,
}: FravarValg): RSSporsmal => ({
    id,
    tag: 'FRAVAR_FOR_SYKMELDINGEN',
    sporsmalstekst: `Var du syk og borte fra jobb før du ble sykmeldt, i perioden ${formatterPeriode(tekstFom, tekstTom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: narId,
            tag: 'FRAVAR_FOR_SYKMELDINGEN_NAR',
            sporsmalstekst: `Hvilke dager var du syk og borte fra jobb, før du ble sykmeldt? Du trenger bare oppgi dager før ${formatterDato(fom)}.`,
            undertekst: null,
            svartype: 'PERIODER',
            min: narMin,
            max: narMax,
            kriterieForVisningAvUndersporsmal: null,
            svar: narSvar,
            undersporsmal: [],
        },
    ],
})

export const fravarForSykmeldingenV2 = ({
    fom,
    id = '687452',
    svar = [],
}: Pick<FravarValg, 'fom' | 'id' | 'svar'>): RSSporsmal => ({
    id,
    tag: 'FRAVAR_FOR_SYKMELDINGEN_V2',
    sporsmalstekst: `Var du borte fra jobb i fire uker eller mer rett før du ble sykmeldt ${formatterDato(fom)}?`,
    undertekst: 'Gjelder sammenhengende fravær gjennom alle fire ukene.',
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
