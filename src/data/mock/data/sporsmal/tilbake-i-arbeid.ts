import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

type TilbakeIArbeidValg = {
    readonly fom: string
    readonly tom: string
    readonly arbeidsgiver?: string
    readonly tekstvariant?: 'arbeidstaker' | 'frilanser' | 'selvstendigNaeringsdrivende'
    readonly id?: string
    readonly svar?: RSSvar[]
    readonly tilbakeNarId?: string
    readonly tilbakeNarSvar?: RSSvar[]
    readonly sporsmalstekst?: string
    readonly tilbakeNarTekst?: string
}

export const tilbakeIArbeid = ({
    fom,
    tom,
    arbeidsgiver,
    tekstvariant = 'arbeidstaker',
    id = '687341',
    svar = [],
    tilbakeNarId = '687342',
    tilbakeNarSvar = [],
    sporsmalstekst,
    tilbakeNarTekst = 'Når begynte du å jobbe igjen?',
}: TilbakeIArbeidValg): RSSporsmal => {
    const sporsmalstekster = {
        arbeidstaker: `Var du tilbake i fullt arbeid hos ${arbeidsgiver} i løpet av perioden ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
        frilanser: `Var du tilbake i fullt arbeid som frilanser før sykmeldingsperioden utløp ${tilLesbarDatoMedArstall(tom)}?`,
        selvstendigNaeringsdrivende: `Var du tilbake i fullt arbeid som selvstendig næringsdrivende før sykmeldingsperioden utløp ${tilLesbarDatoMedArstall(tom)}?`,
    } as const

    return {
        id,
        tag: 'TILBAKE_I_ARBEID',
        sporsmalstekst: sporsmalstekst ?? sporsmalstekster[tekstvariant],
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
