import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { Sporsmal } from '../../../types/types'

interface UkjentSporsmalProps {
    sporsmal: Sporsmal;
}

const UkjentSporsmal = ({ sporsmal }: UkjentSporsmalProps) => {
    return (
        <>
            <Element tag="h3" className="skjema__sporsmal">Ukjent svartype: <code>{sporsmal.svartype}</code></Element>
            <pre>{JSON.stringify(sporsmal, null, 2)}</pre>
        </>
    )
}

export default UkjentSporsmal
