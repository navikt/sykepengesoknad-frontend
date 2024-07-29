import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'
import { hentSvar } from '../../sporsmal/hent-svar'

import UndersporsmalSum from './undersporsmal-sum'

const LandSum = ({ sporsmal }: OppsummeringProps) => {
    const landsvar = hentSvar(sporsmal)
    let landliste: string[]
    if (typeof landsvar === 'string') {
        landliste = [landsvar]
    } else {
        landliste = landsvar
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label className="land-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            {landliste?.map((land, index) => {
                return <FormSummary.Value key={index}>{land}</FormSummary.Value>
            })}
            <FormSummary.Value>
                {sporsmal.undersporsmal.length > 0 && (
                    <FormSummary.Answers className={`antall-svar-${sporsmal.undersporsmal.length}`}>
                        <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default LandSum
