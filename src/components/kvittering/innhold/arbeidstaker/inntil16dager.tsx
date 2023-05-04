import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'

const Inntil16dager = () => {
    return (
        <div className="avsnitt">
            <Label spacing as="h4">
                {tekst('kvittering.arbeidstaker.tittel')}
            </Label>
            <BodyLong spacing as="span">
                {tekst('kvittering.arbeidstaker.brodtekst')}{' '}
            </BodyLong>
        </div>
    )
}

export default Inntil16dager
