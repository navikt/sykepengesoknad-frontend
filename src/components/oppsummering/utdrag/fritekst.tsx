import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { OppsummeringProps } from '../oppsummering'

const Fritekst = ({ sporsmal }: OppsummeringProps) => {

    return (
        <div className="oppsummering__fritekst">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            <BodyShort className="sist">{sporsmal.svarliste.svar[0].verdi}</BodyShort>
        </div>
    )
}

export default Fritekst
