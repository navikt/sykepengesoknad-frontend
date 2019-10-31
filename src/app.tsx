import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Soknad from './pages/soknaden/soknaden';
import Soknader from './pages/soknader/soknader';
import StoreProvider from './data/stores/store-provider';
import { DataFetcher } from './data/data-fetcher';
import Decorator from '@navikt/react-decorator';
import Sporsmalene from './pages/sporsmal/sporsmalene';
import Kvittering from './pages/kvittering/kvittering';
import './app.less';

type Miljo = 'LOCAL' | 'DEV' | 'PROD';

const App = (): any => {
    const {hostname} = window.location;
    const miljo = (hostname.indexOf('localhost') > -1 ? 'LOCAL' : 'DEV') as Miljo;

    return (
        <Decorator miljo={miljo}>
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
        </Decorator>
    );
};

export default App;
