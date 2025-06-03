import { Alert } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'

export function NaringsdrivendeYrkesaktivInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag === 'NARINGSDRIVENDE_NY_I_ARBEIDSLIVET' && jaNeiSvar === 'JA') {
        return (
            <Alert className="mt-4" variant="info">
                Vi trenger mer dokumentasjon på dette fra deg. Etter du har sendt inn denne søknaden vil du få beskjed
                om hva vi trenger og hvordan du sender det til oss.
            </Alert>
        )
    }

    return null
}
