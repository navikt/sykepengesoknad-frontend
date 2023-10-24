import { Label, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

export const SkeletonSporsmalForm = () => {
    const { stegNo } = useSoknadMedDetaljer()

    if (stegNo == 1) {
        // Checkboxpanel
        return <Skeleton variant="rectangle" className="rounded" height="130px"></Skeleton>
    }
    return (
        // Ja Nei med en tekstlinje
        <>
            <Label as={Skeleton} className="mb-4">
                En placeholder for lengden på et typisk spørsmål. Litt mer
            </Label>
            <Skeleton className="mb-8 mt-4" variant="rectangle" height="32px" width="172px"></Skeleton>
            <Skeleton className="mb-4 rounded md:w-1/2" height="60px" variant="rectangle" />
            <Skeleton className="mb-4 rounded md:w-1/2" height="60px" variant="rectangle" />
        </>
    )
}
