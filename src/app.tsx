import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SoknadSide from './sider/soknad-side';
import SoknaderSide from './sider/soknader-side';
import StoreProvider from './stores/store-provider';
import { DataFetcher } from './components/data-fetcher';
import './app.less';

const App = () => {
    return (
        <StoreProvider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/" component={SoknaderSide}/>
                        <Route path={'/sykepengesoknad/soknader/:id'} component={SoknadSide}/>
                        <Route path={'/sykepengesoknad/soknader/:id/:steg'} component={SoknadSide}/>
                        <Route path="/sykepengesoknad" component={SoknaderSide}/>
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
