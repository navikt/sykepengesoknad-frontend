import { Alert } from '@navikt/ds-react'
import React from 'react'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { Sporsmal } from '../../../types/types'

import { TilbakeIArbeidBesvartHjeletekstTekster } from './tilbake-i-arbeid-besvart-hjeletekst-tekster'

export function TilbakeIArbeidBesvart({ sporsmal, fieldValue }: { sporsmal: Sporsmal; fieldValue: any }) {
    if (sporsmal.tag != 'TILBAKE_NAR' || !fieldValue) {
        return null
    }
    return (
        <Alert variant="info" className="mt-4">
            {TilbakeIArbeidBesvartHjeletekstTekster.del1}
            {tilLesbarPeriodeMedArstall(fieldValue, sporsmal.max)}
            {TilbakeIArbeidBesvartHjeletekstTekster.del2}
            <span className="mt-4 block text-gray-700">{TilbakeIArbeidBesvartHjeletekstTekster.span}</span>
        </Alert>
    )
}
