import './banner.less'

import { Ingress, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import SykSokLokalt from '../brodsmuler/syk-sok-lokalt'
import Vis from '../vis'

const Banner = () => {
    const { valgtSoknad } = useAppStore()

    const erUtlandssoknad = valgtSoknad && valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const tittel = erUtlandssoknad
        ? tekst('sykepengesoknad-utland.tittel')
        : tekst('sykepengesoknad.sidetittel')

    return (
        <header className='soknadtopp'>
            <SykSokLokalt />
            <Systemtittel tag='h1' className='soknadtopp__tittel'>{tittel}</Systemtittel>
            <Vis hvis={!erUtlandssoknad}>
                <Ingress tag='h2'
                    className='soknadtopp__tittel'>{tekst('sykepengesoknad.banner.for')} {tilLesbarPeriodeMedArstall(valgtSoknad?.fom, valgtSoknad?.tom)}</Ingress>
            </Vis>
        </header>
    )
}

export default Banner
