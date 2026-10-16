import type { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { now } from '../../../../utils/dato-utils'
import { arbeidstaker100Syk } from '../sykmeldinger'
import { andreInntektskilder } from '../sporsmal/andre-inntektskilder'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { friskmeldt } from '../sporsmal/friskmeldt'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'

const fom = '2020-05-27'
const tom = '2020-06-11'

export const sendtArbeidsledig: RSSoknad = {
    id: '3848e75e-4069-4076-95c0-3f9f0b63e498',
    sykmeldingId: arbeidstaker100Syk.id,
    soknadstype: 'ARBEIDSLEDIG',
    status: 'SENDT',
    fom,
    tom,
    opprettetDato: '2020-06-12',
    sendtTilNAVDato: now().toISOString(),
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: fom,
    arbeidsgiver: null,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSLEDIG',
    soknadPerioder: [{ fom, tom, grad: 100, sykmeldingstype: 'AKTIVITET_IKKE_MULIG' }],
    sporsmal: [
        ansvarserklaring({ id: '42', svar: [{ verdi: 'CHECKED' }] }),
        friskmeldt({ fom, tom, id: '47', startId: '48', svar: [{ verdi: 'JA' }] }),
        andreInntektskilder({
            fom,
            tom,
            id: '49',
            gruppeId: '50',
            svar: [{ verdi: 'NEI' }],
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD', id: '51', erDuSykmeldtId: '52' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG', id: '53', erDuSykmeldtId: '54' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA', id: '55', erDuSykmeldtId: '56' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER', id: '57', erDuSykmeldtId: '58' },
                { tag: 'INNTEKTSKILDE_FRILANSER', id: '59', erDuSykmeldtId: '60' },
                { tag: 'INNTEKTSKILDE_OMSORGSLONN', id: '61', erDuSykmeldtId: '62' },
                { tag: 'INNTEKTSKILDE_FOSTERHJEM', id: '63', erDuSykmeldtId: '64' },
                { tag: 'INNTEKTSKILDE_ANNET', id: '65' },
            ],
        }),
        oppholdUtenforEos({ fom, tom, id: '69', oppholdNarId: '70', svar: [{ verdi: 'NEI' }] }),
        arbeidUtenforNorge({ id: '73', svar: [{ verdi: 'NEI' }] }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
