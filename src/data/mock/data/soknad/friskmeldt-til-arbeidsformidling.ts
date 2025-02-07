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

export const friskmeldtTilArbeidsformidling = skapfriskmeldtTilArbeidsformidling({
    fom: '2025-04-14',
    tom: '2025-04-27',
    opprettetDato: '2025-04-01',
    uuid: '7e89c042-a822-40e6-bb4c-d04fe5f12685',
    sporsmal: [
        ansvarserklaring(),
        jobbsituasjonenDin({
            fom: '2025-04-14',
            tom: '2025-04-27',
        }),
        inntektUnderveis({
            fom: '2025-04-14',
            tom: '2025-04-27',
        }),
        reiseTilUtlandet({
            fom: '2025-04-14',
            tom: '2025-04-27',
        }),
        oppsummering(),
    ],
})

function fortsattArbeidssokerDato(): RSSporsmal {
    return {
        id: v4().toString(),
        tag: 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_AVREGISTRERT_NAR',
        sporsmalstekst: 'Fra og med når?',
        undertekst: 'Du vil ikke være friskmeldt til arbeidsformidling fra og med denne datoen',
        svartype: 'DATO',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    }
}

function fortsattArbeidssoker(nyJobbUndersporsmal: boolean, medDatoSporsmal: boolean): RSSporsmal {
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
        kriterieForVisningAvUndersporsmal: medDatoSporsmal ? 'NEI' : null,
        svar: [],
        undersporsmal: medDatoSporsmal ? [fortsattArbeidssokerDato()] : [],
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
                    fortsattArbeidssoker(true, false),
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

                undersporsmal: [fortsattArbeidssoker(false, true)],
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
        undertekst: 'Dette kan for eksempel være inntekt fra en annen jobb du ikke er sykmeldt fra.',
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: v4().toString(),
                tag: 'FTA_INNTEKT_UNDERVEIS_MER_ENN_PLEIER',
                sporsmalstekst: `Tjente du mer enn du pleier i perioden ${periodeTekst}?`,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: v4().toString(),
                        tag: 'FTA_INNTEKT_UNDERVEIS_MER_ENN_PLEIER_BELOP',
                        sporsmalstekst: `Hvor mye tjente du, utover det du pleier?`,
                        undertekst: 'Har du tjent mer i flere jobber skal du oppgi samlet beløp, før skatt',
                        svartype: 'BELOP',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
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
