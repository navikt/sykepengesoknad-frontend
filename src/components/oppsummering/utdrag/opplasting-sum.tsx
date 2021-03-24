import { Element } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { getLedetekst, tekst } from '../../../utils/tekster'
import { formatterTall } from '../../../utils/utils'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'

const OpplastingSum = ({ sporsmal }: OppsummeringProps) => {
    const [ antall, setAntall ] = useState<number>(0)
    const [ sum, setSum ] = useState<number>(0)

    useEffect(() => {
        setAntall(sporsmal.svarliste.svar.length)
        const kr = sporsmal.svarliste.svar.reduce((a, b) => a + Number(b.verdi), 0)
        setSum(kr / 100)

        // eslint-disable-next-line
    }, [])

    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            <div className="oppsummering__svar">
                <Vis hvis={antall > 0}>
                    <Avkrysset tekst={getLedetekst(tekst('oppsummering.opplasting'), {
                        '%ANTALL%': antall,
                        '%SUM%': formatterTall(sum, 2),
                    })} />
                </Vis>
                <Vis hvis={antall === 0}>
                    <Avkrysset tekst={tekst('oppsummering.opplasting.tom')} />
                </Vis>
            </div>
        </div>
    )
}

export default OpplastingSum
