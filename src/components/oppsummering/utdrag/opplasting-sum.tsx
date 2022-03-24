import { Label } from '@navikt/ds-react'
import React from 'react'

import { Kvittering } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import { hentSvar } from '../../sporsmal/hent-svar'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'

const OpplastingSum = ({ sporsmal }: OppsummeringProps) => {
    const svar: Kvittering[] = hentSvar(sporsmal)
    const antall = svar.length
    const kr = svar.reduce((prev, cur) => prev + cur.belop, 0)
    const sum = kr / 100

    let svartekst = ''
    if (svar.length === 0) {
        svartekst = (tekst('oppsummering.opplasting.tom'))
    } else if (svar.length === 1) {
        svartekst = (getLedetekst(tekst('oppsummering.opplasting.en'), {
            '%ANTALL%': antall,
            '%SUM%': formatterTall(sum, 0),
        }))
    } else {
        svartekst = (getLedetekst(tekst('oppsummering.opplasting.fler'), {
            '%ANTALL%': antall,
            '%SUM%': formatterTall(sum, 0),
        }))
    }


    return (
        <div className="oppsummering__sporsmal">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <div className="oppsummering__svar">
                <Avkrysset tekst={svartekst} />
            </div>
        </div>
    )
}

export default OpplastingSum
