import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { andreInntektskilderV2 } from './andre-inntektskilde-v2'

export const flereInntektskilderGhost = (): RSSporsmal => {
    return {
        id: 'ee6a8e84-07c2-30c3-99d0-2aad85124890',
        tag: 'FLERE_INNTEKTSKILDER_GHOST',
        sporsmalstekst:
            'Har du jobbet noe mer i disse enn du vanligvis gjør, mens du var sykemeldt i perioden 1. April - 24. Mai 2020?',
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: '1566425',
                tag: 'JOBBET_MER_I',
                sporsmalstekst: 'Hvilke jobbet du mer i?',
                undertekst: 'Du kan velge en eller flere.',
                svartype: 'CHECKBOX_GRUPPE',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [
                    {
                        id: '2920104UNDAKSDNAKLSDENUMNA',
                        tag: 'JOBBET_MER_I_VALG',
                        sporsmalstekst: 'Blomsterbutikken AS',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '292901ndkadniedandøswjwondamdaø',
                        tag: 'JOBBET_MER_I_VALG',
                        sporsmalstekst: 'Ruter',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: 'BDKARIOEDNA1993834020FAPOFEAM',
                        tag: 'JOBBET_MER_I_VALG',
                        sporsmalstekst:
                            'Bensinstasjonen med det veldig lange navnet, Stavanger (ved det røde huset som ligger ved Shell)',
                        undertekst: null,
                        svartype: 'CHECKBOX',
                        min: null,
                        max: null,
                        kriterieForVisningAvUndersporsmal: 'CHECKED',
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            andreInntektskilderV2(),
        ],
    }
}
