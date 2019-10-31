import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Soknad from './pages/soknaden/soknaden';
import Soknader from './pages/soknader/soknader';
import StoreProvider from './data/stores/store-provider';
import { DataFetcher } from './data/data-fetcher';
import Sporsmalene from './pages/sporsmal/sporsmalene';
import Kvittering from './pages/kvittering/kvittering';
import './app.less';

const App = (): any => {
    return (
            <StoreProvider>
                <DataFetcher>
                    <main id="maincontent" role="main" tabIndex={-1}>
                        <BrowserRouter basename={'/'}>
                            <Switch>
                                <Route exact={true} path="/" component={Soknader} />
                                <Route path={'/soknader/:id'} component={Soknad} />
                                <Route path={'/sporsmal/:id/:steg'} component={Sporsmalene} />
                                <Route path={'/kvittering/:id'} component={Kvittering} />
                            </Switch>
                        </BrowserRouter>
                    </main>
                </DataFetcher>
            </StoreProvider>
    );
};

export default App;
