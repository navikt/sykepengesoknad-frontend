import { Alert } from '@navikt/ds-react'
import React from 'react'

export function NyIArbeidslivertAlert() {
    return (
        <Alert className="mt-4" variant="info">
            Du har oppgitt at du er ny i arbeidslivet. Før vi kan behandle saken din trenger vi dokumentasjon på
            inntekten din. Etter du har sendt inn denne søknaden vil du få beskjed om hvilken dokumentasjon vi trenger
            og hvordan du sender oss dette.
        </Alert>
    )
}
