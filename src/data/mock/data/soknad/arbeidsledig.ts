import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidsledig100Syk } from '../sykmeldinger'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { friskmeldt } from '../sporsmal/friskmeldt'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'

const fom = '2020-04-01'
const tom = '2020-04-24'
const sporsmal = () => [
    ansvarserklaring({ id: '687395' }),
    friskmeldt({ fom, tom, id: '687400', startId: '687401' }),
    andreInntektskilder({ fom, tom, id: '687402', gruppeId: '687403' }),
    oppholdUtenforEos({ fom, tom, id: '687422', oppholdNarId: '687423' }),
    oppsummering(),
]
const lagArbeidsledigSoknad = (id: string): RSSoknad => ({
    id,
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
    sporsmal: sporsmal(),
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
})

export const arbeidsledigMedNyOppholdUtenforESSporsmal = lagArbeidsledigSoknad('934f39f4-cb47-459f-8209-0dbef6d36059')
export const arbeidsledig = lagArbeidsledigSoknad('934f39f4-cb47-459f-8209-0dbef6d30059')
