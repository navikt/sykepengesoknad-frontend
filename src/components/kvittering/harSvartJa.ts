import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import { TagTyper } from '../../types/enums'

export function harSvartJaJobbetDuUnderveis(soknad: Soknad) {
    if (soknad.soknadstype != RSSoknadstype.ARBEIDSTAKERE) {
        return false
    }
    const spm = soknad.sporsmal.find(
        (s) => s.tag == TagTyper.JOBBET_DU_100_PROSENT || s.tag == TagTyper.JOBBET_DU_GRADERT,
    )
    if (!spm) {
        return false
    }
    if (spm.svarliste.svar.length == 1) {
        return spm.svarliste.svar[0].verdi == 'JA'
    }
    return false
}

export function harSvartJaFravaerForSykmeldingen(soknad: Soknad) {
    if (soknad.soknadstype != RSSoknadstype.ARBEIDSTAKERE) {
        return false
    }
    const spm = soknad.sporsmal.find((s) => s.tag == TagTyper.FRAVAR_FOR_SYKMELDINGEN)
    if (!spm) {
        return false
    }
    if (spm.svarliste.svar.length == 1) {
        return spm.svarliste.svar[0].verdi == 'JA'
    }
    return false
}
