import { format, subDays } from 'date-fns'

import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { now } from '../../../../utils/dato-utils'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { egenmeldinger } from '../sporsmal/egenmeldinger'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { jobbetDuGradert } from '../sporsmal/jobbet-du-gradert'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { arbeidstaker100Syk } from '../sykmeldinger'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiverNavn = '995816598 sitt orgnavn :)'

export const avbruttSoknad: RSSoknad = {
    id: '811d15b2-2a76-4623-9530-1ba55617e0a5',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'AVBRUTT',
    fom,
    tom,
    opprettetDato: format(subDays(now(), 1), 'yyyy-MM-dd'),
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: '2020-06-12',
    startSykeforlop: '2020-05-20',
    sykmeldingUtskrevet: '2020-05-27',
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '995816598' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [{ fom: '2020-05-20', tom: '2020-06-05', grad: 80, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring({ id: '84' }),
        egenmeldinger({
            fom: '2020-05-04',
            tom: '2020-05-19',
            sykmeldtDato: '2020-05-20',
            min: '2019-11-20',
            max: '2020-05-19',
        }),
        tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn, id: '95', tilbakeNarId: '96' }),
        ferieV2({ fom, tom, id: '97', ferieNarId: '98' }),
        permisjonV2({ fom, tom, id: '99', permisjonNarId: '100' }),
        jobbetDuGradert({
            fom,
            tom,
            arbeidsgiver: arbeidsgiverNavn,
            grad: 20,
            prosentMin: '21',
        }),
        arbeidUtenforNorge({ id: '103' }),
        andreInntektskilderV2(),
        oppholdUtenforEos({ fom, tom, id: '101', oppholdNarId: '102' }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
