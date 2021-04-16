import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { Sporsmal } from '../../../types/types'
import VisBlock from '../../vis-block'
import { fjernIndexFraTag } from '../sporsmal-utils'
import Bjorn from './bjorn'

const tagsMedBjorn = {
    soknadstype: RSSoknadstype.ARBEIDSTAKERE,
    tagtyper: [ TagTyper.JOBBET_DU_GRADERT, TagTyper.JOBBET_DU_100_PROSENT ],
}

interface TagBjornProps {
    sporsmal: Sporsmal;
    className?: string;
}

const TagBjorn = ({ sporsmal, className }: TagBjornProps) => {
    const { valgtSoknad } = useAppStore()
    const tag = sporsmal.tag

    const harBjorntekst = (tag: TagTyper) => {
        return tagsMedBjorn.soknadstype === valgtSoknad!.soknadstype && tagsMedBjorn.tagtyper.includes(tag)
    }

    return (
        <VisBlock hvis={harBjorntekst(tag)}
            render={() => <Bjorn className={className} nokkel={`soknad.bjorn.${fjernIndexFraTag(tag).toLowerCase()}`} />}
        />
    )
}

export default TagBjorn
