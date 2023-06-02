import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { Soknad, Sporsmal } from '../../types/types'

export const Inntektsbulletpoints = ({ sporsmal, soknad }: { sporsmal: Sporsmal; soknad: Soknad }) => {
    if (!skalHaInntektsbulletpoints(sporsmal, soknad)) return null

    return (
        <>
            <div className="mb-10 mt-4">
                <Label as="p" className="mb-4">
                    Arbeidsforhold vi har registrert på deg:
                </Label>
                <ul data-cy="inntektskilder--fra-inntektskomponenten-liste">
                    <BodyShort as="li" className="mb-4">
                        {soknad.arbeidsgiver?.navn}
                    </BodyShort>
                    {soknad.inntektskilderDataFraInntektskomponenten?.map((inntektskilde, index) => {
                        return (
                            <BodyShort as="li" className="mb-4" key={index}>
                                {inntektskilde.navn}
                            </BodyShort>
                        )
                    })}
                </ul>
            </div>
            <Label as="span" className="mb-4">
                Har du andre inntektskilder enn nevnt over?
            </Label>
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
