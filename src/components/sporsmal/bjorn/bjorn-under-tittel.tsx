import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import Bjorn from './bjorn'


const BjornUnderTittel = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore()

    const harBjorntekst = (tag: TagTyper) =>
        tag === TagTyper.BRUKTE_REISETILSKUDDET ||
        tag === TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER ||
        tag === TagTyper.FRAVER_FOR_BEHANDLING ||
         tag === TagTyper.PERIODEUTLAND ||
        (tag === TagTyper.FERIE_V2 && valgtSoknad?.status === RSSoknadstatus.NY)

    return (
        <Vis hvis={harBjorntekst(sporsmal.tag)}
            render={() =>
                <Bjorn className="blokk-m"
                    nokkel={`soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`}
                />
            }
        />
    )
}

export default BjornUnderTittel
