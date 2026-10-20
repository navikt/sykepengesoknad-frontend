import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstakerReisetilskuddSyk } from '../sykmeldinger'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { kvitteringer } from '../sporsmal/kvitteringer'
import { oppsummering } from '../sporsmal/oppsummering'
import { reiseMedBil } from '../sporsmal/reise-med-bil'
import { transportTilDaglig } from '../sporsmal/transport-til-daglig'
import { utbetaling } from '../sporsmal/utbetaling'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiver = { navn: 'SAUEFABRIKK', orgnummer: '896929119' }

export const nyttReisetilskudd: RSSoknad = {
    id: '5294bdbd-38a2-4d2a-9917-0fcaf6cf205a',
    sykmeldingId: arbeidstakerReisetilskuddSyk.id,
    soknadstype: 'REISETILSKUDD',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2021-09-09',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: fom,
    arbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [{ fom, tom, grad: 0, sykmeldingstype: 'REISETILSKUDD' }],
    sporsmal: [
        ansvarserklaring({}),
        transportTilDaglig(),
        reiseMedBil({ fom, tom }),
        kvitteringer({ fom, tom }),
        utbetaling(),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
