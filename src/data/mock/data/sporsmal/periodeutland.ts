import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'

export const periodeUtland = ({ fom, tom, svar = [] }: { fom: string; tom: string; svar?: RSSvar[] }): RSSporsmal => ({
    id: 'f1a37307-c8e9-4370-9de1-98845088919c',
    tag: 'PERIODEUTLAND',
    sporsmalstekst: 'Når skal du reise?',
    undertekst: null,
    svartype: 'PERIODER',
    min: fom,
    max: tom,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})
