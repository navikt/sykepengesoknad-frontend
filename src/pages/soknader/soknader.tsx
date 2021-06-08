import './soknader.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Teasere from '../../components/soknader/teaser/teasere'
import UtbetalingerLenke from '../../components/soknader/utbetalinger/utbetalinger-lenke'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule } from '../../types/types'
import { sorterEtterNyesteTom } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const Soknader = () => {
    const { soknader } = useAppStore()
    const nyeSoknader = soknader.filter((soknad) =>
        soknad.status === RSSoknadstatus.NY
            || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
            || soknad.status === RSSoknadstatus.FREMTIDIG
    ).sort(sorterEtterNyesteTom).reverse()

    const tidligereSoknader = soknader.filter((soknad) =>
        soknad.status === RSSoknadstatus.SENDT
            || soknad.status === RSSoknadstatus.AVBRUTT
            || soknad.status === RSSoknadstatus.UTGAATT
    ).sort(sorterEtterNyesteTom)

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />
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

                <Vis hvis={tidligereSoknader.length > 0}
                    render={() =>
                        <Teasere
                            className={'soknader_teasere'}
                            soknader={tidligereSoknader}
                            tittel={tekst('soknader.sendt.tittel')}
                            id="soknader-sendt"
                            kanSorteres={true}
                        />
                    }
                />

                <Lenke className="hovedside-lenke" href="/sykefravaer">
                    <VenstreChevron />
                    <Normaltekst tag="span">{tekst('hovedside.lenke')}</Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default Soknader
