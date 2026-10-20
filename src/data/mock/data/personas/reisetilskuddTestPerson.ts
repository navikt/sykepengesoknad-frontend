import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'
import { arbeidstakerReisetilskuddSyk, sykmeldinger } from '../sykmeldinger'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { kvitteringer } from '../sporsmal/kvitteringer'
import { oppsummering } from '../sporsmal/oppsummering'
import { reiseMedBil } from '../sporsmal/reise-med-bil'
import { transportTilDaglig } from '../sporsmal/transport-til-daglig'
import { utbetaling } from '../sporsmal/utbetaling'
import { nyttReisetilskudd } from '../soknad/arbeidstaker-reisetilskudd'

import { Persona } from './personas'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiver = { navn: 'SAUEFABRIKK', orgnummer: '896929119' }

export const delvisUtfyltReisetilskudd: RSSoknad = {
    id: 'a992fd26-3452-41e6-b76e-8bc6d352a0fa',
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
        ansvarserklaring({ svar: [{ verdi: 'CHECKED' }] }),
        transportTilDaglig({ svar: [{ verdi: 'NEI' }] }),
        reiseMedBil({ fom, tom, svar: [{ verdi: 'NEI' }] }),
        kvitteringer({ fom, tom }),
        utbetaling({ svar: [{ verdi: 'NEI' }] }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

export const feilVedSlettingAvKvittering: RSSoknad = jsonDeepCopy(nyttReisetilskudd)
feilVedSlettingAvKvittering.id = 'd4ce1c57-1f91-411b-ab64-beabbba29b65'

export const reisetilskuddTestPerson: Persona = {
    soknader: [delvisUtfyltReisetilskudd, feilVedSlettingAvKvittering],
    sykmeldinger,
    beskrivelse: 'Reisetilskudd som er delvis utfylt og reisetilskudd som feiler på sletting av kvittering',
}
