import React from 'react'
import { useParams } from 'react-router-dom'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Vis from '../vis'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'

import KvitteringUtenlands from './innhold/kvittering-utenlands'
import KvitteringVidere from './innhold/kvittering-videre'
import KvitteringStatus from './status/kvittering-status'

const AlleAndre = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    return (
        <>
            <KvitteringStatus />
            <Vis hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND} render={() => <KvitteringVidere />} />
            <Vis
                hvis={valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <KvitteringUtenlands />}
            />
        </>
    )
}

export default AlleAndre
