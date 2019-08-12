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
                <BrowserRouter basename={process.env.REACT_APP_CONTEXT_ROOT}>
                    <Switch>
                        <Route exact={true} path="/" component={SoknaderSide}/>
                        <Route path={'/soknader/:id'} component={SoknadSide}/>
                        <Route path={'/soknader/:id/:steg'} component={SoknadSide}/>
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
