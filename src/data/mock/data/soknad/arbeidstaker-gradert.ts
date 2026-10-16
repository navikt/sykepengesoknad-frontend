import { RSKilde, RSKjentInntektskilde } from '../../../../types/rs-types/rs-kjenteinntektskilder'
import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { jobbetDuGradert } from '../sporsmal/jobbet-du-gradert'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { arbeidstaker50Syk } from '../sykmeldinger'

const fom = '2020-04-01'
const tom = '2020-05-10'
const gradertTom = '2020-04-24'
const arbeidsgiverNavn = 'Posten Norge AS, Bærum'

const ghostInntekter: RSKjentInntektskilde[] = [
    { navn: 'Ruter', orgnummer: '222', kilde: RSKilde.INNTEKTSKOMPONENTEN },
    { navn: 'Blomsterbutikken', orgnummer: '111', kilde: RSKilde.INNTEKTSKOMPONENTEN },
    {
        navn: 'Bensinstasjonen med det veldig lange navnet, Stavanger (ved det røde huset som ligger ved Shell)',
        orgnummer: '333',
        kilde: RSKilde.INNTEKTSKOMPONENTEN,
    },
]

export const arbeidstakerGradert: RSSoknad = {
    id: '5b769c04-e171-47c9-b79b-23ab8fce331e',
    sykmeldingId: arbeidstaker50Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '974654458' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        { fom, tom: gradertTom, grad: 50, sykmeldingstype: 'GRADERT' },
        { fom: '2020-04-25', tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' },
    ],
    sporsmal: [
        ansvarserklaring({ id: '687291' }),
        tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn, id: '687302', tilbakeNarId: '687303' }),
        ferieV2({ fom, tom, id: '687304', ferieNarId: '687305' }),
        permisjonV2({ fom, tom, id: '687306', permisjonNarId: '687307' }),
        jobbetDuGradert({ fom, tom: gradertTom, arbeidsgiver: arbeidsgiverNavn, grad: 50 }),
        arbeidUtenforNorge({ id: '687310' }),
        andreInntektskilderV2(),
        oppholdUtenforEos({ fom, tom, id: '687308', oppholdNarId: '687309' }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
    ghostInntekter,
}
