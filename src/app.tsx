import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import './app.less';

const App = () => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
};

export default App;
