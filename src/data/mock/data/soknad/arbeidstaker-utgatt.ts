import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { arbeidstaker100Syk } from '../sykmeldinger'

const fom = '2020-05-23'
const tom = '2020-06-07'
const arbeidsgiverNavn = 'Nordlys Regnskap AS'

export const utgattSoknad: RSSoknad = {
    id: '5b74f271-5b94-455a-b79f-428f593f2b90',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'UTGAATT',
    fom,
    tom,
    opprettetDato: '2020-06-08',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: fom,
    arbeidsgiver: { navn: arbeidsgiverNavn, orgnummer: '995816598' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom,
            tom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [ansvarserklaring({}), tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn }), oppsummering()],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
