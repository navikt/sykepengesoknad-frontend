import React from 'react'

import { TagTyper } from '../../../types/enums'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import Bjorn from './bjorn'

const BjornOverSporsmalstekst = ({ sporsmal }: SpmProps) => {
    const bjornTekst = `soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`

    const bjornVeileder = (tag: TagTyper) =>
        tag === TagTyper.BRUKTE_REISETILSKUDDET ||
        tag === TagTyper.FRAVER_FOR_BEHANDLING ||
        tag === TagTyper.PERIODEUTLAND

    return (
        <>
            <Vis hvis={bjornVeileder(sporsmal.tag)} render={() => <Bjorn className="blokk-m" nokkel={bjornTekst} />} />
        </>
    )
}

export default BjornOverSporsmalstekst
