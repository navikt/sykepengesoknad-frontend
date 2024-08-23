import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export const Over70Aar = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) {
        return null
    }

    return (
        <Alert variant="warning" className="mb-8">
            <Heading size="medium" spacing>
                Viktig informasjon
            </Heading>
            <BodyLong spacing>Når du har passert 70 år, har du ikke lenger rett til sykepenger.</BodyLong>
            <BodyLong>
                Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden. Hvis du likevel ønsker å søke, kan vi
                ikke hindre deg i dette.
            </BodyLong>
        </Alert>
    )
}
