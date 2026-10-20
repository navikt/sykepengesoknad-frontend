import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'
import { idMedIndeks } from './id-med-indeks'

type ArbeidUnderveisSvar = {
    readonly hoved?: RSSvar[]
    readonly arbeidsmengde?: RSSvar[]
    readonly prosent?: RSSvar[]
    readonly prosentVerdi?: RSSvar[]
    readonly timer?: RSSvar[]
    readonly timerVerdi?: RSSvar[]
    readonly normalArbeidsuke?: RSSvar[]
    readonly timerPerUke?: RSSvar[]
}

type ArbeidUnderveis100ProsentValgFelles = {
    readonly fom: string
    readonly tom: string
    readonly index?: number
    readonly svar?: ArbeidUnderveisSvar
    readonly timerMaks?: string
    readonly prosentUndertekst?: string | null
    readonly timerUndertekst?: string | null
    readonly timerTekstSporsmalstegn?: boolean
    readonly normalArbeidsukeTekst?: string
    readonly timerPerUkeTekst?: string | null
    readonly arbeidsgiverFormulering?: 'hos' | 'uten'
    readonly hovedtekstvariant?: 'standard' | 'uten-arbeidsgiver-i-andre-setning'
    readonly prosentVerdiTekstvariant?: 'normal-arbeidstid' | 'totalt-prosent'
}

type ArbeidUnderveis100ProsentValg =
    | (ArbeidUnderveis100ProsentValgFelles & {
          readonly arbeidsgiver: string
          readonly tekstvariant?: 'arbeidstaker'
      })
    | (ArbeidUnderveis100ProsentValgFelles & {
          readonly arbeidsgiver?: never
          readonly tekstvariant: 'frilanser' | 'selvstendigNaeringsdrivende'
      })

export const arbeidUnderveis100Prosent = (valg: ArbeidUnderveis100ProsentValg): RSSporsmal => {
    const {
        fom,
        tom,
        index = 0,
        svar = {},
        timerMaks = '364',
        prosentUndertekst = 'Oppgi i prosent. Eksempel: 40',
        timerUndertekst = 'Oppgi i timer. Eksempel: 12',
        timerTekstSporsmalstegn = false,
        timerPerUkeTekst = 'Oppgi timer per uke',
        arbeidsgiverFormulering = 'hos',
        hovedtekstvariant = 'standard',
        prosentVerdiTekstvariant = 'normal-arbeidstid',
    } = valg
    const arbeidsgiver = valg.arbeidsgiver
    const tekstvariant = valg.tekstvariant ?? 'arbeidstaker'
    const normalArbeidsukeTekst =
        valg.normalArbeidsukeTekst ?? `Jobber du vanligvis 37,5 timer i uka hos ${arbeidsgiver}?`
    const periode = formatterPeriode(fom, tom)
    const arbeidHos =
        arbeidsgiverFormulering === 'hos' && hovedtekstvariant === 'standard' ? `hos ${arbeidsgiver} ` : ''
    const rolle = tekstvariant === 'frilanser' ? 'frilanser' : 'selvstendig næringsdrivende'
    const sporsmalstekst =
        tekstvariant === 'arbeidstaker'
            ? `I perioden ${periode} var du 100 % sykmeldt fra ${arbeidsgiver}. Jobbet du noe ${arbeidHos}i denne perioden?`
            : `I perioden ${periode} var du 100% sykmeldt som ${rolle}. Jobbet du noe i denne perioden?`
    const prosentTekst =
        prosentVerdiTekstvariant === 'totalt-prosent'
            ? `Oppgi totalt prosent du jobbet i perioden ${periode} hos ${arbeidsgiver}?`
            : tekstvariant === 'arbeidstaker'
              ? `Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos ${arbeidsgiver} i perioden ${periode}?`
              : `Oppgi hvor mange prosent av din normale arbeidstid du jobbet i perioden ${periode}?`
    const timerTekst =
        tekstvariant === 'arbeidstaker'
            ? `Oppgi totalt antall timer du jobbet i perioden ${periode} hos ${arbeidsgiver}${timerTekstSporsmalstegn ? '?' : ''}`
            : `Oppgi totalt antall timer du jobbet i perioden ${periode}`

    return {
        id: idMedIndeks('63448066-fa24-3d9b-bf38-fb2ea23a353f', index),
        tag: `ARBEID_UNDERVEIS_100_PROSENT_${index}`,
        sporsmalstekst,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: svar.hoved ?? [],
        undersporsmal: [
            {
                id: idMedIndeks('9f5b48c7-f461-359d-a27c-a0ad42ab6c22', index),
                tag: `HVOR_MYE_HAR_DU_JOBBET_${index}`,
                sporsmalstekst: 'Oppgi arbeidsmengde i timer eller prosent:',
                undertekst: null,
                svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: svar.arbeidsmengde ?? [],
                undersporsmal: [
                    {
                        id: idMedIndeks('8ba29062-f412-30ad-8851-33577d8034ab', index),
                        tag: `HVOR_MYE_PROSENT_${index}`,
                        sporsmalstekst: 'Prosent',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: svar.prosent ?? [],
                        undersporsmal: [
                            {
                                id: idMedIndeks('796cf7ed-8a7e-39de-9cbc-6e789aa5af3f', index),
                                tag: `HVOR_MYE_PROSENT_VERDI_${index}`,
                                sporsmalstekst: prosentTekst,
                                undertekst: prosentUndertekst,
                                svartype: 'PROSENT',
                                min: '1',
                                max: '99',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: svar.prosentVerdi ?? [],
                                undersporsmal: [],
                            },
                        ],
                    },
                    {
                        id: idMedIndeks('27d3d9f1-d31f-3c0e-a1ec-3246c3b48b0a', index),
                        tag: `HVOR_MYE_TIMER_${index}`,
                        sporsmalstekst: 'Timer',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: svar.timer ?? [],
                        undersporsmal: [
                            {
                                id: idMedIndeks('6cc620d8-d4b0-3e82-a038-2757df6fc311', index),
                                tag: `HVOR_MYE_TIMER_VERDI_${index}`,
                                sporsmalstekst: timerTekst,
                                undertekst: timerUndertekst,
                                svartype: 'TIMER',
                                min: '1',
                                max: timerMaks,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: svar.timerVerdi ?? [],
                                undersporsmal: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: idMedIndeks('af302d17-f35d-38a6-ac23-ccde5db369cb', index),
                tag: `JOBBER_DU_NORMAL_ARBEIDSUKE_${index}`,
                sporsmalstekst: normalArbeidsukeTekst,
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'NEI',
                svar: svar.normalArbeidsuke ?? [],
                undersporsmal: [
                    {
                        id: idMedIndeks('ecc14b80-402a-32e6-9f93-e832ff0560d6', index),
                        tag: `HVOR_MANGE_TIMER_PER_UKE_${index}`,
                        sporsmalstekst: timerPerUkeTekst,
                        undertekst: null,
                        svartype: 'TIMER',
                        min: '1',
                        max: '150',
                        kriterieForVisningAvUndersporsmal: null,
                        svar: svar.timerPerUke ?? [],
                        undersporsmal: [],
                    },
                ],
            },
        ],
    }
}
