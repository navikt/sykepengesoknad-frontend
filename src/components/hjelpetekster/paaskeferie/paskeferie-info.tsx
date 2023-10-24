import { Alert, BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { fraBackendTilDate } from '../../../utils/dato-utils'
import { Sporsmal } from '../../../types/types'
import { innenforPaske } from '../../../utils/helligdager-utils'

import { PaskeferieInfoTekster } from './paskeferie-info-tekster'

export function PaskeferieInfo({ sporsmal, jaNeiSvar }: { sporsmal: Sporsmal; jaNeiSvar: any }) {
    if (sporsmal.tag != 'FERIE_V2' || jaNeiSvar != 'JA') {
        return null
    }
    if (sporsmal.undersporsmal.length != 1) {
        return null
    }
    if (!sporsmal.undersporsmal[0].min || !sporsmal.undersporsmal[0].max) {
        return null
    }

    if (
        innenforPaske(
            fraBackendTilDate(sporsmal.undersporsmal[0].min),
            fraBackendTilDate(sporsmal.undersporsmal[0].max),
        )
    ) {
        return (
            <Alert data-cy="paskeferiehjelp" variant="info" className="mt-8">
                <Label as="h2">{PaskeferieInfoTekster.label}</Label>
                <BodyShort className="mt-2">{PaskeferieInfoTekster.tekst}</BodyShort>
            </Alert>
        )
    }
    return null
}
