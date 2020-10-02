import './banner.less'

import { Ingress, Sidetittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import SykSokLokalt from '../brodsmuler/syk-sok-lokalt'
import Vis from '../vis'

interface BannerProps {
    overskrift?: string;
}

const Banner = ({ overskrift }: BannerProps) => {
    const { valgtSoknad } = useAppStore()

    const erUtlandssoknad = valgtSoknad && valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const tittel = erUtlandssoknad
        ? tekst('sykepengesoknad-utland.tittel')
        : tekst('sykepengesoknad.sidetittel')

    return (
        <header className="sidebanner">
            <SykSokLokalt />
            <Sidetittel tag="h1" className="sidebanner__tittel">
                {overskrift === undefined ? tittel : overskrift}
            </Sidetittel>
            <Vis hvis={!erUtlandssoknad}>
                <Ingress tag="h2"
                    className="sidebanner__tittel">{tekst('sykepengesoknad.banner.for')} {tilLesbarPeriodeMedArstall(valgtSoknad?.fom, valgtSoknad?.tom)}</Ingress>
            </Vis>
        </header>
    )
}

export default Banner
