import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSvar } from '../../../../types/rs-types/rs-svar'
import { formatterPeriode } from './backend-datoformat'

export const kvitteringer = ({
    fom,
    tom,
    svar = [],
    tekstvariant = 'reiser-til-og-fra',
}: {
    fom: string
    tom: string
    svar?: RSSvar[]
    tekstvariant?: 'reiseutgifter' | 'reiser-til-og-fra'
}): RSSporsmal => {
    const periode = formatterPeriode(fom, tom)
    return {
        id: '1566434',
        tag: 'KVITTERINGER',
        sporsmalstekst:
            tekstvariant === 'reiseutgifter'
                ? `Last opp kvitteringer for reiseutgifter til jobben fra ${periode}.`
                : `Last opp kvitteringer for reiser til og fra jobben mellom ${periode}.`,
        undertekst: null,
        svartype: 'KVITTERING',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar,
        undersporsmal: [],
    }
}
