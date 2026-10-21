import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './utils/backend-datoformat'

type JobbetDuGradertValg = {
    readonly fom: string
    readonly tom: string
    readonly arbeidsgiver: string
    readonly grad: number
    readonly svar?: RSSvar[]
    readonly prosentMin?: string
    readonly verdiSvartype?: 'domene' | 'tall'
}

export const jobbetDuGradert = ({
    fom,
    tom,
    arbeidsgiver,
    grad,
    svar = [],
    prosentMin = String(grad + 1),
    verdiSvartype = 'domene',
}: JobbetDuGradertValg): RSSporsmal => {
    const periode = formatterPeriode(fom, tom)

    return {
        id: 'd146b1c5-661f-35ed-b72f-172fc17ead5d',
        tag: 'JOBBET_DU_GRADERT_0',
        sporsmalstekst: `I perioden ${periode} sier sykmeldingen at du kunne jobbe ${grad} % i jobben din hos ${arbeidsgiver}. Jobbet du mer enn det?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar,
        undersporsmal: [
            {
                id: '495730df-717d-3774-bd19-e6bcf76e3ba2',
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
                id: 'e3a6bd7d-8f10-381c-8cd3-cdab3e410c95',
                tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                sporsmalstekst: `Hvor mye jobbet du tilsammen ${periode}?`,
                undertekst: 'Velg timer eller prosent',
                svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [
                    {
                        id: '0e368ffc-1840-35e5-bbb5-b994cbaa8ef1',
                        tag: 'HVOR_MYE_PROSENT_0',
                        sporsmalstekst: 'Prosent',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [
                            {
                                id: '13acfccb-3f39-3893-8054-058270add6ab',
                                tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: verdiSvartype === 'tall' ? 'TALL' : 'PROSENT',
                                min: prosentMin,
                                max: '99',
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            },
                        ],
                    },
                    {
                        id: '348f75cd-a87d-397b-8428-cbcb9e50a5d7',
                        tag: 'HVOR_MYE_TIMER_0',
                        sporsmalstekst: 'Timer',
                        undertekst: null,
                        svartype: 'RADIO',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [
                            {
                                id: '34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539',
                                tag: 'HVOR_MYE_TIMER_VERDI_0',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: verdiSvartype === 'tall' ? 'TALL' : 'TIMER',
                                min: '1',
                                max: '364',
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
