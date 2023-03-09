import { BodyLong, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { OppsummeringProps, SporsmalVarianter } from '../oppsummering'

const UndertekstSum = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__VisUndertekst">
            <Label as="h4">{sporsmal.sporsmalstekst}</Label>
            {sporsmal.undertekst && (
                <BodyLong spacing className="redaksjonelt-innhold">
                    {parser(sporsmal.undertekst)}
                </BodyLong>
            )}
            {sporsmal.undersporsmal.map((s, idx) => (
                <SporsmalVarianter key={idx} sporsmal={s}></SporsmalVarianter>
            ))}
        </div>
    )
}

export default UndertekstSum
