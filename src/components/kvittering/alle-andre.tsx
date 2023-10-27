import React from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Vis from '../vis'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import KvitteringVidere from './innhold/kvittering-videre'
import KvitteringStatus from './status/kvittering-status'
import { KvitteringUtenlands } from './innhold/kvittering-utenlands'

const AlleAndre = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

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
