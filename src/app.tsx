import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Soknad from './sider/soknad/soknaden';
import Soknader from './sider/soknader/soknader';
import StoreProvider from './data/stores/store-provider';
import { DataFetcher } from './data/data-fetcher';
import Decorator from '@navikt/react-decorator';
import './app.less';

type Miljo = 'LOCAL' | 'DEV' | 'PROD';

const App = (): any => {
    const { hostname } = window.location;
    const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "DEV") as Miljo;

    return (
        <Decorator miljo={miljo}>
            <StoreProvider>
                <DataFetcher>
                    <main id="maincontent" role="main" tabIndex={-1}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact={true} path="/" component={Soknader}/>
                                <Route path={'/sykepengesoknad/soknader/:id'} component={Soknad}/>
                                <Route path={'/sykepengesoknad/soknader/:id/:steg'} component={Soknad}/>
                                <Route path="/sykepengesoknad" component={Soknader}/>
                            </Switch>
                        </BrowserRouter>
                    </main>
                </DataFetcher>
            </StoreProvider>
        </Decorator>
    );
};

export default App;
