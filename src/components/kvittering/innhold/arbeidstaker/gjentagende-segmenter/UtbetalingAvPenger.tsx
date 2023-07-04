import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../../utils/tekster'
import { parserWithReplace } from '../../../../../utils/html-react-parser-utils'

function UtbetalingAvPenger() {
    return (
        <div className="mt-8">
            <Label as="h2" spacing>
                {tekst('kvittering.naar-blir-pengene')}
            </Label>
            <BodyShort spacing>
                {parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-arbeidsgiver'))}
            </BodyShort>
            <BodyShort spacing>{parserWithReplace(tekst('kvittering.arbeidstaker.over16.utbetaling-NAV'))}</BodyShort>
        </div>
    )
}

export default UtbetalingAvPenger
