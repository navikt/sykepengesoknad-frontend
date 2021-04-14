import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import RedirectTilOversikt from './pages/feil/redirect-til-oversikt'
import { RefreshHvisFeilState } from './pages/feil/refresh-hvis-feil-state'
import KvitteringSide from './pages/kvittering/kvittering-side'
import OpprettUtland from './pages/opprett-utland/opprett-utland'
import Soknad from './pages/soknad/soknaden'
import Soknader from './pages/soknader/soknader'

export interface RouteParams {
    stegId: string;
    id: string;
}

const App = (): any => {
    const location = useLocation()
    ModalWrapper.setAppElement('#root')

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 768px)')
        let offset = document.getElementById('decorator-header')?.clientHeight || 0
        if (!desktop.matches) {
            offset += document.querySelector('.sidebanner')?.clientHeight || 0
        }
        setTimeout(() => {
            window.scrollTo(0, offset)
        }, 1)

    }, [ location ])

    return (
        <StoreProvider>
            <DataFetcher>
                <Amplitude>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            timeout={{ enter: 500, exit: 500 }}
                            classNames="fade"
                            key={location.key}
                        >
                            <main id="maincontent" role="main" tabIndex={-1}>
                                <RefreshHvisFeilState>
                                    <Switch location={location}>
                                        <Route exact={true} path={'/'} component={Soknader} />
                                        <Route path={'/soknader/:id/:stegId'} component={Soknad} />
                                        <Route path={'/soknader/:id'} component={Soknad} />
                                        <Route path={'/soknader/'} component={RedirectTilOversikt} />
                                        <Route path={'/kvittering/:id'} component={KvitteringSide} />
                                        <Route path={'/sykepengesoknad-utland'} component={OpprettUtland} />
                                    </Switch>
                                </RefreshHvisFeilState>
                            </main>
                        </CSSTransition>
                    </TransitionGroup>
                </Amplitude>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
