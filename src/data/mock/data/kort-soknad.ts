import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

import { arbeidstaker100Syk } from './sykmeldinger'

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
        {
            id: '687369',
            tag: 'UTDANNING',
            sporsmalstekst: 'Er søknaden kort nok?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '687372',
            tag: 'VAER_KLAR_OVER_AT',
            sporsmalstekst: 'Viktig å være klar over:',
            undertekst:
                "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href='https://www.nav.no/sykepenger' target='_blank'>nav.no/sykepenger</a>.</p>",
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '687373',
            tag: 'BEKREFT_OPPLYSNINGER',
            sporsmalstekst:
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
    egenmeldtSykmelding: false,
}

export const kortFomTomArbeidstakerSoknad = jsonDeepCopy(kortArbeidstakerSoknad)
kortFomTomArbeidstakerSoknad.fom = '2022-04-01'
kortFomTomArbeidstakerSoknad.tom = '2022-04-10'
kortFomTomArbeidstakerSoknad.opprettetDato = '2022-04-01'
kortFomTomArbeidstakerSoknad.startSykeforlop = '2022-03-15'
kortFomTomArbeidstakerSoknad.sykmeldingUtskrevet = '2022-03-31'
kortFomTomArbeidstakerSoknad.egenmeldingsdagerArbeidsgiver = true
kortFomTomArbeidstakerSoknad.soknadPerioder = [
    { fom: '2022-04-01', tom: '2022-04-10', grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' },
]

export const egenmeldingsdagerArbeidsgiver = {
    soknader: [kortFomTomArbeidstakerSoknad],
    sykmeldinger: [arbeidstaker100Syk],
}
