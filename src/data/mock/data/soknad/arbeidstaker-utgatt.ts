import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { oppsummering } from '../sporsmal/oppsummering'

export const utgattSoknad: RSSoknad = {
    id: '5b74f271-5b94-455a-b79f-428f593f2b90',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'UTGAATT',
    fom: '2020-05-23',
    tom: '2020-06-07',
    opprettetDato: '2020-06-08',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-05-23',
    sykmeldingUtskrevet: '2020-05-23',
    arbeidsgiver: { navn: '995816598 sitt orgnavn :)', orgnummer: '995816598' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2020-05-23',
            tom: '2020-06-07',
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
            id: '900',
            tag: 'TILBAKE_I_ARBEID',
            sporsmalstekst:
                'Var du tilbake i fullt arbeid hos Posten Norge AS, Bærum i løpet av perioden 20. mai - 5. juni 2020?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '96',
                    tag: 'TILBAKE_NAR',
                    sporsmalstekst: 'Når begynte du å jobbe igjen?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: '2020-05-20',
                    max: '2020-06-05',
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
}
