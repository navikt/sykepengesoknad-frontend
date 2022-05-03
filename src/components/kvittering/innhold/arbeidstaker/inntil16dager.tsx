import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../utils/tekster'

const Inntil16dager = () => {
    return (
        <div className="avsnitt">
            <Label as="h4" className="arbeidstaker-tittel">
                {tekst('kvittering.arbeidstaker.tittel')}
            </Label>
            <BodyLong spacing as="span">
                {tekst('kvittering.arbeidstaker.brodtekst')}{' '}
            </BodyLong>
        </div>
    )
}

export default Inntil16dager
