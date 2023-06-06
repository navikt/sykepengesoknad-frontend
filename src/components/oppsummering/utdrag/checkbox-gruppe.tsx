import { Label } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { OppsummeringProps, SporsmalVarianter } from '../oppsummering'

const CheckboxGruppe = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Label as="h3" className="mb-2">
                {sporsmal.sporsmalstekst}
            </Label>
            {sporsmal.undersporsmal.map((s: Sporsmal, idx) => (
                <SporsmalVarianter sporsmal={s} key={idx} />
            ))}
        </>
    )
}

export default CheckboxGruppe
