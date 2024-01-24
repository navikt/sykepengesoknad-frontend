import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'

export function YrkesskadeInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag == 'YRKESSKADE_V2' && jaNeiSvar == 'JA') {
        return (
            <Alert variant="info" data-cy="yrkesskade-info" className="mt-8">
                <BodyShort spacing>
                    Dette betyr at du har en godkjent yrkesskade, eller har en påbegynt / nylig innsendt skademelding
                    som er årsaken til dette sykefraværet.
                </BodyShort>
                <BodyShort>
                    En saksbehandler må gå gjennom saken din og vurdere om sykefraværet ditt er knyttet til en godkjent
                    yrkesskade. Dette vil forlenge saksbehandlingstiden.
                </BodyShort>
            </Alert>
        )
    }

    return null
}
