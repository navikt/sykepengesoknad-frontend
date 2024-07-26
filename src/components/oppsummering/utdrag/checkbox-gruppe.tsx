import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'

import UndersporsmalSum from './undersporsmal-sum'

const CheckboxGruppe = ({ sporsmal }: OppsummeringProps) => {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>
                {sporsmal.undersporsmal.length > 0 && (
                    <FormSummary.Answers>
                        <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default CheckboxGruppe
