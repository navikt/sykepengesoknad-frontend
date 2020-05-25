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

const logger = fetch('/frontendlogger/logger.js', { method: 'GET', headers: { 'Content-Type': 'text/javascript' } })
    .then(response => {
        return response.text();
    });

if (env.isQ1 || env.isProd) {
    ReactDOM.render(<>{logger}</>
        , document.getElementById('logger') as HTMLElement
    );
}
