import { v4 } from 'uuid'
import dayjs from 'dayjs'

import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

export const nyttArbeidsforholdForstegangSporsmal = ({
    orgnavn,
    orgnr,
    tom,
    fom,
}: {
    orgnavn: string
    orgnr: string
    tom: string
    fom: string
}): RSSporsmal => {
    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    return {
        id: v4().toString(),
        tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_FORSTEGANG',
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
                tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_FORSTEGANG_FORSTE_ARBEIDSDAG',
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

export const nyttArbeidsforholdPafolgendeSporsmal = ({
    orgnavn,
    orgnr,
    tom,
    fom,
}: {
    orgnavn: string
    orgnr: string
    tom: string
    fom: string
}): RSSporsmal => {
    const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))

    return {
        id: v4().toString(),
        tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_PAFOLGENDE',
        sporsmalstekst: `Har du jobbet noe hos ${orgnavn} i perioden ${periodeTekst}?`,
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
