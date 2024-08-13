import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { tekst } from '../../../utils/tekster'
import { OppsummeringProps } from '../oppsummering'

import UndersporsmalSum from './undersporsmal-sum'

const erUndersporsmalStilt = (sporsmal: Sporsmal): boolean => {
    return (
        sporsmal.svarliste.svar
            .map((s) => {
                return s.verdi
            })
            .indexOf(sporsmal.kriterieForVisningAvUndersporsmal) > -1
    )
}

const JaEllerNei = ({ sporsmal }: OppsummeringProps) => {
    const svar = sporsmal.svarliste.svar[0]
    if (!svar || !svar.verdi || sporsmal.svarliste.svar.length === 0) {
        return null
    }

    const svartekst = tekst(`soknad.${svar.verdi.toLowerCase()}` as any)
    return (
        <FormSummary.Answer>
            {sporsmal.sporsmalstekst && (
                <FormSummary.Label className="ja-nei-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            )}
            <FormSummary.Value>
                {svartekst}
                {erUndersporsmalStilt(sporsmal) && (
                    <FormSummary.Answers>
                        <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
                    </FormSummary.Answers>
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default JaEllerNei
