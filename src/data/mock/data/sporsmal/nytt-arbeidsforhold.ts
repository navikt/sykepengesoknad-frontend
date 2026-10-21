import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './utils/backend-datoformat'

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
    const periodeTekst = formatterPeriode(fom, tom)

    return {
        id: 'a2b40b9c-4d4e-4b2b-83b8-f47ea8691d4c',
        tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_0',
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
                id: '048cbca7-24fb-4231-ab58-1cd091894009',
                tag: 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_BRUTTO_0',
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
