import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterDato, formatterPeriode } from './backend-datoformat'

type TilbakeIArbeidValgFelles = {
    readonly fom: string
    readonly tom: string
    readonly id?: string
    readonly svar?: RSSvar[]
    readonly tilbakeNarId?: string
    readonly tilbakeNarSvar?: RSSvar[]
    readonly sporsmalstekst?: string
    readonly tilbakeNarTekst?: string
}

type TilbakeIArbeidValg =
    | (TilbakeIArbeidValgFelles & {
          readonly arbeidsgiver: string
          readonly tekstvariant?: 'arbeidstaker'
      })
    | (TilbakeIArbeidValgFelles & {
          readonly arbeidsgiver?: never
          readonly tekstvariant: 'frilanser' | 'selvstendigNaeringsdrivende'
      })

export const tilbakeIArbeid = (valg: TilbakeIArbeidValg): RSSporsmal => {
    const {
        fom,
        tom,
        id = '687341',
        svar = [],
        tilbakeNarId = '687342',
        tilbakeNarSvar = [],
        sporsmalstekst,
        tilbakeNarTekst = 'Når begynte du å jobbe igjen?',
    } = valg
    const tekstvariant = valg.tekstvariant ?? 'arbeidstaker'
    const standardSporsmalstekst =
        tekstvariant === 'arbeidstaker'
            ? `Var du tilbake i fullt arbeid hos ${valg.arbeidsgiver} i løpet av perioden ${formatterPeriode(fom, tom)}?`
            : tekstvariant === 'frilanser'
              ? `Var du tilbake i fullt arbeid som frilanser før sykmeldingsperioden utløp ${formatterDato(tom)}?`
              : `Var du tilbake i fullt arbeid som selvstendig næringsdrivende før sykmeldingsperioden utløp ${formatterDato(tom)}?`

    return {
        id,
        tag: 'TILBAKE_I_ARBEID',
        sporsmalstekst: sporsmalstekst ?? standardSporsmalstekst,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar,
        undersporsmal: [
            {
                id: tilbakeNarId,
                tag: 'TILBAKE_NAR',
                sporsmalstekst: tilbakeNarTekst,
                undertekst: null,
                svartype: 'DATO',
                min: fom,
                max: tom,
                kriterieForVisningAvUndersporsmal: null,
                svar: tilbakeNarSvar,
                undersporsmal: [],
            },
        ],
    }
}
