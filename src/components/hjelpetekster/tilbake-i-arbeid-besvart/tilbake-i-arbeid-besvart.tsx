import { Alert } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../../types/enums'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { Sporsmal } from '../../../types/types'

import styles from './tilbake-i-arbeid-besvart.module.css'
import { TilbakeIArbeidBesvartHjeletekstTekster } from './tilbake-i-arbeid-besvart-hjeletekst-tekster'

export function TilbakeIArbeidBesvart({ sporsmal, fieldValue }: { sporsmal: Sporsmal; fieldValue: any }) {
    if (sporsmal.tag != TagTyper.TILBAKE_NAR || !fieldValue) {
        return null
    }
    return (
        <Alert variant="info" className={styles.alert}>
            {TilbakeIArbeidBesvartHjeletekstTekster.del1}
            {tilLesbarPeriodeMedArstall(fieldValue, sporsmal.max)}
            {TilbakeIArbeidBesvartHjeletekstTekster.del2}
            <span className={styles.span}>{TilbakeIArbeidBesvartHjeletekstTekster.span}</span>
        </Alert>
    )
}
