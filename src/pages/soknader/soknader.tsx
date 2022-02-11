import './soknader.less'

import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import OmSykepenger from '../../components/om-sykepenger/om-sykepenger'
import Teasere from '../../components/soknader/teaser/teasere'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule } from '../../types/types'
import env from '../../utils/environment'
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
                    className={'soknader_teasere'}
                    soknader={nyeSoknader}
                    tittel={tekst('soknader.nye.tittel')}
                    tomListeTekst={tekst('soknader.nye.ingen-soknader')}
                    id="soknader-list-til-behandling"
                />

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

                <Lenke className="dinesaker-lenke" href={env.dinesakerUrl()}>
                    <Normaltekst tag="span">{tekst('dinesaker.lenke')}</Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default Soknader
