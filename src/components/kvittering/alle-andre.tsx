import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Vis from '../vis'
import KvitteringStatus from './innhold/kvittering-status'
import KvitteringUtenlands from './innhold/kvittering-utenlands'
import KvitteringVidere from './innhold/kvittering-videre'

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
