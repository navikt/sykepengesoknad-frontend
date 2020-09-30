import './kvittering.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import { HotjarTrigger } from '../../components/hotjar-trigger'
import Kvittering from '../../components/kvittering/kvittering'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekst('kvittering.sidetittel'),
    sti: null as any,
    erKlikkbar: false,
} ]

const KvitteringSide = () => {
    const { valgtSoknad, soknader, setValgtSoknad, setValgtSykmelding, sykmeldinger } = useAppStore()
    const [ erSiste, setErSiste ] = useState<boolean>()

    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find(soknad => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        setBodyClass('kvittering')
        setErSiste(valgtSoknad?.status === RSSoknadstatus.SENDT)
        // eslint-disable-next-line
    }, []);

    if (!valgtSoknad) return null

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">{tekst('kvittering.sidetittel')}</Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <HotjarTrigger soknadstype={valgtSoknad.soknadstype}>
                    <Kvittering />
                </HotjarTrigger>

                <Vis hvis={erSiste}>
                    <Link to="/" className="gaa-videre">
                        <Normaltekst tag="span">
                            <VenstreChevron />
                            {tekst('sykepengesoknad.navigasjon.gaa-til')}
                        </Normaltekst>
                    </Link>
                </Vis>
            </div>
        </>
    )
}

export default KvitteringSide
