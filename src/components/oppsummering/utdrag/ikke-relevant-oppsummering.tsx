import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { OppsummeringProps } from '../oppsummering'

import UndersporsmalSum from './undersporsmal-sum'

const IkkeRelevantOppsummering = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            {sporsmal.sporsmalstekst && <Label as="h4">{sporsmal.sporsmalstekst}</Label>}
            {sporsmal.undertekst && <BodyLong spacing>{tekstMedHtml(sporsmal.undertekst)}</BodyLong>}
            <UndersporsmalSum sporsmalsliste={sporsmal.undersporsmal} />
        </>
    )
}

export default IkkeRelevantOppsummering
