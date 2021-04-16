import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import VisBlock from '../vis-block'
import KvitteringUtenlands from './innhold/kvittering-utenlands'
import KvitteringVidere from './innhold/kvittering-videre'
import KvitteringStatus from './status/kvittering-status'

const AlleAndre = () => {
    const { valgtSoknad } = useAppStore()

    return (
        <>
            <KvitteringStatus />
            <VisBlock hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <KvitteringVidere />}
            />
            <VisBlock hvis={valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <KvitteringUtenlands />}
            />
        </>
    )
}

export default AlleAndre
