import Hjelpetekst from 'nav-frontend-hjelpetekst'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { tekst } from '../../utils/tekster'
import { SpmProps } from './sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from './sporsmal-utils'

const SporsmalHjelpetekst = ({ sporsmal }: SpmProps) => {

    const vis = sporsmal.tag === TagTyper.EGENMELDINGER ||
        sporsmal.tag === TagTyper.FERIE_PERMISJON_UTLAND ||
        sporsmal.tag === TagTyper.FERIE_V2 ||
        sporsmal.tag === TagTyper.TRANSPORT_TIL_DAGLIG

    const nokkel = fjernIndexFraTag(sporsmal.tag)

    return vis
        ? <Hjelpetekst> {tekst(`soknad.hjelpetekst.${nokkel}` as any)} </Hjelpetekst>
        : <></>
}

export default SporsmalHjelpetekst
