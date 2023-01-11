import { Modal } from '@navikt/ds-react'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import AvbruttSoknad from './components/avbrutt/avbrutt-soknad'
import { RefreshHvisFeilState } from './components/feil/refresh-hvis-feil-state'
import KvitteringSide from './components/kvittering/kvittering-side'
import OpprettUtland from './components/opprett-utland/opprett-utland'
import ResetFocusOnUrlChange from './components/react-router-utils/ResetFocusOnUrlChange'
import SendtSide from './components/sendt/sendt-side'
import Soknad from './components/soknad/soknaden'
import Soknader from './components/soknader/soknader'
import Vedlikehold from './components/vedlikehold/vedlikehold'
import StoreProvider from './data/stores/store-provider'
import { isMockBackend, vedlikehold } from './utils/environment'

export interface RouteParams {
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
            <ResetFocusOnUrlChange>
                <StoreProvider>
                    <Amplitude>
                        <TransitionGroup component={null}>
                            <CSSTransition timeout={{ enter: 500, exit: 0 }} classNames="fade">
                                <main id="maincontent" role="main" tabIndex={-1}>
                                    <RefreshHvisFeilState>
                                        <Switch>
                                            <Route exact={true} path="/" component={Soknader} />
                                            <Route path="/soknader/:id/:stegId" component={Soknad} />
                                            <Route path="/soknader/:id" component={Soknad} />
                                            <Route path="/avbrutt/:id" component={AvbruttSoknad} />
                                            <Route path="/kvittering/:id" component={KvitteringSide} />
                                            <Route path="/sendt/:id" component={SendtSide} />
                                            <Route path="/sykepengesoknad-utland" component={OpprettUtland} />
                                            <Route path="/soknader/">
                                                <Redirect to="/" />
                                            </Route>
                                            <Route path="">
                                                <Redirect to="/" />
                                            </Route>
                                        </Switch>
                                    </RefreshHvisFeilState>
                                </main>
                            </CSSTransition>
                        </TransitionGroup>
                    </Amplitude>
                </StoreProvider>
            </ResetFocusOnUrlChange>
        </BrowserRouter>
    )
}

export default App
