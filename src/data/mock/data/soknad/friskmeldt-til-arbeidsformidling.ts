import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { RSSoknadstatusType } from '../../../../types/rs-types/rs-soknadstatus'
import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'

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
    }
}

export const fremtidigFriskmeldtTilArbeidsformidling1 = skapfriskmeldtTilArbeidsformidling({
    fom: '2025-04-01',
    tom: '2025-04-14',
    opprettetDato: '2025-04-01',
    uuid: '583e1dcf-1bb3-4414-a3ad-a723f546e97b',
    status: 'FREMTIDIG',
})

export const fremtidigFriskmeldtTilArbeidsformidling2 = skapfriskmeldtTilArbeidsformidling({
    fom: '2025-04-15',
    tom: '2025-04-28',
    opprettetDato: '2025-04-01',
    uuid: '7a06090e-d158-4f14-9db5-a2c520ddc6f2',
    status: 'FREMTIDIG',
})

export const friskmeldtTilArbeidsformidling = skapfriskmeldtTilArbeidsformidling({
    fom: '2025-04-15',
    tom: '2025-04-28',
    opprettetDato: '2025-04-01',
    uuid: '7e89c042-a822-40e6-bb4c-d04fe5f12685',
    sporsmal: [
        ansvarserklaring(),
        {
            id: '8eea7bec-97c2-3921-bf14-83a2e82d1e46',
            tag: 'FRISKMELDT',
            sporsmalstekst: 'Er dette en fin skallsøknad for testing?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        oppsummering(),
    ],
})
