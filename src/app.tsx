import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import './app.less';
import StoreProvider from './stores/store-provider';
import { DataFetcher } from './components/data-fetcher';

const App = () => {
    return (
        <StoreProvider>
            <DataFetcher>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
