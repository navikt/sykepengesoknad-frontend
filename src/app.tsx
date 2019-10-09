import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SoknadSide from './sider/soknad-side';
import SoknaderSide from './sider/soknader-side';
import StoreProvider from './stores/store-provider';
import { DataFetcher } from './components/data-fetcher';
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
                                <Route exact={true} path="/" component={SoknaderSide}/>
                                <Route path={'/sykepengesoknad/soknader/:id'} component={SoknadSide}/>
                                <Route path={'/sykepengesoknad/soknader/:id/:steg'} component={SoknadSide}/>
                                <Route path="/sykepengesoknad" component={SoknaderSide}/>
                            </Switch>
                        </BrowserRouter>
                    </main>
                </DataFetcher>
            </StoreProvider>
        </Decorator>
    );
};

export default App;
