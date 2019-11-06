import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Soknad from './pages/soknad/soknaden';
import Soknader from './pages/soknader/soknader';
import StoreProvider from './data/stores/store-provider';
import { DataFetcher } from './data/data-fetcher';
import Kvittering from './pages/kvittering/kvittering';
import './app.less';

const App = (): any => {
    return (
            <StoreProvider>
                <DataFetcher>
                    <main id="maincontent" role="main" tabIndex={-1}>
                        <BrowserRouter basename={'/nysykepengesoknad'}>
                            <Switch>
                                <Route exact={true} path="/" component={Soknader} />
                                <Route path={'/soknader/:id/:stegId'} component={Soknad} />
                                <Route path={'/soknader/:id'} component={Soknad} />
                                <Route path={'/kvittering/:id'} component={Kvittering} />
                            </Switch>
                        </BrowserRouter>
                    </main>
                </DataFetcher>
            </StoreProvider>
    );
};

export default App;
