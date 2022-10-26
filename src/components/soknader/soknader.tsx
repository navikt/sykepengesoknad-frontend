import React, { useEffect } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule } from '../../types/types'
import { sorterEtterNyesteFom } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'
import OmSykepenger from '../om-sykepenger/om-sykepenger'
import Vis from '../vis'

import Teasere from './teaser/teasere'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
        sti: null as any,
        erKlikkbar: false,
    },
]

const Soknader = () => {
    const { soknader, setValgtSoknad } = useAppStore()
    const nyeSoknader = soknader
        .filter(
            (soknad) =>
                soknad.status === RSSoknadstatus.NY ||
                soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING ||
                soknad.status === RSSoknadstatus.FREMTIDIG,
        )
        .sort(sorterEtterNyesteFom)
        .reverse()

    const tidligereSoknader = soknader
        .filter(
            (soknad) =>
                soknad.status === RSSoknadstatus.SENDT ||
                soknad.status === RSSoknadstatus.AVBRUTT ||
                soknad.status === RSSoknadstatus.UTGAATT,
        )
        .sort(sorterEtterNyesteFom)

    useEffect(() => {
        setBodyClass('soknader')
        setValgtSoknad(undefined)
    }, [setValgtSoknad, soknader])

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <OmSykepenger />

                <Teasere
                    className="soknader_teasere"
                    soknader={nyeSoknader}
                    tittel={tekst('soknader.nye.tittel')}
                    tomListeTekst={tekst('soknader.nye.ingen-soknader')}
                    id="soknader-list-til-behandling"
                />

                <Vis
                    hvis={tidligereSoknader.length > 0}
                    render={() => (
                        <Teasere
                            className="soknader_teasere"
                            soknader={tidligereSoknader}
                            tittel={tekst('soknader.sendt.tittel')}
                            id="soknader-sendt"
                            kanSorteres={true}
                        />
                    )}
                />
            </div>
        </>
    )
}

export default Soknader
