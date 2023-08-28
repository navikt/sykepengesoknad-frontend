import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'

const Fritekst = ({ sporsmal }: OppsummeringProps) => {
    if (sporsmal.svarliste.svar.length === 0) return null
    if (!sporsmal.svarliste.svar[0].verdi) return null
    return (
        <>
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <BodyShort>{sporsmal.svarliste.svar[0].verdi}</BodyShort>
        </>
    )
}

export default Fritekst
