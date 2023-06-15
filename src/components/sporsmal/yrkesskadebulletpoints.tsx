import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal } from '../../types/types'

export const Yrkesskadebullet = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (!skalHaYrkessakdebullet(sporsmal, soknad)) return null

    const datoer = ["2001-11-09 (vedtakssdato 2022-02-03)", "1995-01-15 (vedtakssdato 2022-02-03)"]
    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Godkjente yrkesskader vi har registrert på deg:
            </Label>
            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                {datoer?.map((inntektskilde, index) => (
                    <BodyShort as="li" className="mb-4" key={index}>
                        {inntektskilde}
                    </BodyShort>
                ))}
            </ul>
        </>
    )
}

export function skalHaYrkessakdebullet(sporsmal: Sporsmal, soknad: Soknad) {
    return (
        sporsmal.tag === TagTyper.YRKESSKADE
    )
}
