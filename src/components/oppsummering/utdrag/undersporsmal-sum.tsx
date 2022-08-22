import React from 'react'

import { Sporsmal } from '../../../types/types'
import Vis from '../../vis'
import { SporsmalVarianter } from '../oppsummering'

interface UndersporsmalProps {
    sporsmalsliste: Sporsmal[]
}

const UndersporsmalSum = ({ sporsmalsliste = [] }: UndersporsmalProps) => {
    return (
        <Vis
            hvis={sporsmalsliste.length > 0}
            render={() => (
                <div className="oppsummering__undersporsmalsliste">
                    {sporsmalsliste.map((sporsmal, idx) => {
                        return <SporsmalVarianter sporsmal={sporsmal} key={idx} />
                    })}
                </div>
            )}
        />
    )
}

export default UndersporsmalSum
