import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'

export const bilDatoer = ({
    fom,
    tom,
    id = '1566445',
    svar = [],
}: {
    fom: string
    tom: string
    id?: string
    svar?: RSSvar[]
}): RSSporsmal => ({
    id,
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
    id = '1566444',
    svar = [],
    bilDatoerSvar = [],
    bompengerSvar = [],
    bompengerBelopSvar = [],
    kmHjemJobbSvar = [],
    inkluderKmHjemJobb = true,
    tekstvariant = 'mellom',
    bilDatoerSporsmal = bilDatoer({ fom, tom, svar: bilDatoerSvar }),
    bompengerSporsmal = {
        id: '1566446',
        tag: 'BIL_BOMPENGER',
        sporsmalstekst: 'Hadde du utgifter til bompenger?',
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: bompengerSvar,
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
                svar: bompengerBelopSvar,
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
        svar: kmHjemJobbSvar,
        undersporsmal: [],
    },
}: {
    fom: string
    tom: string
    id?: string
    svar?: RSSvar[]
    bilDatoerSvar?: RSSvar[]
    bompengerSvar?: RSSvar[]
    bompengerBelopSvar?: RSSvar[]
    kmHjemJobbSvar?: RSSvar[]
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
        id,
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
