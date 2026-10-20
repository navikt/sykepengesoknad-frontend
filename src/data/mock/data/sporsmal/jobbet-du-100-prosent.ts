import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'
import { idMedIndeks } from './id-med-indeks'

type JobbetDu100ProsentValg = {
    readonly fom: string
    readonly tom: string
    readonly arbeidsgiver: string
    readonly index?: number
    readonly svar?: RSSvar[]
    readonly svarBarn?: {
        readonly timerPerUke?: RSSvar[]
        readonly arbeidsmengde?: RSSvar[]
        readonly prosent?: RSSvar[]
        readonly prosentVerdi?: RSSvar[]
        readonly timer?: RSSvar[]
        readonly timerVerdi?: RSSvar[]
    }
}

export const jobbetDu100Prosent = ({
    fom,
    tom,
    arbeidsgiver,
    index = 0,
    svar = [],
    svarBarn = {},
}: JobbetDu100ProsentValg): RSSporsmal => {
    const periode = formatterPeriode(fom, tom)

    return {
        id: idMedIndeks('687349', index),
        tag: `JOBBET_DU_100_PROSENT_${index}`,
        sporsmalstekst: `I perioden ${periode} var du 100 % sykmeldt fra ${arbeidsgiver}. Jobbet du noe i denne perioden?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar,
        undersporsmal: [
            {
                id: idMedIndeks('687350', index),
                tag: `HVOR_MANGE_TIMER_PER_UKE_${index}`,
                sporsmalstekst:
                    'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                undertekst: null,
                svartype: 'TALL',
                min: '1',
                max: '150',
                kriterieForVisningAvUndersporsmal: null,
                svar: svarBarn.timerPerUke ?? [],
                undersporsmal: [],
            },
            {
                id: idMedIndeks('687351', index),
                tag: `HVOR_MYE_HAR_DU_JOBBET_${index}`,
                sporsmalstekst: `Hvor mye jobbet du totalt ${periode} hos ${arbeidsgiver}?`,
                undertekst: null,
                svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: svarBarn.arbeidsmengde ?? [],
                undersporsmal: [
                    {
                        id: idMedIndeks('687352', index),
                        tag: `HVOR_MYE_PROSENT_${index}`,
                        sporsmalstekst: 'prosent',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: svarBarn.prosent ?? [],
                        undersporsmal: [
                            {
                                id: idMedIndeks('687353', index),
                                tag: `HVOR_MYE_PROSENT_VERDI_${index}`,
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'TALL',
                                min: '1',
                                max: '99',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: svarBarn.prosentVerdi ?? [],
                                undersporsmal: [],
                            },
                        ],
                    },
                    {
                        id: idMedIndeks('687354', index),
                        tag: `HVOR_MYE_TIMER_${index}`,
                        sporsmalstekst: 'timer',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: svarBarn.timer ?? [],
                        undersporsmal: [
                            {
                                id: idMedIndeks('687355', index),
                                tag: `HVOR_MYE_TIMER_VERDI_${index}`,
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'TALL',
                                min: '1',
                                max: '514',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: svarBarn.timerVerdi ?? [],
                                undersporsmal: [],
                            },
                        ],
                    },
                ],
            },
        ],
    }
}
