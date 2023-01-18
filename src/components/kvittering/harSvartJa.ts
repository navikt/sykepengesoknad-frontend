import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'

export function erArbeidstakersoknad(soknad: Soknad) {
    return soknad.soknadstype == RSSoknadstype.ARBEIDSTAKERE
}
