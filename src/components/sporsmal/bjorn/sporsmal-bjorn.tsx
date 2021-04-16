import React from 'react'

import { SvarEnums, TagTyper } from '../../../types/enums'
import VisBlock from '../../vis-block'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import Bjorn from './bjorn'

export const SporsmalBjorn = ({ sporsmal }: SpmProps) => {
    const svar = sporsmal.svarliste.svar[0] !== undefined ? sporsmal.svarliste.svar[0].verdi : ''

    const vis = (sporsmal.tag === TagTyper.SYKMELDINGSGRAD && svar === SvarEnums.NEI) ||
        (sporsmal.tag === TagTyper.FERIE && svar === SvarEnums.JA)

    const nokkel = vis ? 'sykepengesoknad-utland.skjema.bjorn' : 'sykepengesoknad-utland.skjema.ferie-sporsmal-bjorn'

    return (
        <VisBlock hvis={vis}
            render={() => <Bjorn className="press" nokkel={nokkel} />}
        />
    )
}

export default SporsmalBjorn
