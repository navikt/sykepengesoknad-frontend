import { Alert } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'
import { TagTyper } from '../../types/enums'

export function YrkesskadeInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag == TagTyper.YRKESSKADE && jaNeiSvar == 'JA') {
        return (
            <Alert variant={'info'} data-cy={'yrkesskade-info'} className="mt-8">
                Dette betyr at du har en godkjent yrkesskade, har en påbegynt eller kommende skademelding til
                behandling.
            </Alert>
        )
    }

    return null
}