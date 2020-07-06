import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { OppsummeringProps, SporsmalVarianter } from '../oppsummering'

const CheckboxGruppe = ({ sporsmal }: OppsummeringProps) => {
    return (
        <div className="oppsummering__sporsmal">
            <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
            {sporsmal.undersporsmal.map((s: Sporsmal, idx) => {
                return <SporsmalVarianter sporsmal={s} key={idx} />
            })}
        </div>
    )
}

export default CheckboxGruppe
