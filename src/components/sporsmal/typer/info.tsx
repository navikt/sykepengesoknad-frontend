import { Label } from '@navikt/ds-react'
import React from 'react'

import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const Info = ({ sporsmal }: SpmProps) => {
    return (
        <>
            <Label as="h2">{sporsmal.sporsmalstekst}</Label>
            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />
        </>
    )
}

export default Info
