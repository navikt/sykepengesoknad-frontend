import React from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
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
            {valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && <KvitteringVidere />}
            {valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && <KvitteringUtenlands />}
        </>
    )
}

export default AlleAndre
