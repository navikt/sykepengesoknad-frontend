import { Soknad } from '../types/types'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { RSArbeidssituasjon } from '../types/rs-types/rs-arbeidssituasjon'

const kanEttersendesTilArbeidsgiver = (soknad: Soknad): boolean =>
    soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE ||
    ((soknad.soknadstype === RSSoknadstype.BEHANDLINGSDAGER ||
        soknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) &&
        soknad.arbeidssituasjon === RSArbeidssituasjon.ARBEIDSTAKER)

export const skalViseSendTilArbeidsgiver = (soknad: Soknad): boolean =>
    soknad.arbeidsgiver !== undefined &&
    soknad.sendtTilArbeidsgiverDato === undefined &&
    kanEttersendesTilArbeidsgiver(soknad)
