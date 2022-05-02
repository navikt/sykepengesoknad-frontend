import { Modal } from '@navikt/ds-react'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import RedirectTilOversikt from './components/feil/redirect-til-oversikt'
import { RefreshHvisFeilState } from './components/feil/refresh-hvis-feil-state'
import KvitteringSide from './components/kvittering/kvittering-side'
import OpprettUtland from './components/opprett-utland/opprett-utland'
import Soknad from './components/soknad/soknaden'
import Soknader from './components/soknader/soknader'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import { isMockBackend } from './utils/environment'

export interface RouteParams {
    stegId: string
    id: string
}

if (isMockBackend()) {
    require('./data/mock')
}

const App = (): any => {
    // const location = useLocation()
    // eslint-disable-next-line
    // @ts-ignore
    Modal.setAppElement('#root')

    /*
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
    */

    return (
        <BrowserRouter basename="/syk/sykepengesoknad">
            <StoreProvider>
                <DataFetcher>
                    <Amplitude>
                        <TransitionGroup component={null}>
                            <CSSTransition
                                timeout={{ enter: 500, exit: 0 }}
                                classNames="fade"
                            >
                                <main id="maincontent" role="main" tabIndex={-1}>
                                    <RefreshHvisFeilState>
                                        <Switch>
                                            <Route exact={true} path="/" component={Soknader} />
                                            <Route path="/soknader/:id/:stegId" component={Soknad} />
                                            <Route path="/soknader/:id" component={Soknad} />
                                            <Route path="/soknader/" component={RedirectTilOversikt} />
                                            <Route path="/kvittering/:id" component={KvitteringSide} />
                                            <Route path="/sykepengesoknad-utland" component={OpprettUtland} />
                                        </Switch>
                                    </RefreshHvisFeilState>
                                </main>
                            </CSSTransition>
                        </TransitionGroup>
                    </Amplitude>
                </DataFetcher>
            </StoreProvider>
        </BrowserRouter>
    )
}

export default App
