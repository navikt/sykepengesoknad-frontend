import { RSSoknad } from '../../types/rs-types/rs-soknad'

export function validerSoknadsperiode(soknad: RSSoknad): void {
    if (!soknad.fom || !soknad.tom || !soknad.soknadPerioder || soknad.soknadPerioder.length === 0) {
        return
    }

    const minFom = [...soknad.soknadPerioder].sort((a, b) => a.fom.localeCompare(b.fom))[0].fom
    const maxTom = [...soknad.soknadPerioder].sort((a, b) => b.tom.localeCompare(a.tom))[0].tom

    if (soknad.fom !== minFom || soknad.tom !== maxTom) {
        throw new Error(
            `Søknad ${soknad.id} har periode (${soknad.fom} - ${soknad.tom}) som ikke samsvarer med søknadsperiodene (${minFom} - ${maxTom})`,
        )
    }
}
