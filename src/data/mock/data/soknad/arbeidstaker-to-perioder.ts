import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'

export const arbeidstakerToPerioder: RSSoknad = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: '2020-04-01',
    tom: '2020-04-30',
    opprettetDato: '2020-05-01',
    inntektskilderDataFraInntektskomponenten: [],
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-04-01',
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: {
        navn: 'Testbedriften AS',
        orgnummer: '123456789',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-04-01',
            tom: '2020-04-15',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
        {
            fom: '2020-04-16',
            tom: '2020-04-30',
            grad: 60,
            sykmeldingstype: 'GRADERT',
        },
    ],
    sporsmal: [
        {
            id: 'to-perioder-ansvar',
            tag: 'ANSVARSERKLARING',
            sporsmalstekst: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
