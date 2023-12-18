import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

export function VarigEndringAlert() {
    return (
        <Alert variant="info" className="my-4">
            <BodyShort>
                Du har oppgitt en varig endring i arbeidssituasjonen eller virksomheten din som har ført til en endring
                i inntekt på mer enn 25 prosent. Før vi kan behandle saken din trenger vi dokumentasjon på inntekten din
                etter endringen. Etter du har sendt inn denne søknaden vil du få beskjed om hvilken dokumentasjon vi
                trenger og hvordan du sender oss dette.
            </BodyShort>
        </Alert>
    )
}
