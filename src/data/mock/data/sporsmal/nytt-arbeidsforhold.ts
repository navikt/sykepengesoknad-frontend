import { v4 } from 'uuid'
import dayjs from 'dayjs'

import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

export const nyttArbeidsforholdSporsmal = ({
    arbeidsstedNavn,
    arbeidsstedOrgnummer,
    tom,
    fom,
}: {
    arbeidsstedNavn: string
    arbeidsstedOrgnummer: string
    tom: string
    fom: string
}): RSSporsmal => {
    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    return {
        id: v4().toString(),
        tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS',
        sporsmalstekst: `Har du jobbet noe hos ${arbeidsstedNavn} i perioden ${periodeTekst}?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        metadata: {
            arbeidsstedOrgnummer: arbeidsstedOrgnummer,
            arbeidsstedNavn: arbeidsstedNavn,
        },
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: v4().toString(),
                tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_BRUTTO',
                sporsmalstekst: `Hvor mye har du tjent i perioden ${periodeTekst}?`,
                undertekst:
                    'Oppgi det du har tjent før skatt. Se på lønnslippen eller kontrakten hvor mye du har tjent eller skal tjene.',
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
