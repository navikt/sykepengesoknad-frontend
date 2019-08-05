import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SoknadSide from './sider/soknad-side';
import StoreProvider from './stores/store-provider';
import SoknaderSide from './sider/soknader-side';

import './app.less';
import { DataFetcher } from './components/data-fetcher';

const App = () => {
    return (
        <StoreProvider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId`} component={SoknadSide}/>
                        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/:steg`} component={SoknadSide}/>
                        <Route path="*" component={SoknaderSide}/>
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
