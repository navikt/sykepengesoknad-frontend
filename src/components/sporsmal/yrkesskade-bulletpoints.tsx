import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { Sporsmal } from '../../types/types'

export const Yrkesskadebulletpoints = ({ sporsmal }: { sporsmal: Sporsmal }) => {
    if (sporsmal.tag !== TagTyper.YRKESSKADE_V2) return null

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Godkjente yrkesskader vi har registrert på deg:
            </Label>
            <ul className="mb-10">
                {sporsmal.undersporsmal[0].undersporsmal.map((y, index) => {
                    return (
                        <BodyShort as="li" className="mb-4" key={index}>
                            {y.sporsmalstekst}
                        </BodyShort>
                    )
                })}
            </ul>
        </>
    )
}
