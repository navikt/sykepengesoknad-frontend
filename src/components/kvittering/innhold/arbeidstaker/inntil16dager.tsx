import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'

const Inntil16dager = () => {
    return (
        <div className="mt-4">
            <Label as="h4">{tekst('kvittering.arbeidstaker.tittel')}</Label>
            <BodyShort as="span">{tekst('kvittering.arbeidstaker.brodtekst')} </BodyShort>
        </div>
    )
}

export default Inntil16dager
