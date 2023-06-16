import React from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'

import KvitteringUtenlands from './innhold/kvittering-utenlands'
import KvitteringVidere from './innhold/kvittering-videre'
import KvitteringStatus from './status/kvittering-status'

const AlleAndre = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    if (!valgtSoknad) return null

    return (
        <>
            <KvitteringStatus />
            <Vis hvis={valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND} render={() => <KvitteringVidere />} />
            <Vis
                hvis={valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <KvitteringUtenlands />}
            />
        </>
    )
}

export default AlleAndre
