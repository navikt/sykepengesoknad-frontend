import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { OppsummeringProps } from '../oppsummering'

const UndertekstSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Label as="h4" className="mb-2">
                {sporsmal.sporsmalstekst}
            </Label>
            <BodyLong spacing>{parserWithReplace(sporsmal.undertekst ?? '')}</BodyLong>
        </>
    )
}

export default UndertekstSum
