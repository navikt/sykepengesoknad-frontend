import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { OppsummeringProps } from '../oppsummering'

const UndertekstSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__VisUndertekst">
            <Label as="h4">{sporsmal.sporsmalstekst}</Label>
            <BodyLong spacing className="redaksjonelt-innhold">
                {parserWithReplace(sporsmal.undertekst ?? '')}
            </BodyLong>
        </div>
    )
}

export default UndertekstSum
