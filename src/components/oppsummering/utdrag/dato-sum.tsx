import { FormSummary } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'
import { RSSvar } from '../../../types/rs-types/rs-svar'

const DatoSum = ({ sporsmal }: OppsummeringProps) => {
    const datoString = (svarverdi: RSSvar) => dayjs(svarverdi?.verdi.toString()).format('DD.MM.YYYY')
    return (
        <FormSummary.Answer>
            <FormSummary.Label>{sporsmal.sporsmalstekst}</FormSummary.Label>
            {sporsmal.svarliste.svar.map((svarverdi, index) => (
                <FormSummary.Value key={index}>{datoString(svarverdi)}</FormSummary.Value>
            ))}
        </FormSummary.Answer>
    )
}

export default DatoSum
