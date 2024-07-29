import { FormSummary } from '@navikt/ds-react'
import React from 'react'

import { Kvittering } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import { hentSvar } from '../../sporsmal/hent-svar'
import { OppsummeringProps } from '../oppsummering'

const OpplastingSum = ({ sporsmal }: OppsummeringProps) => {
    const svar: Kvittering[] = hentSvar(sporsmal)
    const antall = svar.length
    const kr = svar.reduce((prev, cur) => prev + cur.belop, 0)
    const sum = kr / 100

    let svartekst: string
    if (svar.length === 0) {
        svartekst = tekst('oppsummering.opplasting.tom')
    } else if (svar.length === 1) {
        svartekst = getLedetekst(tekst('oppsummering.opplasting.en'), {
            '%ANTALL%': antall,
            '%SUM%': formatterTall(sum, 0),
        })
    } else {
        svartekst = getLedetekst(tekst('oppsummering.opplasting.fler'), {
            '%ANTALL%': antall,
            '%SUM%': formatterTall(sum, 0),
        })
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label className="opplasting-label">{sporsmal.sporsmalstekst}</FormSummary.Label>
            <FormSummary.Value>{svartekst} </FormSummary.Value>
        </FormSummary.Answer>
    )
}

export default OpplastingSum
