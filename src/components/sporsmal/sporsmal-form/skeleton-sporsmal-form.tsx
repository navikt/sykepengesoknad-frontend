import { Button, Label, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

export const SkeletonSporsmalForm = () => {
    const { stegNo } = useSoknadMedDetaljer()

    if (stegNo == 1) {
        // Checkboxpanel
        return (
            <>
                <Skeleton variant="rectangle" className="rounded-sm" height="131px"></Skeleton>
                <div className="my-8">
                    <Button as={Skeleton} variant="primary" type="submit" className="mb-12 mt-6 inline-flex">
                        Gå videre
                    </Button>
                    <Button as={Skeleton} variant="tertiary" type="button" className="flex">
                        Avslutt og fortsett senere
                    </Button>
                    <Button as={Skeleton} variant="tertiary" type="button" className="flex">
                        Jeg vil slette denne søknaden
                    </Button>
                </div>
            </>
        )
    }
    return (
        // Ja Nei med en tekstlinje
        <>
            <Label as={Skeleton} className="mb-4">
                En placeholder for lengden på et typisk spørsmål. Litt mer
            </Label>
            <Skeleton className="mb-8 mt-4" variant="rectangle" height="32px" width="172px"></Skeleton>
            <Skeleton className="mb-4 rounded-sm md:w-1/2" height="60px" variant="rectangle" />
            <Skeleton className="mb-4 rounded-sm md:w-1/2" height="60px" variant="rectangle" />
            <div className="my-8">
                <Button as={Skeleton} variant="primary" type="submit" className="mb-12 mt-14 flex">
                    Gå videre
                </Button>
                <Button as={Skeleton} variant="tertiary" type="button" className="flex">
                    Avslutt og fortsett senere
                </Button>
                <Button as={Skeleton} variant="tertiary" type="button" className="flex">
                    Jeg vil slette denne søknaden
                </Button>
            </div>
        </>
    )
}
