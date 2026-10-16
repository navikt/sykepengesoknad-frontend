import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { arbeidstaker100Syk } from '../sykmeldinger'

const fom = '2022-04-01'
const tom = '2022-04-24'
const arbeidsgiverNavn = 'Posten Norge AS, Bærum'

export const kortArbeidstakerSoknad: RSSoknad = {
    id: 'faba11f5-c4f2-4647-8c8a-347843747',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2022-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: '2022-03-31',
    arbeidsgiver: {
        navn: arbeidsgiverNavn,
        orgnummer: '974654458',
    },
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
    sporsmal: [
        ansvarserklaring({ id: '687336' }),
        tilbakeIArbeid({ fom, tom, arbeidsgiver: arbeidsgiverNavn, id: '900', tilbakeNarId: '96' }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
