import React from 'react'
import { FormSummary } from '@navikt/ds-react'

import { OppsummeringProps } from '../oppsummering'
import { hentSvar } from '../../sporsmal/hent-svar'

import UndersporsmalSum from './undersporsmal-sum'

const CheckboxSum = ({ sporsmal }: OppsummeringProps) => {
    const svarErChecked: boolean = hentSvar(sporsmal)

    if (sporsmal.tag === 'ANSVARSERKLARING') return null
    return (
        <>
            {svarErChecked && (
                <FormSummary.Answer>
                    <FormSummary.Value>
                        {sporsmal.sporsmalstekst}
                        {sporsmal.undersporsmal.length > 0 && (
                            <FormSummary.Answers>
                                <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
                            </FormSummary.Answers>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    )
}

export default CheckboxSum
