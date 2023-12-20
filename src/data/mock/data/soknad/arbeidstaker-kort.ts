import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { nyVærKlarOverAt } from '../sporsmal/vaer-klar-over-at'

export const kortArbeidstakerSoknad: RSSoknad = {
    id: 'faba11f5-c4f2-4647-8c8a-347843747',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: '2022-04-01',
    tom: '2022-04-24',
    opprettetDato: '2022-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2022-04-01',
    sykmeldingUtskrevet: '2022-03-31',
    arbeidsgiver: {
        navn: 'Posten Norge AS, Bærum',
        orgnummer: '974654458',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2022-04-01',
            tom: '2022-04-24',
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        {
            id: '687336',
            tag: 'ANSVARSERKLARING',
            sporsmalstekst:
                'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
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
        nyVærKlarOverAt(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
