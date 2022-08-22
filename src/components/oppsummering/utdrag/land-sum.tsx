import { BodyLong, BodyShort, Label } from '@navikt/ds-react'
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
            <ul className="oppsummering__landliste">
                {sporsmal.svarliste.svar.map((s) => {
                    return (
                        <BodyShort as="li" className="oppsummering__land" key={s.verdi.toString()}>
                            {s.verdi}
                        </BodyShort>
                    )
                })}
            </ul>
        )
    return (
        <div className="oppsummering__fritekst">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <BodyLong className="oppsummering__tekstsvar">{svarliste}</BodyLong>
        </div>
    )
}

export default LandSum
