import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterDato, formatterPeriode } from './backend-datoformat'

type FravarValg = {
    readonly fom: string
    readonly tom: string
    readonly narMin: string
    readonly narMax: string
    readonly svar?: RSSvar[]
    readonly tekstFom?: string
    readonly tekstTom?: string
}

export const fravarForSykmeldingen = ({
    fom,
    tom,
    narMin,
    narMax,
    svar = [],
    tekstFom = fom,
    tekstTom = tom,
}: FravarValg): RSSporsmal => ({
    id: '12345678',
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
            id: '1234567899',
            tag: 'FRAVAR_FOR_SYKMELDINGEN_NAR',
            sporsmalstekst: `Hvilke dager var du syk og borte fra jobb, før du ble sykmeldt? Du trenger bare oppgi dager før ${formatterDato(fom)}.`,
            undertekst: null,
            svartype: 'PERIODER',
            min: narMin,
            max: narMax,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
})

export const fravarForSykmeldingenV2 = ({ fom, svar = [] }: Pick<FravarValg, 'fom' | 'svar'>): RSSporsmal => ({
    id: '687452',
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
