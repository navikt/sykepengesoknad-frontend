import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { værKlarOverAt } from '../sporsmal/vaer-klar-over-at'
import { bekreftOpplysninger } from '../sporsmal/bekreft-opplysninger'

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
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        værKlarOverAt(),
        bekreftOpplysninger(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}