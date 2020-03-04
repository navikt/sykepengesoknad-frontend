import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Soknad from './pages/soknad/soknaden';
import Soknader from './pages/soknader/soknader';
import StoreProvider from './data/stores/store-provider';
import { DataFetcher } from './data/data-fetcher';
import { Amplitude } from './components/amplitude/amplitudeProvider';
import Kvittering from './pages/kvittering/kvittering';
import './app.less';

const App = (): any => {
    const location = useLocation();
    return (
        <StoreProvider>
            <DataFetcher>
                <Amplitude>
                    <main id="maincontent" role="main" tabIndex={-1}>
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout={{ enter: 300, exit: 300 }}
                                classNames={'fade'}
                            >
                                <Switch location={location}>
                                    <Route exact={true} path="/" component={Soknader} />
                                    <Route path={'/soknader/:id/:stegId'} component={Soknad} />
                                    <Route path={'/soknader/:id'} component={Soknad} />
                                    <Route path={'/kvittering/:id'} component={Kvittering} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </main>
                </Amplitude>
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
