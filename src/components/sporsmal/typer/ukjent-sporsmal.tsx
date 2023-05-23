import { Label } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'

interface UkjentSporsmalProps {
    sporsmal: Sporsmal
}

const UkjentSporsmal = ({ sporsmal }: UkjentSporsmalProps) => {
    return (
        <>
            <Label as="h3">
                Ukjent svartype: <code>{sporsmal.svartype}</code>
            </Label>
            <pre>{JSON.stringify(sporsmal, null, 2)}</pre>
        </>
    )
}

export default UkjentSporsmal
