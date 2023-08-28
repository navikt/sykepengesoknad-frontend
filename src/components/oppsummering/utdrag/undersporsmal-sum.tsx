import React from 'react'

import { Sporsmal } from '../../../types/types'
import { SporsmalVarianter } from '../oppsummering'

interface UndersporsmalProps {
    sporsmalsliste: ReadonlyArray<Sporsmal>
}

const UndersporsmalSum = ({ sporsmalsliste = [] }: UndersporsmalProps) => {
    if (sporsmalsliste.length === 0) {
        return undefined
    }

    return sporsmalsliste.map((sporsmal, idx) => (
        <div className="pl-4 pt-4" key={idx}>
            <SporsmalVarianter sporsmal={sporsmal} />
        </div>
    ))
}

export default UndersporsmalSum
