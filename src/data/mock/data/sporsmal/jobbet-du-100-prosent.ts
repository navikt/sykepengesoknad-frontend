import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'

type JobbetDu100ProsentValg = {
    readonly fom: string
    readonly tom: string
    readonly arbeidsgiver: string
    readonly svar?: RSSvar[]
}

export const jobbetDu100Prosent = ({ fom, tom, arbeidsgiver, svar = [] }: JobbetDu100ProsentValg): RSSporsmal => {
    const periode = formatterPeriode(fom, tom)

    return {
        id: '687349',
        tag: 'JOBBET_DU_100_PROSENT_0',
        sporsmalstekst: `I perioden ${periode} var du 100 % sykmeldt fra ${arbeidsgiver}. Jobbet du noe i denne perioden?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar,
        undersporsmal: [
            {
                id: '687350',
                tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                sporsmalstekst:
                    'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                undertekst: null,
                svartype: 'TALL',
                min: '1',
                max: '150',
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '687351',
                tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                sporsmalstekst: `Hvor mye jobbet du totalt ${periode} hos ${arbeidsgiver}?`,
                undertekst: null,
                svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [
                    {
                        id: '687352',
                        tag: 'HVOR_MYE_PROSENT_0',
                        sporsmalstekst: 'prosent',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [
                            {
                                id: '687353',
                                tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'TALL',
                                min: '1',
                                max: '99',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            },
                        ],
                    },
                    {
                        id: '687354',
                        tag: 'HVOR_MYE_TIMER_0',
                        sporsmalstekst: 'timer',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [
                            {
                                id: '687355',
                                tag: 'HVOR_MYE_TIMER_VERDI_0',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'TALL',
                                min: '1',
                                max: '514',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            },
                        ],
                    },
                ],
            },
        ],
    }
}
