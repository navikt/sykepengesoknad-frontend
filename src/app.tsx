import { Modal } from '@navikt/ds-react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AvbruttSoknad from './components/avbrutt/avbrutt-soknad'
import { FeilStateView } from './components/feil/refresh-hvis-feil-state'
import KvitteringSide from './components/kvittering/kvittering-side'
import SendtSide from './components/sendt/sendt-side'
import Soknad from './components/soknad/soknaden'
import Listevisning from './components/listevisning/listevisning'
import Vedlikehold from './components/vedlikehold/vedlikehold'
import { vedlikehold } from './utils/environment'

export type RouteParams = {
    stegId: string
    id: string
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
            <main id="maincontent" role="main" tabIndex={-1}>
                <Routes>
                    <Route path="/" element={<Listevisning />} />
                    <Route path="soknader" element={<Listevisning />} />
                    <Route path="soknader/:id" element={<Soknad />} />
                    <Route path="soknader/:id/:stegId" element={<Soknad />} />
                    <Route path="avbrutt/:id" element={<AvbruttSoknad />} />
                    <Route path="kvittering/:id" element={<KvitteringSide />} />
                    <Route path="sendt/:id" element={<SendtSide />} />
                    <Route path="feil-state" element={<FeilStateView />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
