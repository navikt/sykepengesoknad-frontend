import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import VisBlock from '../../vis-block'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import Bjorn from './bjorn'

const BjornUnderTittel = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore()

    const harBjorntekst = (tag: TagTyper) =>
        tag === TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER ||
        tag === TagTyper.ARBEID_UTENFOR_NORGE ||
        tag === TagTyper.FRAVER_FOR_BEHANDLING ||
        tag === TagTyper.PERMISJON_V2 ||
        tag === TagTyper.PERMITTERT_NAA ||
        tag === TagTyper.PERMITTERT_PERIODE ||
        (tag === TagTyper.FERIE_V2 && valgtSoknad?.soknadstype === RSSoknadstype.ARBEIDSTAKERE)

    return (
        <VisBlock hvis={harBjorntekst(sporsmal.tag)}
            render={() => {
                return (
                    <Bjorn className="blokk-m"
                        nokkel={`soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`}
                    />
                )
            }}
        />
    )
}

export default BjornUnderTittel
