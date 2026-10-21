import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const arbeidsgiverUtland = ({
    svar = [],
    undersporsmal = [
        {
            id: '43389c36-d107-4ad2-a06b-26831bd84bdc',
            tag: 'FERIE',
            sporsmalstekst: 'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
    ],
    variant = 'ferie',
}: {
    svar?: RSSvar[]
    undersporsmal?: RSSporsmal[]
    variant?: 'ferie' | 'sykmeldingsgrad-og-ferie'
} = {}): RSSporsmal => ({
    id: 'acd5a489-2624-40c3-8dd1-a651b41b25aa',
    tag: 'ARBEIDSGIVER',
    sporsmalstekst: 'Har du én eller flere arbeidsgivere?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal:
        variant === 'sykmeldingsgrad-og-ferie'
            ? [
                  {
                      id: '4',
                      tag: 'SYKMELDINGSGRAD',
                      sporsmalstekst: 'Er du 100 % sykmeldt?',
                      undertekst: null,
                      svartype: 'JA_NEI',
                      min: null,
                      max: null,
                      kriterieForVisningAvUndersporsmal: null,
                      svar: [],
                      undersporsmal: [],
                  },
                  {
                      id: '5',
                      tag: 'FERIE',
                      sporsmalstekst:
                          'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
                      undertekst: null,
                      svartype: 'JA_NEI',
                      min: null,
                      max: null,
                      kriterieForVisningAvUndersporsmal: null,
                      svar: [],
                      undersporsmal: [],
                  },
              ]
            : undersporsmal,
})
