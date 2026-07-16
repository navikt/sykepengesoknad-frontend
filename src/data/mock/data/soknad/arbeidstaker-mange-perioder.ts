import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'

export const arbeidstakerMangePerioder: RSSoknad = {
    id: 'f8a3c2d1-9e47-4b52-8c0f-1234567890ab',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: '2020-01-01',
    tom: '2020-04-30',
    opprettetDato: '2020-05-01',
    inntektskilderDataFraInntektskomponenten: [],
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-01-01',
    sykmeldingUtskrevet: '2019-12-31',
    arbeidsgiver: {
        navn: 'Testbedriften AS',
        orgnummer: '123456789',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-01-01',
            tom: '2020-01-24',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
        {
            fom: '2020-01-25',
            tom: '2020-02-14',
            grad: 60,
            sykmeldingstype: 'GRADERT',
        },
        {
            fom: '2020-02-15',
            tom: '2020-03-06',
            grad: 80,
            sykmeldingstype: 'GRADERT',
        },
        {
            fom: '2020-03-07',
            tom: '2020-04-30',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        {
            id: 'mange-perioder-ansvar',
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
