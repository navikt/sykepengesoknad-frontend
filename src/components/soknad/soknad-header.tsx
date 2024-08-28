import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { forsteBokstavLiten, tekst } from '../../utils/tekster'
import { Banner } from '../banner/banner'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'

export const SoknadHeader = ({ overskrivTittel }: { overskrivTittel?: string | undefined }) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const finnTittel = (tittel?: string | undefined) => {
        if (tittel) return tittel
        let utTittel = ''

        switch (valgtSoknad?.soknadstype) {
            case RSSoknadstype.OPPHOLD_UTLAND:
                utTittel = tekst('sykepengesoknad-utland.tittel')
                break
            case RSSoknadstype.REISETILSKUDD:
                utTittel = tekst('reisetilskuddsoknad.tittel')
                break
            case RSSoknadstype.GRADERT_REISETILSKUDD:
                utTittel = tekst('gradert-reisetilskuddsoknad.tittel')
                break
            default:
                utTittel = tekst('sykepengesoknad.sidetittel')
        }
        if (valgtSoknad?.status === RSSoknadstatus.AVBRUTT) {
            utTittel = 'Fjernet ' + forsteBokstavLiten(utTittel)
        }
        return utTittel
    }
    if (!valgtSoknad) {
        return <Banner overskrift={finnTittel(overskrivTittel)} underoverskrift="placeholder tekst" skeleton={true} />
    }
    return <Banner overskrift={finnTittel(overskrivTittel)} />
}
