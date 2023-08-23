import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'

const LandSum = ({ sporsmal }: OppsummeringProps) => {
    const svar = sporsmal.svarliste.svar
    if (!svar || sporsmal.svarliste.svar.length === 0) {
        return null
    }

    const svarliste =
        svar.length === 1 ? (
            <BodyShort>{svar[0].verdi}</BodyShort>
        ) : (
            <ul>
                {sporsmal.svarliste.svar.map((s) => (
                    <BodyShort as="li" key={s.verdi.toString()}>
                        {s.verdi}
                    </BodyShort>
                ))}
            </ul>
        )
    return (
        <>
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            {svarliste}
        </>
    )
}

export default LandSum
