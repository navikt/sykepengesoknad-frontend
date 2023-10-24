import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

export function harSvartJaArbeidUtenforNorge(soknad: Soknad) {
    return (
        soknad.sporsmal
            .find((spm) => spm.tag === 'ARBEID_UTENFOR_NORGE')
            ?.svarliste.svar.find((svar) => svar.verdi === 'JA') !== undefined
    )
}

export function erArbeidstakerSoknad(soknad: Soknad) {
    return soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
}
