import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import {
    naringsdrivendeNyIArbeidslivet,
    naringsdrivendeVarigEndring,
    naringsdrivendeVirksomhetenAvviklet,
} from '../sporsmal/naringsdrivende'
import { fiskerLottOpprettholdtInntekt } from '../sporsmal/fisker-lott-opprettholdt-inntekt'

const fom = '2020-04-01'
const tom = '2020-04-24'

const standardSporsmal = [
    ansvarserklaring(),
    tilbakeIArbeid({ fom, tom, tekstvariant: 'fisker' }),
    ferieV2({ fom, tom }),
    permisjonV2({ fom, tom }),
    arbeidUnderveis100Prosent({ fom, tom, tekstvariant: 'fisker' }),
    fiskerLottOpprettholdtInntekt(),
    andreInntektskilderV2(),
    oppholdUtenforEos({ fom, tom }),
    naringsdrivendeVirksomhetenAvviklet(),
    naringsdrivendeNyIArbeidslivet(),
    naringsdrivendeVarigEndring(),
]

const soknadData = {
    sykmeldingId: '7cbdefcc-0969-4da1-97b3-5989fbf89c68',
    soknadstype: 'FISKERE' as const,
    status: 'NY' as const,
    fom,
    tom,
    opprettetDato: '2020-05-13',
    inntektskilderDataFraInntektskomponenten: [],
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: null,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'FISKER' as const,
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' as const }],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

export const fiskerLottOgHyre: RSSoknad = {
    id: '0aa459e0-d187-4382-ab99-1d9192bab8be',
    ...soknadData,
    opprettetDato: '2020-06-13',
    sporsmal: [...standardSporsmal, oppsummering()],
}
