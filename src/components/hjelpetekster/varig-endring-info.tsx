import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'

export function VarigEndringInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag === 'NARINGSDRIVENDE_VARIG_ENDRING' && jaNeiSvar === 'JA') {
        return (
            <Alert variant="info" className="mt-8">
                <BodyShort spacing>
                    Det kan være vi trenger mer dokumentasjon på dette. Da vil en saksbehandler ta kontakt med deg.
                </BodyShort>
            </Alert>
        )
    }

    return null
}
