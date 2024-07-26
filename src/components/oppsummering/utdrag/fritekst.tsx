import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'
import { hentSvar } from '../../sporsmal/hent-svar'

const Fritekst = ({ sporsmal }: OppsummeringProps) => {
    if (sporsmal.svarliste.svar.length === 0) return null
    if (!sporsmal.svarliste.svar[0].verdi) return null
    return (
        <FormSummary.Answer>
            <FormSummary.Label>{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>{hentSvar(sporsmal)}</FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default Fritekst
