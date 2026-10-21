import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { RSSoknadstatusType } from '../../../../types/rs-types/rs-soknadstatus'
import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { oppsummering } from '../sporsmal/oppsummering'
import { formatterPeriode } from '../sporsmal/utils/backend-datoformat'

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

function fortsattArbeidssokerDato({ fom, tom }: { fom: string; tom: string }): RSSporsmal {
    return {
        id: 'f4180f26-65ab-4519-a79b-17cfefa56914',
        tag: 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_AVREGISTRERT_NAR',
        sporsmalstekst: 'Fra hvilken dato vil du ikke lenger være friskmeldt til arbeidsformidling?',
        undertekst: 'Du vil ikke få utbetalt sykepenger fra og med denne datoen',
        svartype: 'DATO',
        min: fom,
        max: tom,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    }
}

function fortsattArbeidssoker({
    nyJobbUndersporsmal,
    medDatoSporsmal,
    fom,
    tom,
}: {
    nyJobbUndersporsmal: boolean
    medDatoSporsmal: boolean
    fom: string
    tom: string
}): RSSporsmal {
    return {
        id: nyJobbUndersporsmal ? '0b7f3cf0-c547-4542-9981-32b5e4983ba0' : 'd29879a7-3cd9-40a5-810c-4a7558897ead',
        tag: 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT' + (nyJobbUndersporsmal ? '_NY_JOBB' : ''),
        sporsmalstekst: 'Vil du fortsatt være friskmeldt til arbeidsformidling?',
        undertekst: nyJobbUndersporsmal
            ? 'Svar ja hvis du har begynt i en midlertidig jobb og fortsatt søker andre jobber'
            : null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: medDatoSporsmal ? 'NEI' : null,
        svar: [],
        undersporsmal: medDatoSporsmal ? [fortsattArbeidssokerDato({ fom, tom })] : [],
    }
}

export function jobbsituasjonenDin(opts: { fom: string; tom: string; sisteSoknad: boolean }): RSSporsmal {
    const { fom, tom } = opts

    const periodeTekst = formatterPeriode(fom, tom)

    const ja: RSSporsmal = {
        id: 'ad5793d0-a0d9-4839-a492-210f78008170',
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
                id: '5cc729d9-04db-4732-82be-6284c382c3fc',
                tag: 'FTA_JOBBSITUASJONEN_DIN_NAR',
                sporsmalstekst: 'Når begynte du i ny jobb?',
                undertekst: null,
                svartype: 'DATO',
                min: fom,
                max: tom,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    }
    if (!opts.sisteSoknad) {
        ja.undersporsmal.push(
            fortsattArbeidssoker({
                nyJobbUndersporsmal: true,
                medDatoSporsmal: false,
                fom,
                tom,
            }),
        )
    }
    const nei: RSSporsmal = {
        id: 'c2a11c11-1561-4bcf-9dc9-8e2f9bd29496',
        tag: 'FTA_JOBBSITUASJONEN_DIN_NEI',
        sporsmalstekst: 'Nei',
        undertekst: null,
        svartype: 'RADIO',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'CHECKED',
        svar: [],
        undersporsmal: [],
    }
    if (!opts.sisteSoknad) {
        nei.undersporsmal.push(
            fortsattArbeidssoker({
                nyJobbUndersporsmal: false,
                medDatoSporsmal: true,
                fom,
                tom,
            }),
        )
    }
    return {
        id: '4e04192d-58a2-4a74-b86a-5da6c6c8f70d',
        tag: 'FTA_JOBBSITUASJONEN_DIN',
        sporsmalstekst: `Begynte du i ny jobb i perioden ${periodeTekst}?`,
        undertekst: null,
        svartype: 'RADIO_GRUPPE',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [ja, nei],
    }
}

export function inntektUnderveis(opts: { fom: string; tom: string }): RSSporsmal {
    const { fom, tom } = opts

    const periodeTekst = formatterPeriode(fom, tom)

    return {
        id: '87139319-db75-4e56-90fa-999f465252b2',
        tag: 'FTA_INNTEKT_UNDERVEIS',
        sporsmalstekst: `Hadde du  inntekt i perioden ${periodeTekst}?`,
        undertekst: 'Dette kan for eksempel være inntekt fra en annen jobb du ikke har vært sykmeldt fra.',
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: 'b7e3cf6f-84f2-4c39-a31c-666ce5e84088',
                tag: 'FTA_INNTEKT_UNDERVEIS_BELOP',
                sporsmalstekst: `Hvor mye tjente du i perioden ${periodeTekst}?`,
                undertekst: 'Oppgi beløp før skatt. Har du hatt inntekt i flere jobber skal du oppgi samlet beløp.',
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

    const periodeTekst = formatterPeriode(fom, tom)

    return {
        id: 'f8c2e258-4ad3-465d-a037-4c03984a451b',
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
                id: '84b0d812-4606-44bc-983d-b0cfcc27d106',
                tag: 'FTA_REISE_TIL_UTLANDET_NAR',
                sporsmalstekst: `Når var du utenfor EU/EØS?`,
                undertekst: null,
                svartype: 'PERIODER',
                min: fom,
                max: tom,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    }
}
