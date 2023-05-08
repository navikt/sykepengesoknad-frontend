import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

import { arbeidstaker100Syk } from './sykmeldinger'
import { bekreftOpplysninger } from './sporsmal/bekreft-opplysninger'

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
        navn: 'POSTEN NORGE AS, BÆRUM',
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
        bekreftOpplysninger(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

export const kortFomTomArbeidstakerSoknad = jsonDeepCopy(kortArbeidstakerSoknad)
kortFomTomArbeidstakerSoknad.fom = '2022-04-01'
kortFomTomArbeidstakerSoknad.tom = '2022-04-10'
kortFomTomArbeidstakerSoknad.opprettetDato = '2022-04-01'
kortFomTomArbeidstakerSoknad.startSykeforlop = '2022-03-15'
kortFomTomArbeidstakerSoknad.sykmeldingUtskrevet = '2022-03-31'
kortFomTomArbeidstakerSoknad.opprettetAvInntektsmelding = true
kortFomTomArbeidstakerSoknad.soknadPerioder = [
    { fom: '2022-04-01', tom: '2022-04-10', grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' },
]

export const egenmeldingsdagerArbeidsgiver = {
    soknader: [kortFomTomArbeidstakerSoknad],
    sykmeldinger: [arbeidstaker100Syk],
}
