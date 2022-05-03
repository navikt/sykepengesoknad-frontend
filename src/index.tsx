import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'

import App from './app'
import { isMockBackend } from './utils/environment'

smoothscroll.polyfill()

dayjs.locale('nb')

if (isMockBackend()) {
    require('./data/mock')
}

ReactDOM.render(
    <BrowserRouter basename="/syk/sykepengesoknad">
        <App />
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
)
