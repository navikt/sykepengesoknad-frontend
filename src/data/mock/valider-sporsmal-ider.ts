import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSporsmal } from '../../types/rs-types/rs-sporsmal'

const alleSporsmal = (sporsmal: RSSporsmal[]): RSSporsmal[] =>
    sporsmal.flatMap((spm) => [spm, ...alleSporsmal(spm.undersporsmal)])

export function validerSporsmalIder(soknad: RSSoknad): void {
    const ider = new Set<string>()
    alleSporsmal(soknad.sporsmal).forEach((spm) => {
        if (ider.has(spm.id)) {
            throw new Error(`Søknad ${soknad.id} har flere spørsmål med id ${spm.id} (${spm.tag})`)
        }
        ider.add(spm.id)
    })
}
