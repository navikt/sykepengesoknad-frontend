import React from 'react'

import { SvarEnums } from '../../../types/enums'
import VisBlock from '../../vis-block'
import { OppsummeringProps } from '../oppsummering'
import Avkrysset from './avkrysset'
import UndersporsmalSum from './undersporsmal-sum'

const CheckboxSum = ({ sporsmal }: OppsummeringProps) => {
    const uspm = sporsmal.undersporsmal
    return (
        <VisBlock hvis={sporsmal.svarliste.svar[0] && sporsmal.svarliste.svar[0].verdi === SvarEnums.CHECKED}
            render={() => {
                return <>
                    <Avkrysset tekst={sporsmal.sporsmalstekst} />
                    <UndersporsmalSum sporsmalsliste={uspm} />
                </>
            }}
        />
    )
}

export default CheckboxSum
