import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidsgiverUtland } from '../sporsmal/arbeidsgiver-utland'
import { avklaringIfbmReise } from '../sporsmal/avklaring-ifbm-reise'
import { ferieUtland } from '../sporsmal/ferie-utland'
import { land } from '../sporsmal/land'
import { oppsummering } from '../sporsmal/oppsummering'
import { periodeUtland } from '../sporsmal/periodeutland'

const fom = null
const tom = null
const arbeidsgiver = null
const oppholdFom = '2020-03-03'
const oppholdTom = '2020-12-31'

export const oppholdUtland: RSSoknad = {
    id: 'b9d67b0d-b1f8-44a5-bcbd-6010b60b90ce',
    sykmeldingId: null,
    soknadstype: 'OPPHOLD_UTLAND',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-06-03',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: null,
    sykmeldingUtskrevet: null,
    arbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: null,
    soknadPerioder: [],
    sporsmal: [
        land(),
        periodeUtland({ fom: oppholdFom, tom: oppholdTom }),
        arbeidsgiverUtland({ undersporsmal: [ferieUtland()] }),
        avklaringIfbmReise(),
        oppsummering(),
    ],
    egenmeldtSykmelding: null,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
