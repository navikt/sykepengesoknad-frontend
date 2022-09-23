import { TagTyper } from '../../types/enums'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'

export function harSvartJaPåAndreInntektskilder(soknad: Soknad) {
    if (soknad.soknadstype != RSSoknadstype.ARBEIDSTAKERE) {
        return false
    }
    const spm = soknad.sporsmal.find((s) => s.tag == TagTyper.ANDRE_INNTEKTSKILDER)
    if (!spm) {
        return false
    }
    if (spm.svarliste.svar.length == 1) {
        return spm.svarliste.svar[0].verdi == 'JA'
    }
    return false
}
