import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { arbeidstakerBehandlingsdagSyk } from '../sykmeldinger'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { enkeltstaendeBehandlingsdager } from '../sporsmal/enkeltstaende-behandlingsdager'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppsummering } from '../sporsmal/oppsummering'

const fom = '2020-04-01'
const tom = '2020-04-24'

export const behandlingsdager: RSSoknad = {
    id: 'bcb032ac-b6dd-4ae7-8e73-9e64f1b35182',
    sykmeldingId: arbeidstakerBehandlingsdagSyk.id,
    soknadstype: 'BEHANDLINGSDAGER',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2020-05-13',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2020-03-31',
    sykmeldingUtskrevet: '2020-03-31',
    arbeidsgiver: { navn: 'Posten Norge AS, Bærum', orgnummer: '974654458' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [{ fom, tom, grad: 0, sykmeldingstype: 'BEHANDLINGSDAGER' }],
    sporsmal: [
        ansvarserklaring(),
        enkeltstaendeBehandlingsdager({
            fom,
            tom,
            uker: [
                { fom, tom: '2020-04-03', sporsmalstekst: '2020-03-31 - 2020-04-03' },
                { fom: '2020-04-06', tom: '2020-04-10' },
                { fom: '2020-04-13', tom: '2020-04-17' },
                { fom: '2020-04-20', tom },
            ],
        }),
        ferieV2({ fom, tom }),
        andreInntektskilder({
            fom,
            tom,
            sporsmalstekst: 'Har du andre inntektskilder enn nevnt over?',
            gruppeTekst: 'Hvilke andre inntektskilder har du?',
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER' },
                { tag: 'INNTEKTSKILDE_FRILANSER' },
                { tag: 'INNTEKTSKILDE_ANNET' },
            ],
        }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
