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
            <BodyShort className="sist">{svar[0].verdi}</BodyShort>
        ) : (
            <ul>
                {sporsmal.svarliste.svar.map((s) => {
                    return (
                        <BodyShort as="li" key={s.verdi.toString()}>
                            {s.verdi}
                        </BodyShort>
                    )
                })}
            </ul>
        )
    return (
        <>
            <Label as="h3" className="mb-2">
                {sporsmal.sporsmalstekst}
            </Label>
            <div>{svarliste}</div>
        </>
    )
}

export default LandSum
