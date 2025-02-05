import { v4 } from 'uuid'
import dayjs from 'dayjs'

import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { RSSoknadstatusType } from '../../../../types/rs-types/rs-soknadstatus'
import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

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
        jobbsituasjonenDin({
            fom: '2025-04-15',
            tom: '2025-04-28',
        }),
        inntektUnderveis({
            fom: '2025-04-15',
            tom: '2025-04-28',
        }),
        reiseTilUtlandet({
            fom: '2025-04-15',
            tom: '2025-04-28',
        }),
        oppsummering(),
    ],
})

function fortsattArbneidssoker(nyJobbUndersporsmal?: boolean): RSSporsmal {
    return {
        id: v4().toString(),
        tag: 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER' + (nyJobbUndersporsmal ? '_NY_JOBB' : ''),
        sporsmalstekst: 'Vil du fortsatt være registrert som arbeidssøker hos Nav?',
        undertekst: nyJobbUndersporsmal
            ? 'Svar ja hvis du har begynt i en midlertidig jobb og fortsatt søker andre jobber'
            : null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    }
}

export function jobbsituasjonenDin(opts: { fom: string; tom: string }): RSSporsmal {
    const { fom, tom } = opts

    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    return {
        id: v4().toString(),
        tag: 'FTA_JOBBSITUASJONEN_DIN',
        sporsmalstekst: `Begynte du i ny jobb i perioden ${periodeTekst}?`,
        undertekst: null,
        svartype: 'RADIO_GRUPPE',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [
            {
                id: v4().toString(),
                tag: 'FTA_JOBBSITUASJONEN_DIN_JA',
                sporsmalstekst: 'Ja',
                undertekst: null,
                svartype: 'RADIO',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'CHECKED',
                svar: [],

                undersporsmal: [
                    {
                        id: v4().toString(),
                        tag: 'FTA_JOBBSITUASJONEN_DIN_NAR',
                        sporsmalstekst: 'Når begynte du i ny jobb?',
                        undertekst: null,
                        svartype: 'DATO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    fortsattArbneidssoker(true),
                ],
            },
            {
                id: v4().toString(),
                tag: 'FTA_JOBBSITUASJONEN_DIN_NEI',
                sporsmalstekst: 'Nei',
                undertekst: null,
                svartype: 'RADIO',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'CHECKED',
                svar: [],

                undersporsmal: [fortsattArbneidssoker()],
            },
        ],
    }
}

export function inntektUnderveis(opts: { fom: string; tom: string }): RSSporsmal {
    const { fom, tom } = opts

    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    return {
        id: v4().toString(),
        tag: 'FTA_INNTEKT_UNDERVEIS',
        sporsmalstekst: `Hadde du  inntekt i perioden ${periodeTekst}?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: v4().toString(),
                tag: 'FTA_INNTEKT_UNDERVEIS_BELOP',
                sporsmalstekst: `Hvor mye tjente du i perioden ${periodeTekst}?`,
                undertekst:
                    'Oppgi beløp før skatt. Har du flere jobber, skal du oppgi det du har tjent til sammen i perioden.',
                svartype: 'BELOP',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    }
}

export function reiseTilUtlandet(opts: { fom: string; tom: string }): RSSporsmal {
    const { fom, tom } = opts

    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    return {
        id: v4().toString(),
        tag: 'FTA_REISE_TIL_UTLANDET',
        sporsmalstekst: `Var du på reise utenfor EU/EØS i perioden ${periodeTekst}?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: v4().toString(),
                tag: 'FTA_REISE_TIL_UTLANDET_NAR',
                sporsmalstekst: `Når var du utenfor EU/EØS?`,
                undertekst: null,
                svartype: 'PERIODER',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    }
}
