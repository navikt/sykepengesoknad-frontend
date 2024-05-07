import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { Banner } from '../banner/banner'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'

export const SoknadHeader = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const tittel = () => {
        if (valgtSoknad) {
            if (valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return tekst('sykepengesoknad-utland.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
                return tekst('reisetilskuddsoknad.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) {
                return tekst('gradert-reisetilskuddsoknad.tittel')
            }
            if (valgtSoknad.status === RSSoknadstatus.AVBRUTT) {
                return tekst('sykepengesoknad.avbrutt.tittel')
            }
        }
        return tekst('sykepengesoknad.sidetittel')
    }
    if (!valgtSoknad) return <Banner overskrift={tittel()} underoverskrift="placeholder tekst" skeleton={true} />

    function underoverskrift() {
        if (valgtSoknad && valgtSoknad.fom && valgtSoknad.tom) {
            return tilLesbarPeriodeMedArstall(valgtSoknad.fom, valgtSoknad.tom)
        }
    }

    return <Banner overskrift={tittel()} underoverskrift={underoverskrift()} />
}
