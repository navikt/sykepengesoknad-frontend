import React from 'react';
import ReactDOM from 'react-dom';
import env from './utils/environment';
import App from './app';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
dayjs.locale('nb');

if (env.isDevelopment || env.isRunningOnHeroku) {
    require('./data/mock');
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
