import React from 'react'

import { SvarEnums } from '../../../types/enums'
import Vis from '../../vis'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'
import UndersporsmalSum from './undersporsmal-sum'

const CheckboxSum = ({ sporsmal }: OppsummeringProps) => {
    const uspm = sporsmal.undersporsmal
    return (
        <Vis hvis={sporsmal.svarliste.svar[0] && sporsmal.svarliste.svar[0].verdi === SvarEnums.CHECKED}>
            <Avkrysset tekst={sporsmal.sporsmalstekst} />
            <UndersporsmalSum sporsmalsliste={uspm} />
        </Vis>
    )
}

export default CheckboxSum
