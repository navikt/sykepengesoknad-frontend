import './banner.less'

import { Sidetittel, Systemtittel } from 'nav-frontend-typografi'
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
        }
        return tekst('sykepengesoknad.sidetittel')
    }

    return (
        <header className="sidebanner">
            <SykSokLokalt />
            <Sidetittel tag="h1" className="sidebanner__tittel">
                {overskrift === undefined ? tittel() : overskrift}
            </Sidetittel>
            <Vis hvis={valgtSoknad && valgtSoknad.fom && valgtSoknad.tom}
                render={() =>
                    <Systemtittel>
                        {tilLesbarPeriodeMedArstall(valgtSoknad!.fom, valgtSoknad!.tom)}
                    </Systemtittel>
                }
            />
        </header>
    )
}

export default Banner
