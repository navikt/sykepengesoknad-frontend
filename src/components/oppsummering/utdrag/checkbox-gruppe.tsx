import { Label } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { OppsummeringProps, SporsmalVarianter } from '../oppsummering'

const CheckboxGruppe = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>
            {sporsmal.undersporsmal.map((s: Sporsmal, idx) => {
                return <SporsmalVarianter sporsmal={s} key={idx} />
            })}
        </div>
    )
}

export default CheckboxGruppe
