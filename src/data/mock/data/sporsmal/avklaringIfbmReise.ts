import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const avklaringIfbmReise = (): RSSporsmal => {
    return {
        id: '516f492d-45a4-44b7-985f-9447ee3dcbc9',
        tag: 'AVKLARING_I_FORBINDELSE_MED_REISE',
        sporsmalstekst: null,
        undertekst: null,
        svartype: 'GRUPPE_AV_UNDERSPORSMAL',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [
            {
                id: '96284e6f-073c-41f6-8f7d-76c242faab0e',
                tag: 'AVKLART_MED_SYKMELDER',
                sporsmalstekst: 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?',
                undertekst:
                    'Utenlandsoppholdet må ikke forverre helsen din, forlenge sykefraværet eller hindre oppfølging.',
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: 'f75c9e39-1990-4788-b2b6-7933b8fdb166',
                tag: 'AVKLART_MED_ARBEIDSGIVER_ELLER_NAV',
                sporsmalstekst: 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?',
                undertekst:
                    'Utenlandsoppholdet må avklares med arbeidsgiveren din, eller NAV om du ikke har en arbeidsgiver, før du reiser. Utenlandsoppholdet kan ikke hindre planlagt aktivitet pả arbeidsplassen eller NAV.',
                svartype: 'JA_NEI',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    }
}
