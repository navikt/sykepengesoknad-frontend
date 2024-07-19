import { v4 } from 'uuid'

import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarDatoUtenAarstall } from '../../../../utils/dato-utils'

export const tilkommenInntektForstegangSporsmal = ({
    orgnavn,
    orgnr,
    tom,
}: {
    orgnavn: string
    orgnr: string
    tom: string
}): RSSporsmal => {
    const tomLesbar = tilLesbarDatoUtenAarstall(tom)
    return {
        id: v4().toString(),
        tag: 'TILKOMMEN_INNTEKT_FORSTEGANG',
        sporsmalstekst: `Har du startet å jobbe hos ${orgnavn}?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        metadata: {
            orgnummer: orgnr,
            orgnavn: orgnavn,
        },
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: v4().toString(),
                tag: 'TILKOMMEN_INNTEKT_FORSTEGANG_FORSTE_ARBEIDSDAG',
                sporsmalstekst: 'Når hadde du din første arbeidsdag?',
                undertekst: null,
                svartype: 'DATO',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: v4().toString(),
                tag: 'TILKOMMEN_INNTEKT_FORSTEGANG_BRUTTO',
                sporsmalstekst: `Hvor mye har du tjent i perioden fra den første arbeidsdagen frem til ${tomLesbar}?`,
                undertekst:
                    'Oppgi det du har tjent brutto (før skatt). Se på lønnslippen eller kontrakten hvor mye du har tjent eller skal tjene.',
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
