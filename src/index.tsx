import React from 'react';
import ReactDOM from 'react-dom';
import env from './utils/environment';
import App from './app';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';

dayjs.locale('nb');


if (env.mockBackend === "true") {
    require('./data/mock');
}

ReactDOM.render(<App/>, document.getElementById('root') as HTMLElement);
