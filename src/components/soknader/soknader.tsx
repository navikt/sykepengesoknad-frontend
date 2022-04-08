import './soknader.less'

import { BodyShort, Link } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule } from '../../types/types'
import env from '../../utils/environment'
import { sorterEtterNyesteTom } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'
import OmSykepenger from '../om-sykepenger/om-sykepenger'
import Vis from '../vis'
import Teasere from './teaser/teasere'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const Soknader = () => {
    const { soknader, setValgtSoknad } = useAppStore()
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
        setValgtSoknad(undefined)
        // eslint-disable-next-line
    }, [])

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

                <Vis hvis={tidligereSoknader.length > 0}
                    render={() =>
                        <Teasere
                            className="soknader_teasere"
                            soknader={tidligereSoknader}
                            tittel={tekst('soknader.sendt.tittel')}
                            id="soknader-sendt"
                            kanSorteres={true}
                        />
                    }
                />

                <Link className="dinesaker-lenke" href={env.dinesakerUrl()}>
                    <BodyShort as="span">{tekst('dinesaker.lenke')}</BodyShort>
                </Link>
            </div>
        </>
    )
}

export default Soknader
