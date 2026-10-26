import React from 'react'
import NyAlertGammeltDesign, { Funksjon } from '../../generelle-komponenter/NyAlertGammeltDesign'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { Sporsmal } from '../../../types/types'

import { TilbakeIArbeidBesvartHjeletekstTekster } from './tilbake-i-arbeid-besvart-hjeletekst-tekster'

export function TilbakeIArbeidBesvart({ sporsmal, fieldValue }: { sporsmal: Sporsmal; fieldValue: any }) {
    if (sporsmal.tag != 'TILBAKE_NAR' || !fieldValue) {
        return null
    }
    return (
        <NyAlertGammeltDesign
            funksjon={Funksjon.info}
            info={
                <>
                    {TilbakeIArbeidBesvartHjeletekstTekster.del1}
                    {tilLesbarPeriodeMedArstall(fieldValue, sporsmal.max)}
                    {TilbakeIArbeidBesvartHjeletekstTekster.del2}
                    <span className="mt-4 block text-ax-text-subtle">
                        {TilbakeIArbeidBesvartHjeletekstTekster.span}
                    </span>
                </>
            }
        />
    )
}
