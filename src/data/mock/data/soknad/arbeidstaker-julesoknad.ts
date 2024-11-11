import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'

export const arbeidstakerJulesoknad: RSSoknad = {
    id: '6e60c42e-ff62-4806-92b0-deade6f9fc69',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: '2024-12-01',
    tom: '2024-12-31',
    opprettetDato: '2024-11-30',
    inntektskilderDataFraInntektskomponenten: [],
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2024-12-01',
    sykmeldingUtskrevet: '2024-11-30',
    arbeidsgiver: {
        navn: 'Posten Norge AS, Bærum',
        orgnummer: '974654458',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2024-12-01',
            tom: '2024-12-31',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        {
            id: '687336',
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
        {
            id: '687341',
            tag: 'TILBAKE_I_ARBEID',
            sporsmalstekst:
                'Var du tilbake i fullt arbeid hos Posten Norge AS, Bærum i løpet av perioden 1. - 31.desember 2024?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '687342',
                    tag: 'TILBAKE_NAR',
                    sporsmalstekst: 'Når begynte du å jobbe igjen?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: '2024-12-01',
                    max: '2024-12-31',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
    julesoknad: true,
}
