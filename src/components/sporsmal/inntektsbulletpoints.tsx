import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (!skalHaInntektsbulletpoints(sporsmal, soknad)) return null

    return (
        <>
            <Label as="p" className="mb-4 mt-10">
                Arbeidsforhold vi har registrert på deg:
            </Label>
            <ul data-cy="inntektskilder--fra-inntektskomponenten-liste" className="mb-10">
                <BodyShort as="li" className="mb-4">
                    {soknad.arbeidsgiver?.navn}
                </BodyShort>
                {soknad.inntektskilderDataFraInntektskomponenten?.map((inntektskilde, index) => (
                    <BodyShort as="li" className="mb-4" key={index}>
                        {inntektskilde.navn}
                    </BodyShort>
                ))}
            </ul>
        </>
    )
}

export function skalHaInntektsbulletpoints(sporsmal: Sporsmal, soknad: Soknad) {
    return (
        sporsmal.tag === TagTyper.ANDRE_INNTEKTSKILDER_V2 &&
        typeof soknad.inntektskilderDataFraInntektskomponenten !== 'undefined' &&
        soknad.inntektskilderDataFraInntektskomponenten !== null
    )
}
