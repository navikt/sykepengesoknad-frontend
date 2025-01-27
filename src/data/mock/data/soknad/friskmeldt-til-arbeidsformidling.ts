import { RSSoknad } from '../../../../types/rs-types/rs-soknad'

function skapFremtidigFriskmeldtTilArbeidsformidling({
    fom,
    tom,
    opprettetDato,
    uuid,
}: {
    fom: string
    tom: string
    opprettetDato?: string
    uuid: string
}): RSSoknad {
    return {
        id: uuid,
        sykmeldingId: null,
        soknadstype: 'FRISKMELDT_TIL_ARBEIDSFORMIDLING',
        status: 'FREMTIDIG',
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
        sporsmal: [],
        egenmeldtSykmelding: false,
        opprettetAvInntektsmelding: false,
        klippet: false,
    }
}

export const fremtidigFriskmeldtTilArbeidsformidling1 = skapFremtidigFriskmeldtTilArbeidsformidling({
    fom: '2025-04-01',
    tom: '2025-04-14',
    opprettetDato: '2025-04-01',
    uuid: '583e1dcf-1bb3-4414-a3ad-a723f546e97b',
})

export const fremtidigFriskmeldtTilArbeidsformidling2 = skapFremtidigFriskmeldtTilArbeidsformidling({
    fom: '2025-04-15',
    tom: '2025-04-28',
    opprettetDato: '2025-04-01',
    uuid: '7a06090e-d158-4f14-9db5-a2c520ddc6f2',
})
