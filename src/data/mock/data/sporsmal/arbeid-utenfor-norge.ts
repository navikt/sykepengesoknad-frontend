import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'

type ArbeidUtenforNorgeValg = {
    readonly id?: string
    readonly svar?: RSSvar[]
}

export const arbeidUtenforNorge = ({ id = '687310', svar = [] }: ArbeidUtenforNorgeValg = {}): RSSporsmal => ({
    id,
    tag: 'ARBEID_UTENFOR_NORGE',
    sporsmalstekst: 'Har du arbeidet i utlandet i løpet av de siste 12 månedene?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
