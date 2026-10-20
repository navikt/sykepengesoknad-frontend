import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'

export const bilDatoer = ({ fom, tom, svar = [] }: { fom: string; tom: string; svar?: RSSvar[] }): RSSporsmal => ({
    id: '1566445',
    tag: 'BIL_DATOER',
    sporsmalstekst: `Hvilke dager reiste du med bil i perioden ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'DATOER',
    min: fom,
    max: tom,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: [],
})

export const reiseMedBil = ({
    fom,
    tom,
    svar = [],
    inkluderKmHjemJobb = true,
    tekstvariant = 'mellom',
    bilDatoerSporsmal = bilDatoer({ fom, tom }),
    bompengerSporsmal = {
        id: '1566446',
        tag: 'BIL_BOMPENGER',
        sporsmalstekst: 'Hadde du utgifter til bompenger?',
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: '1566447',
                tag: 'BIL_BOMPENGER_BELOP',
                sporsmalstekst: 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?',
                undertekst: null,
                svartype: 'BELOP',
                min: '0',
                max: null,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    },
    kmHjemJobbSporsmal = {
        id: '1566448',
        tag: 'KM_HJEM_JOBB',
        sporsmalstekst: 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?',
        undertekst: null,
        svartype: 'KILOMETER',
        min: '0',
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    },
}: {
    fom: string
    tom: string
    svar?: RSSvar[]
    inkluderKmHjemJobb?: boolean
    tekstvariant?: 'fra' | 'mellom'
    bilDatoerSporsmal?: RSSporsmal
    bompengerSporsmal?: RSSporsmal
    kmHjemJobbSporsmal?: RSSporsmal
}): RSSporsmal => {
    const periode = formatterPeriode(fom, tom)
    const tekst =
        tekstvariant === 'fra'
            ? `Reiste du med egen bil, leiebil eller en kollega til jobben fra ${periode}?`
            : `Reiste du med egen bil, leiebil eller kollega til jobben mellom ${periode}?`

    return {
        id: '1566444',
        tag: 'REISE_MED_BIL',
        sporsmalstekst: tekst,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar,
        undersporsmal: [bilDatoerSporsmal, bompengerSporsmal, ...(inkluderKmHjemJobb ? [kmHjemJobbSporsmal] : [])],
    }
}
