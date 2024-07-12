import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { forsteBokstavLiten, tekst } from '../../utils/tekster'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { Banner } from '../banner/banner'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'

export const SoknadHeader = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const tittel = () => {
        let tittel = ''

        switch (valgtSoknad?.soknadstype) {
            case RSSoknadstype.OPPHOLD_UTLAND:
                tittel = tekst('sykepengesoknad-utland.tittel')
                break
            case RSSoknadstype.REISETILSKUDD:
                tittel = tekst('reisetilskuddsoknad.tittel')
                break
            case RSSoknadstype.GRADERT_REISETILSKUDD:
                tittel = tekst('gradert-reisetilskuddsoknad.tittel')
                break
            default:
                tittel = tekst('sykepengesoknad.sidetittel')
        }
        if (valgtSoknad?.status === RSSoknadstatus.AVBRUTT) {
            tittel = 'Fjernet ' + forsteBokstavLiten(tittel)
        }
        return tittel
    }
    if (!valgtSoknad) return <Banner overskrift={tittel()} underoverskrift="placeholder tekst" skeleton={true} />

    function underoverskrift() {
        if (valgtSoknad && valgtSoknad.fom && valgtSoknad.tom) {
            return tilLesbarPeriodeMedArstall(valgtSoknad.fom, valgtSoknad.tom)
        }
    }

    return <Banner overskrift={tittel()} underoverskrift={underoverskrift()} />
}
