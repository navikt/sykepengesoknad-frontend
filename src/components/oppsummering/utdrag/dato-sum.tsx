import { FormSummary } from '@navikt/ds-react'
import { format } from 'date-fns'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'
import { RSSvar } from '../../../types/rs-types/rs-svar'
import { toDate } from '../../../utils/dato-utils'

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    if (sporsmal.svarliste.svar.length === 0) return null
    const datoString = (svarverdi: RSSvar) => format(toDate(svarverdi.verdi.toString()), 'dd.MM.yyyy')
    return (
        <FormSummary.Answer>
            {sporsmal.sporsmalstekst && (
                <FormSummary.Label className="dato-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            )}
            {sporsmal.svarliste.svar.map((svarverdi, index) => (
                <FormSummary.Value key={index}>{datoString(svarverdi)}</FormSummary.Value>
            ))}
        </FormSummary.Answer>
    )
}

export default DatoSum
