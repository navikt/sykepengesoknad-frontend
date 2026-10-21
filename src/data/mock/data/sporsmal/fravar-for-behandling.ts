import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterDato, formatterPeriode } from './utils/backend-datoformat'

type FraverForBehandlingValg = {
    readonly fom: string
    readonly tom: string
    readonly fravarFom: string
    readonly fravarTom: string
    readonly fravarTekstFom?: string
    readonly fravarTekstTom?: string
    readonly svar?: RSSvar[]
    readonly tidligereEgenmeldingTag?: 'TIDLIGERE_EGENMELDING' | 'TIDLIGERE_EGENMELDINGER'
}

export const fravarForBehandling = ({
    fom,
    tom,
    fravarFom,
    fravarTom,
    fravarTekstFom = fravarFom,
    fravarTekstTom = fravarTom,
    svar = [],
    tidligereEgenmeldingTag = 'TIDLIGERE_EGENMELDINGER',
}: FraverForBehandlingValg): RSSporsmal => {
    const tidligereSyk: RSSporsmal = {
        id: '3214',
        tag: 'TIDLIGERE_SYK',
        sporsmalstekst: null,
        undertekst: null,
        svartype: 'CHECKBOX_GRUPPE',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: ['EGENMELDINGER', 'PAPIRSYKMELDING'].map((type, index) => ({
            id: index === 0 ? '443' : '6234',
            tag: index === 0 ? tidligereEgenmeldingTag : `TIDLIGERE_${type}`,
            sporsmalstekst: `Jeg var syk med ${index === 0 ? 'egenmelding' : 'papirsykmelding'}`,
            undertekst: null,
            svartype: 'CHECKBOX',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'CHECKED',
            svar: [],
            undersporsmal: [
                {
                    id: index === 0 ? '546' : '7645',
                    tag: `${type}_NAR`,
                    sporsmalstekst: `Hvilke dager var du syk med ${index === 0 ? 'egenmelding' : 'papirsykmelding'}? Du trenger bare oppgi dager før ${formatterDato(fom)}.`,
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: fravarFom,
                    max: fravarTom,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        })),
    }
    return {
        id: '243',
        tag: 'FRAVER_FOR_BEHANDLING',
        sporsmalstekst: `Vi ser at sykmeldingen inneholder behandlingsdager mellom ${formatterPeriode(fom, tom)}. Var du syk og borte fra jobb før dette, nærmere bestemt ${formatterPeriode(fravarTekstFom, fravarTekstTom)}?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar,
        undersporsmal: [tidligereSyk],
    }
}
