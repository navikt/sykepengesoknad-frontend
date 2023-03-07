import { BodyLong, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'

const UndertekstSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__VisUndertekst">
            <Label as="h4">{sporsmal.sporsmalstekst}</Label>
            {sporsmal.undertekst && (
                <BodyLong spacing className="redaksjonelt-innhold">
                    {parser(sporsmal.undertekst)}
                </BodyLong>
            )}
        </div>
    )
}

export default UndertekstSum
