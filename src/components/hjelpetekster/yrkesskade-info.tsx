import { Alert } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../types/types'
import { TagTyper } from '../../types/enums'

export function YrkesskadeInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag == TagTyper.YRKESSKADE && jaNeiSvar == 'JA') {
        return null
    }

    return null
}
