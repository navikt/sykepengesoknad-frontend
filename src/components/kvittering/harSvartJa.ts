import { Soknad } from '../../types/types'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

function harInnektSelvstendigNaeringsdrivende(soknad: Soknad) {
    return (
        soknad.sporsmal
            .find(
                (spm) =>
                    spm.tag === 'ANDRE_INNTEKTSKILDER_V2' && spm.svarliste.svar.find((svar) => svar.verdi === 'JA'),
            )
            ?.undersporsmal?.find((spm) => spm.tag === 'HVILKE_ANDRE_INNTEKTSKILDER')
            ?.undersporsmal?.find(
                (spm) =>
                    spm.tag === 'INNTEKTSKILDE_SELVSTENDIG' &&
                    spm.svarliste.svar.find((svar) => svar.verdi === 'CHECKED'),
            ) !== undefined
    )
}

export function erSelvstendigNaeringsdrivende(soknad: Soknad, soknader: RSSoknadmetadata[]) {
    if (soknader.find((s) => s.soknadstype === 'SELVSTENDIGE_OG_FRILANSERE')) {
        return true
    }

    return harInnektSelvstendigNaeringsdrivende(soknad)
}
