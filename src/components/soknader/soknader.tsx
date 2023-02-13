import React, { useEffect } from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { sorterEtterNyesteFom } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Banner from '../banner/banner'
import OmSykepenger from '../om-sykepenger/om-sykepenger'
import Vis from '../vis'
import useSoknader from '../../hooks/useSoknader'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'

import Teasere from './teaser/teasere'

const Soknader = () => {
    const { data: soknader } = useSoknader()

    useUpdateBreadcrumbs(() => [], [])

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    if (!soknader) return <QueryStatusPanel />

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

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />

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
        </>
    )
}

export default Soknader
