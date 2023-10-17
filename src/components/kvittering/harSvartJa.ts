import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { TagTyper } from '../../types/enums'

export function harSvartJaArbeidUtenforNorge(soknad: Soknad) {
    return (
        soknad.sporsmal
            .find((spm) => spm.tag === TagTyper.ARBEID_UTENFOR_NORGE)
            ?.svarliste.svar.find((svar) => svar.verdi === 'JA') !== undefined
    )
}

export function erArbeidstakerSoknad(soknad: Soknad) {
    return soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
}
