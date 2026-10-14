import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

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
export type InntektskildeTag = (typeof inntektskildeTagger)[number]
type Kilde = {
    readonly tag: InntektskildeTag
    readonly id?: string
    readonly erDuSykmeldtId?: string
    readonly sporsmalstekst?: string
    readonly svar?: RSSvar[]
    readonly erDuSykmeldtSvar?: RSSvar[]
    readonly harOppfolging?: boolean
}
type AndreInntektskilderValg = {
    readonly fom: string
    readonly tom: string
    readonly id?: string
    readonly gruppeId?: string
    readonly kilder?: readonly Kilde[]
    readonly sporsmalstekst?: string
    readonly gruppeTekst?: string
    readonly svar?: RSSvar[]
    readonly gruppeSvar?: RSSvar[]
}

const standardKilder: readonly Kilde[] = [
    { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD', id: '687404', erDuSykmeldtId: '687405' },
    { tag: 'INNTEKTSKILDE_SELVSTENDIG', id: '687406', erDuSykmeldtId: '687407' },
    { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA', id: '687408', erDuSykmeldtId: '687409' },
    { tag: 'INNTEKTSKILDE_JORDBRUKER', id: '687410', erDuSykmeldtId: '687411' },
    { tag: 'INNTEKTSKILDE_FRILANSER', id: '687412', erDuSykmeldtId: '687413' },
    { tag: 'INNTEKTSKILDE_OMSORGSLONN', id: '687414', erDuSykmeldtId: '687415' },
    { tag: 'INNTEKTSKILDE_FOSTERHJEM', id: '687416', erDuSykmeldtId: '687417' },
    { tag: 'INNTEKTSKILDE_ANNET', id: '687418' },
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
    id = '687402',
    gruppeId = '687403',
    kilder = standardKilder,
    sporsmalstekst = `Har du hatt inntekt mens du har vært sykmeldt i perioden ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
    gruppeTekst = 'Hvilke inntektskilder har du hatt?',
    svar = [],
    gruppeSvar = [],
}: AndreInntektskilderValg): RSSporsmal => ({
    id,
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
            id: gruppeId,
            tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
            sporsmalstekst: gruppeTekst,
            undertekst: null,
            svartype: 'CHECKBOX_GRUPPE',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: gruppeSvar,
            undersporsmal: kilder.map((kilde, index) => {
                const harOppfolging = kilde.harOppfolging ?? kilde.tag !== 'INNTEKTSKILDE_ANNET'
                const oppfolgingsTagg = `${kilde.tag}_ER_DU_SYKMELDT`
                return {
                    id: kilde.id ?? `6874${index + 4}`,
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
                                  id: kilde.erDuSykmeldtId ?? `6875${index}`,
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
