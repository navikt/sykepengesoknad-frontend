import React from 'react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { Banner } from '../banner/banner'

export const SoknadHeader = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const tittel = () => {
        if (valgtSoknad) {
            if (valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return tekst('sykepengesoknad-utland.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.INNTEKTSOPPLYSNINGER_FOR_NARINGSDRIVENDE) {
                return "Inntektsopplysninger for næringsdrivende"
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
                return tekst('reisetilskuddsoknad.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) {
                return tekst('gradert-reisetilskuddsoknad.tittel')
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
