import React from 'react'

import KvitteringStatus from './innhold/kvittering-status'
import KvitteringVidere from './innhold/kvittering-videre'
import Vis from '../vis'
import KvitteringUtenlands from './innhold/kvittering-utenlands'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

const AlleAndre = () => {
    const { valgtSoknad } = useAppStore()

    return (
        <>
            <KvitteringStatus />
            <Vis hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                <KvitteringVidere />
            </Vis>
            <Vis hvis={valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND}>
                <KvitteringUtenlands />
            </Vis>
        </>
    )
}

export default AlleAndre
