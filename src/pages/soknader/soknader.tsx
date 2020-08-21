import './soknader.less'

import { Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

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
        soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
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

    const fremtidigeSoknader = soknader
        .filter((soknad) => soknad.status === RSSoknadstatus.FREMTIDIG)
        .sort(sorterEtterPerioder)
        .reverse()

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    return (
        <>
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />
                <Sidetittel tag="h1" className="sidetopp__tittel">
                    {tekst('soknader.sidetittel')}
                </Sidetittel>
                <Teasere
                    className={'soknader_teasere'}
                    soknader={nyeSoknader}
                    tittel={tekst('soknader.nye.tittel')}
                    tomListeTekst={tekst('soknader.nye.ingen-soknader')}
                    id="soknader-list-til-behandling"
                />

                <Vis hvis={fremtidigeSoknader.length > 0}>
                    <Teasere
                        className={'soknader_teasere'}
                        soknader={fremtidigeSoknader}
                        tittel={tekst('soknader.planlagt.tittel')}
                        id="soknader-planlagt"
                    />
                </Vis>

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
