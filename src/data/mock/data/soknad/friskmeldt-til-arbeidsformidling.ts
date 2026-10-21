import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { RSSoknadstatusType } from '../../../../types/rs-types/rs-soknadstatus'
import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'
import { inntektUnderveis, jobbsituasjonenDin, reiseTilUtlandet } from '../sporsmal/friskmeldt-til-arbeidsformidling'

function skapfriskmeldtTilArbeidsformidling({
    fom,
    tom,
    opprettetDato,
    uuid,
    status,
    sporsmal,
}: {
    fom: string
    tom: string
    opprettetDato?: string
    uuid: string
    status?: RSSoknadstatusType
    sporsmal?: RSSporsmal[]
}): RSSoknad {
    return {
        id: uuid,
        sykmeldingId: null,
        soknadstype: 'FRISKMELDT_TIL_ARBEIDSFORMIDLING',
        status: status ?? 'NY',
        fom: fom,
        tom: tom,
        opprettetDato: opprettetDato ?? fom,
        sendtTilNAVDato: null,
        sendtTilArbeidsgiverDato: null,
        avbruttDato: null,
        startSykeforlop: null,
        sykmeldingUtskrevet: null,
        arbeidsgiver: null,
        korrigerer: null,
        korrigertAv: null,
        arbeidssituasjon: null,
        soknadPerioder: [],
        sporsmal: sporsmal ?? [],
        egenmeldtSykmelding: false,
        opprettetAvInntektsmelding: false,
        klippet: false,
        friskTilArbeidVedtakId: 'vedtakid-123',
    }
}

export const fremtidigFriskmeldtTilArbeidsformidling1 = skapfriskmeldtTilArbeidsformidling({
    fom: '2025-04-14',
    tom: '2025-04-27',
    opprettetDato: '2025-04-01',
    uuid: '583e1dcf-1bb3-4414-a3ad-a723f546e97b',
    status: 'FREMTIDIG',
})

export const fremtidigFriskmeldtTilArbeidsformidling2 = skapfriskmeldtTilArbeidsformidling({
    fom: '2025-04-28',
    tom: '2025-05-11',
    opprettetDato: '2025-04-01',
    uuid: '7a06090e-d158-4f14-9db5-a2c520ddc6f2',
    status: 'FREMTIDIG',
})

export function nyFriskmeldtTilArbeidsformidling({
    fom,
    tom,
    uuid,
    sisteSoknad,
}: {
    fom: string
    tom: string
    uuid: string
    sisteSoknad: boolean
}) {
    return skapfriskmeldtTilArbeidsformidling({
        fom,
        tom,
        opprettetDato: fom,
        uuid,
        sporsmal: [
            ansvarserklaring(),
            jobbsituasjonenDin({ fom, tom, sisteSoknad }),
            inntektUnderveis({ fom, tom }),
            reiseTilUtlandet({ fom, tom }),
            oppsummering(),
        ],
    })
}
