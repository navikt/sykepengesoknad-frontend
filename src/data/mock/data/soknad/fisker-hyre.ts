import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { RSFiskerBlad } from '../../../../types/rs-types/rs-fiskerblad'
import { RSFiskerLottOgHyre } from '../../../../types/rs-types/rs-fiskerlottoghyre'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiverNavn = 'Rederiet AS'

const standardSporsmal = (arbeidsgiver?: string) => [
    ansvarserklaring(),
    tilbakeIArbeid({ fom, tom, tekstvariant: 'arbeidstaker', arbeidsgiver }),
    ferieV2({ fom, tom }),
    permisjonV2({ fom, tom }),
    arbeidUnderveis100Prosent({ fom, tom, tekstvariant: 'arbeidstaker', arbeidsgiver }),
    andreInntektskilderV2(),
    oppholdUtenforEos({ fom, tom }),
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
    fiskerBlad: RSFiskerBlad.B,
    fiskerLottOgHyre: RSFiskerLottOgHyre.HYRE,
}

export const fiskerHyre: RSSoknad = {
    id: 'e641fcab-723d-4393-b8e8-5da340d65421',
    ...soknadData,
    opprettetDato: '2020-06-13',
    sporsmal: [...standardSporsmal(), oppsummering()],
}

export const fiskerHyreMedArbeidsgiver: RSSoknad = {
    id: 'e641fcab-723d-4393-b8e8-5da340d65422',
    ...soknadData,
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '974654450' },
    opprettetDato: '2020-06-13',
    sporsmal: [...standardSporsmal(arbeidsgiverNavn), oppsummering()],
}
