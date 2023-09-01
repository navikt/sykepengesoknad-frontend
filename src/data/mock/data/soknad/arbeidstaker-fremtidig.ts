import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'

export const fremtidigSoknad: RSSoknad = {
    id: '5b74f271-5b94-455a-b79f-428f593f2b99',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'FREMTIDIG',
    fom: '3020-05-23',
    tom: '3020-06-07',
    opprettetDato: '2020-06-08',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '3020-05-23',
    sykmeldingUtskrevet: '2020-05-23',
    arbeidsgiver: {
        navn: 'Posten Norge AS, Bærum',
        orgnummer: '974654458',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '3020-05-23',
            tom: '3020-06-07',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
