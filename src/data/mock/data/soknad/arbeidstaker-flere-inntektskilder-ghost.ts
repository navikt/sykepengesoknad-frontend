import { RSKilde, RSKjentInntektskilde } from '../../../../types/rs-types/rs-kjenteinntektskilder'
import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { flereInntektskilderGhost } from '../sporsmal/flere-inntektskilder-ghost'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { arbeidstaker100Syk } from '../sykmeldinger'

const fom = '2020-04-01'
const tom = '2020-05-24'
const arbeidsgiverNavn = 'Posten Norge AS, Bærum'

const ghostInntekter: RSKjentInntektskilde[] = [
    { navn: 'Ruter', orgnummer: '222', kilde: RSKilde.INNTEKTSKOMPONENTEN },
    { navn: 'Blomsterbutikken AS', orgnummer: '111', kilde: RSKilde.INNTEKTSKOMPONENTEN },
    {
        navn: 'Bensinstasjonen med det veldig lange navnet, Stavanger (ved det røde huset som ligger ved Shell)',
        orgnummer: '333',
        kilde: RSKilde.INNTEKTSKOMPONENTEN,
    },
]

export const arbeidstakerFlereInntektskilderGhost: RSSoknad = {
    id: 'd9ac193d-9b67-4a51-80c2-fe4289214978',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-06-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '974654458' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring({}),
        tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn }),
        ferieV2({ fom, tom }),
        permisjonV2({ fom, tom }),
        arbeidUnderveis100Prosent({ fom, tom, arbeidsgiver: arbeidsgiverNavn }),
        flereInntektskilderGhost(),
        oppholdUtenforEos({ fom, tom }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
    ghostInntekter,
}
