import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const andreInntektskilderV2 = (): RSSporsmal => {
    return {
        id: 'ee6a8e84-07c2-30c3-99d0-2aad85124890',
        tag: 'ANDRE_INNTEKTSKILDER_V2',
        sporsmalstekst: 'Har du andre inntektskilder enn Butikken?',
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: 'c074d0dd-849d-3357-9c43-af930017d62c',
                tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
                sporsmalstekst: 'Velg inntektskildene som passer for deg:',
                undertekst: 'Finner du ikke noe som passer for deg, velger du nei øverst',
                svartype: 'CHECKBOX_GRUPPE',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [
                    {
                        id: 'eb6317b7-a5e2-3576-a5aa-2b47f696b631',
                        tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                        sporsmalstekst: 'Ansatt andre steder enn nevnt over',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [
                            {
                                id: 'defc1170-d02c-3328-b58e-3ef11f11oifc',
                                tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_JOBBET_I_DET_SISTE',
                                sporsmalstekst:
                                    'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?',
                                undertekst: null,
                                svartype: 'JA_NEI',
                                min: null,
                                max: null,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            },
                        ],
                    },
                    {
                        id: 'b17742a1-3b53-3633-b4e0-7e67f6bbac34',
                        tag: 'INNTEKTSKILDE_SELVSTENDIG',
                        sporsmalstekst: 'Selvstendig næringsdrivende',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '880d24a6-cdd7-30e0-a2ea-78d8282325b3',
                        tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                        sporsmalstekst: 'Dagmamma',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '0deee28f-2193-348e-98bc-81674db77158',
                        tag: 'INNTEKTSKILDE_JORDBRUKER',
                        sporsmalstekst: 'Jordbruk / Fiske / Reindrift',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '513acbf0-44bb-3d61-bff9-65a01118c6af',
                        tag: 'INNTEKTSKILDE_FRILANSER',
                        sporsmalstekst: 'Frilanser',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: 'f18e79d0-c0d2-388d-b3b8-ae4147530b77',
                        tag: 'INNTEKTSKILDE_OMSORGSLONN',
                        sporsmalstekst: 'Kommunal omsorgstønad',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '388a58d1-7585-3615-8dd1-2821e72d2355',
                        tag: 'INNTEKTSKILDE_FOSTERHJEM',
                        sporsmalstekst: 'Fosterhjemsgodtgjørelse',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: 'c5b00044-b77c-357c-9832-8bcdcd9572c0',
                        tag: 'INNTEKTSKILDE_STYREVERV',
                        sporsmalstekst: 'Styreverv',
                        undertekst: null,
                        svartype: 'CHECKBOX',
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
