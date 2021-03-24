import { Element } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { Kvittering } from '../../../types/types'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import { hentSvar } from '../../sporsmal/hent-svar'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'

const OpplastingSum = ({ sporsmal }: OppsummeringProps) => {
    const [ antall, setAntall ] = useState<number>(0)
    const [ sum, setSum ] = useState<number>(0)
    const [ svartekst, setSvartekst ] = useState<string>()

    useEffect(() => {
        const svar: Kvittering[] = hentSvar(sporsmal)
        setAntall(svar.length)

        const kr = svar.reduce((prev, cur) => prev + cur.belop, 0)
        setSum(kr / 100)

        if (svar.length === 0) {
            setSvartekst(tekst('oppsummering.opplasting.tom'))
        } else if (svar.length === 1) {
            setSvartekst(getLedetekst(tekst('oppsummering.opplasting.en'), {
                '%ANTALL%': antall,
                '%SUM%': formatterTall(sum, 0),
            }))
        } else {
            setSvartekst(getLedetekst(tekst('oppsummering.opplasting.fler'), {
                '%ANTALL%': antall,
                '%SUM%': formatterTall(sum, 0),
            }))
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__svar">
                <Avkrysset tekst={svartekst!} />
            </div>
        </div>
    )
}

export default OpplastingSum
