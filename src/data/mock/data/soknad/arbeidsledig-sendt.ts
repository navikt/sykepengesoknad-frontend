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
        ansvarserklaring({ svar: [{ verdi: 'CHECKED' }] }),
        friskmeldt({ fom, tom, svar: [{ verdi: 'JA' }] }),
        andreInntektskilder({
            fom,
            tom,
            svar: [{ verdi: 'NEI' }],
            kilder: [
                { tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG' },
                { tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA' },
                { tag: 'INNTEKTSKILDE_JORDBRUKER' },
                { tag: 'INNTEKTSKILDE_FRILANSER' },
                { tag: 'INNTEKTSKILDE_OMSORGSLONN' },
                { tag: 'INNTEKTSKILDE_FOSTERHJEM' },
                { tag: 'INNTEKTSKILDE_ANNET' },
            ],
        }),
        oppholdUtenforEos({ fom, tom, svar: [{ verdi: 'NEI' }] }),
        arbeidUtenforNorge({ svar: [{ verdi: 'NEI' }] }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}
