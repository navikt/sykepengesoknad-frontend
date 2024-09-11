import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

export function VarigEndringAlert() {
    return (
        <Alert variant="info" className="my-4">
            <BodyShort>Etter du har sendt inn søknaden trenger vi dokumentasjon på den varige endringen din.</BodyShort>
        </Alert>
    )
}
