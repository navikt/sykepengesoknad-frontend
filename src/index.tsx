import React from 'react';
import ReactDOM from 'react-dom';
import env from './utils/environment';
import App from './app';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { BrowserRouter } from 'react-router-dom';

dayjs.locale('nb');

if (env.mockBackend === 'true') {
    require('./data/mock');
}

ReactDOM.render(
    <BrowserRouter basename={env.baseName}>
        <App />
    </BrowserRouter>
    , document.getElementById('root') as HTMLElement
);

if (env.isQ1 || env.isProd) {
    const src = '/frontendlogger/logger.js';
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}
