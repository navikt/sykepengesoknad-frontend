import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { OppsummeringProps, SporsmalVarianter } from '../oppsummering'
import { Sporsmal } from '../../../types/types'

const IkkeRelevantOppsummering = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Label as="h4" className="mb-2">
                {sporsmal.sporsmalstekst}
            </Label>
            <BodyLong spacing>{parserWithReplace(sporsmal.undertekst ?? '')}</BodyLong>
            {sporsmal.undersporsmal.map((s: Sporsmal, idx) => (
                <SporsmalVarianter sporsmal={s} key={idx} />
            ))}
        </>
    )
}

export default IkkeRelevantOppsummering
