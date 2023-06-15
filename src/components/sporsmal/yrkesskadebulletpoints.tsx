import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal } from '../../types/types'

export const Yrkesskadebullet = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (!skalHaYrkessakdebullet(sporsmal, soknad)) return null

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Godkjente yrkesskader vi har registrert på deg:
            </Label>
            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                {ysdatoer?.map((inntektskilde, index) => (
                    <BodyShort as="li" className="mb-4" key={index}>
                        {inntektskilde}
                    </BodyShort>
                ))}
            </ul>
        </>
    )
}

export function skalHaYrkessakdebullet(sporsmal: Sporsmal, soknad: Soknad) {
    return sporsmal.tag === TagTyper.YRKESSKADE
}

export const ysdatoer = [
    'Skadedato 11. September 1999, Vedtakssdato 13. Mars 2000',
    'Skadedato 15. Januar 1995, Vedtakssdato 13. Mars 1996',
]
