import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import env from './utils/environment'

dayjs.locale('nb')

if (env.isMockBackend) {
    require('./data/mock')
}

ReactDOM.render(
    <BrowserRouter basename={env.baseName}>
        <App />
    </BrowserRouter>
    , document.getElementById('root') as HTMLElement
)

if (env.isQ1 || env.isProd) {
    const src = '/frontendlogger/logger.js'
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
}
