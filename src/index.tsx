import * as React from 'react';
import * as ReactDOM from 'react-dom';
import env from './utils/environment';
import App from './app';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';

import './index.less';

dayjs.locale('nb');

if (env.isDevelopment || env.isRunningOnHeroku) {
    require('./mock');
}
ReactDOM.render(<App />, document.getElementById('app-root') as HTMLElement);
