import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidsledig100Syk } from '../sykmeldinger'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { friskmeldt } from '../sporsmal/friskmeldt'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'

const fom = '2020-04-01'
const tom = '2020-04-24'
export const arbeidsledig: RSSoknad = {
    id: '934f39f4-cb47-459f-8209-0dbef6d30059',
    sykmeldingId: arbeidsledig100Syk.id,
    soknadstype: 'ARBEIDSLEDIG',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: null,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSLEDIG',
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring(),
        friskmeldt({ fom, tom }),
        andreInntektskilder({ fom, tom }),
        oppholdUtenforEos({ fom, tom }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
