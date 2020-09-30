import './soknader.less'

import { Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Teasere from '../../components/soknader/teaser/teasere'
import UtbetalingerLenke from '../../components/soknader/utbetalinger/utbetalinger-lenke'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule, Soknad } from '../../types/types'
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

export const filtrerOgSorterNyeSoknader = (soknader: Soknad[]) => {
    return soknader.filter(soknad =>
        soknad.status === RSSoknadstatus.NY ||
        soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING ||
        soknad.status === RSSoknadstatus.FREMTIDIG
    ).sort(sorterEtterOpprettetDato)
}

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const Soknader = () => {
    const { soknader } = useAppStore()
    const nyeSoknader = filtrerOgSorterNyeSoknader(soknader)

    const tidligereSoknader = soknader
        .filter((soknad) =>
            soknad.status === RSSoknadstatus.SENDT
            || soknad.status === RSSoknadstatus.AVBRUTT
            || soknad.status === RSSoknadstatus.UTGAATT
        ).sort(sorterEtterPerioder)

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">{tekst('soknader.sidetittel')}</Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Teasere
                    className={'soknader_teasere'}
                    soknader={nyeSoknader}
                    tittel={tekst('soknader.nye.tittel')}
                    tomListeTekst={tekst('soknader.nye.ingen-soknader')}
                    id="soknader-list-til-behandling"
                />

                <UtbetalingerLenke />

                <Vis hvis={tidligereSoknader.length > 0}>
                    <Teasere
                        className={'soknader_teasere'}
                        soknader={tidligereSoknader}
                        tittel={tekst('soknader.sendt.tittel')}
                        id="soknader-sendt"
                        kanSorteres={true}
                    />
                </Vis>
            </div>
        </>
    )
}

export default Soknader
