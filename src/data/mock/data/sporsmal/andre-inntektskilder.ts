import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './utils/backend-datoformat'

export const inntektskildeTagger = [
    'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
    'INNTEKTSKILDE_SELVSTENDIG',
    'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
    'INNTEKTSKILDE_JORDBRUKER',
    'INNTEKTSKILDE_FRILANSER',
    'INNTEKTSKILDE_OMSORGSLONN',
    'INNTEKTSKILDE_FOSTERHJEM',
    'INNTEKTSKILDE_ANNET',
    'INNTEKTSKILDE_ARBEIDSFORHOLD',
    'INNTEKTSKILDE_FRILANSER_SELVSTENDIG',
] as const
type InntektskildeTag = (typeof inntektskildeTagger)[number]
type Kilde = {
    readonly tag: InntektskildeTag
    readonly sporsmalstekst?: string
    readonly svar?: RSSvar[]
    readonly erDuSykmeldtSvar?: RSSvar[]
    readonly harOppfolging?: boolean
}
type AndreInntektskilderValg = {
    readonly fom: string
    readonly tom: string
    readonly kilder?: readonly Kilde[]
    readonly sporsmalstekst?: string
    readonly gruppeTekst?: string
    readonly svar?: RSSvar[]
}

const standardKilder: readonly Kilde[] = [
    { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD' },
    { tag: 'INNTEKTSKILDE_SELVSTENDIG' },
    { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA' },
    { tag: 'INNTEKTSKILDE_JORDBRUKER' },
    { tag: 'INNTEKTSKILDE_FRILANSER' },
    { tag: 'INNTEKTSKILDE_OMSORGSLONN' },
    { tag: 'INNTEKTSKILDE_FOSTERHJEM' },
    { tag: 'INNTEKTSKILDE_ANNET' },
]
const tekster: Record<InntektskildeTag, string> = {
    INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD: 'andre arbeidsforhold',
    INNTEKTSKILDE_SELVSTENDIG: 'selvstendig næringsdrivende',
    INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA: 'dagmamma',
    INNTEKTSKILDE_JORDBRUKER: 'jordbruk / fiske / reindrift',
    INNTEKTSKILDE_FRILANSER: 'frilanser',
    INNTEKTSKILDE_OMSORGSLONN: 'kommunal omsorgstønad',
    INNTEKTSKILDE_FOSTERHJEM: 'fosterhjemgodtgjørelse',
    INNTEKTSKILDE_ANNET: 'annet',
    INNTEKTSKILDE_ARBEIDSFORHOLD: 'arbeidsforhold',
    INNTEKTSKILDE_FRILANSER_SELVSTENDIG: 'frilanser',
}
export const andreInntektskilder = ({
    fom,
    tom,
    kilder = standardKilder,
    sporsmalstekst = `Har du hatt inntekt mens du har vært sykmeldt i perioden ${formatterPeriode(fom, tom)}?`,
    gruppeTekst = 'Hvilke inntektskilder har du hatt?',
    svar = [],
}: AndreInntektskilderValg): RSSporsmal => ({
    id: '687402',
    tag: 'ANDRE_INNTEKTSKILDER',
    sporsmalstekst,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687403',
            tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
            sporsmalstekst: gruppeTekst,
            undertekst: null,
            svartype: 'CHECKBOX_GRUPPE',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: kilder.map((kilde, index) => {
                const harOppfolging = kilde.harOppfolging ?? kilde.tag !== 'INNTEKTSKILDE_ANNET'
                const oppfolgingsTagg = `${kilde.tag}_ER_DU_SYKMELDT`
                return {
                    id: String(687404 + index * 2),
                    tag: kilde.tag,
                    sporsmalstekst: kilde.sporsmalstekst ?? tekster[kilde.tag],
                    undertekst: null,
                    svartype: 'CHECKBOX',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: harOppfolging ? 'CHECKED' : null,
                    svar: kilde.svar ?? [],
                    undersporsmal: harOppfolging
                        ? [
                              {
                                  id: String(687405 + index * 2),
                                  tag: oppfolgingsTagg,
                                  sporsmalstekst: 'Er du sykmeldt fra dette?',
                                  undertekst: null,
                                  svartype: 'JA_NEI',
                                  min: null,
                                  max: null,
                                  kriterieForVisningAvUndersporsmal: null,
                                  svar: kilde.erDuSykmeldtSvar ?? [],
                                  undersporsmal: [],
                              },
                          ]
                        : [],
                }
            }),
        },
    ],
})
