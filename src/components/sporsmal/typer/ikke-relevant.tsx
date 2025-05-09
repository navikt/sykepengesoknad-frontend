import { BodyLong, Heading, Label } from '@navikt/ds-react'
import React from 'react'

import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    if (sporsmal.tag.includes('KJENTE_INNTEKTSKILDER_GRUPPE_TITTEL')) {
        return (
            <Heading size="medium" level="3" className="p-4 bg-gray-100 rounded-sm">
                {sporsmal.sporsmalstekst}
            </Heading>
        )
    }
    return (
        <div className="mt-4 rounded-md border border-gray-600 p-4">
            <Label as="h2" className="mb-4">
                {sporsmal.sporsmalstekst}
            </Label>
            {sporsmal.undertekst && <BodyLong as="div">{tekstMedHtml(sporsmal.undertekst)}</BodyLong>}
        </div>
    )
}

export default IkkeRelevant
