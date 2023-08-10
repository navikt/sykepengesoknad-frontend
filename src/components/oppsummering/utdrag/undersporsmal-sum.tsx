import React from 'react'

import { Sporsmal } from '../../../types/types'
import Vis from '../../vis'
import { SporsmalVarianter } from '../oppsummering'

interface UndersporsmalProps {
    sporsmalsliste: ReadonlyArray<Sporsmal>
}

const UndersporsmalSum = ({ sporsmalsliste = [] }: UndersporsmalProps) => {
    return (
        <Vis
            hvis={sporsmalsliste.length > 0}
            render={() => (
                <div className="mt-4 pl-4">
                    {sporsmalsliste.map((sporsmal, idx) => (
                        <SporsmalVarianter sporsmal={sporsmal} key={idx} />
                    ))}
                </div>
            )}
        />
    )
}

export default UndersporsmalSum
