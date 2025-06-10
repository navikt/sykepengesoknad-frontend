import { FormSummary } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'
import { RSSvar } from '../../../types/rs-types/rs-svar'

const MaanedSum = ({ sporsmal }: OppsummeringProps) => {
    if (sporsmal.svarliste.svar.length === 0) return null
    const datoString = (svarverdi: RSSvar) => dayjs(svarverdi?.verdi.toString()).format('MMMM YYYY')
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

export default MaanedSum
