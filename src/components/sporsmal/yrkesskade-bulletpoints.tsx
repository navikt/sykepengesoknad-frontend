import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'

export const Yrkesskadebulletpoints = ({ sporsmal }: { sporsmal: Sporsmal }) => {
    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Registrerte yrkesskader:
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
