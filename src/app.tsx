import { Modal } from '@navikt/ds-react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AvbruttSoknad from './components/avbrutt/avbrutt-soknad'
import { FeilStateView } from './components/feil/refresh-hvis-feil-state'
import KvitteringSide from './components/kvittering/kvittering-side'
import OpprettUtland from './components/opprett-utland/opprett-utland'
import OnUrlChange from './components/react-router-utils/OnUrlChange'
import SendtSide from './components/sendt/sendt-side'
import Soknad from './components/soknad/soknaden'
import Listevisning from './components/listevisning/listevisning'
import Vedlikehold from './components/vedlikehold/vedlikehold'
import { isMockBackend, vedlikehold } from './utils/environment'

export type RouteParams = {
    stegId: string
    id: string
}

if (isMockBackend()) {
    require('./data/mock')
}

function erFlex(): boolean {
    const url = new URL(window.location.href)
    const flex = url.searchParams.get('flex')
    return flex === 'true'
}

const App = (): any => {
    // eslint-disable-next-line
    // @ts-ignore
    Modal.setAppElement('#root')

    if (vedlikehold() && !erFlex()) {
        return <Vedlikehold />
    }
    //
    return (
        <BrowserRouter basename="/syk/sykepengesoknad">
            <OnUrlChange>
                <main id="maincontent" role="main" tabIndex={-1}>
                    <Routes>
                        <Route path="/" element={<Listevisning />} />
                        <Route path="soknader" element={<Listevisning />} />
                        <Route path="soknader/:id" element={<Soknad />} />
                        <Route path="soknader/:id/:stegId" element={<Soknad />} />
                        <Route path="avbrutt/:id" element={<AvbruttSoknad />} />
                        <Route path="kvittering/:id" element={<KvitteringSide />} />
                        <Route path="sendt/:id" element={<SendtSide />} />
                        <Route path="sykepengesoknad-utland" element={<OpprettUtland />} />
                        <Route path="feil-state" element={<FeilStateView />} />
                    </Routes>
                </main>
            </OnUrlChange>
        </BrowserRouter>
    )
}

export default App
