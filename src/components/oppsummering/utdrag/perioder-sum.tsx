import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { hentPeriodeListe } from '../../sporsmal/hent-svar'
import { OppsummeringProps } from '../oppsummering'

const PerioderSum = ({ sporsmal }: OppsummeringProps) => {
    const periodeListe = hentPeriodeListe(sporsmal)
    return (
        <FormSummary.Answer>
            <FormSummary.Label className="periode-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            {periodeListe.map((periode, index) => {
                return (
                    <FormSummary.Value key={index}>
                        {tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
                    </FormSummary.Value>
                )
            })}
        </FormSummary.Answer>
    )
}

export default PerioderSum
