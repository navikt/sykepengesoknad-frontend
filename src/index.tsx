import React from 'react';
import ReactDOM from 'react-dom';
import env from './utils/environment';
import App from './app';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { BrowserRouter } from 'react-router-dom';

dayjs.locale('nb');

if (env.mockBackend === "true") {
    require('./data/mock');
}

ReactDOM.render(
    <BrowserRouter basename={'/nysykepengesoknad'}>
        <App />
    </BrowserRouter>
    , document.getElementById('root') as HTMLElement
);
