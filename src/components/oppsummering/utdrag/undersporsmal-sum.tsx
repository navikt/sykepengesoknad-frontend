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

    return sporsmalsliste.map((sporsmal, idx) => <SporsmalVarianter sporsmal={sporsmal} key={idx} />)
}

export default UndersporsmalSum
