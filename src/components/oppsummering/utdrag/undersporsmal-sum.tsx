import React from 'react'

import { Sporsmal } from '../../../types/types'
import VisBlock from '../../vis-block'
import { SporsmalVarianter } from '../oppsummering'

interface UndersporsmalProps {
    sporsmalsliste: Sporsmal[];
}

const UndersporsmalSum = ({ sporsmalsliste = [] }: UndersporsmalProps) => {
    return (
        <VisBlock hvis={sporsmalsliste.length > 0}
            render={() => {
                return (
                    <div className="oppsummering__undersporsmalsliste">
                        {sporsmalsliste.map((sporsmal, idx) => {
                            return <SporsmalVarianter sporsmal={sporsmal} key={idx} />
                        })}
                    </div>
                )
            }}
        />
    )
}

export default UndersporsmalSum
