import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'

import App from './app'
import { isMockBackend, isProd, isQ1 } from './utils/environment'

smoothscroll.polyfill()

dayjs.locale('nb')

if (isMockBackend()) {
    require('./data/mock')
}

ReactDOM.render(
    <BrowserRouter basename="/syk/sykepengesoknad">
        <App />
    </BrowserRouter>
    , document.getElementById('root') as HTMLElement
)

const frontendloggerSrc = () => {
    if (isQ1() || isProd()) {
        return '/frontendlogger/logger.js'
    }
    return '/syk/sykepengesoknad/dev-frontendlogger.js'
}

const src = frontendloggerSrc()
const script = (document as any).createElement('script')
script.src = src
script.async = true
document.body.appendChild(script)


