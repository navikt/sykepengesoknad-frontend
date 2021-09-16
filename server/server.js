const express = require('express')
const logger = require('./logger')
const path = require('path')

const getHtmlWithDecorator = require('./dekorator')
const buildPath = path.resolve(__dirname, '../build')
const basePath = '/syk/sykepengesoknad'
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.redirect(basePath)
})

server.get(`${basePath}/env-config-server.js`, (req, res) => {

        res.contentType('application/javascript; charset=UTF-8')
        res.send(`
window._env_ = {
    MOCK_BACKEND: 'true',
    FLEX_GATEWAY_ROOT: 'http://localhost:33333',
    LOGINSERVICE_URL: 'http://localhost:5000',
    LOGINSERVICE_REDIRECT_URL: 'http://localhost:8080',
    AMPLITUDE_KEY: '7a887ba3e5a07c755526c6591810101a',
    AMPLITUDE_ENABLED: 'true',
    REACT_APP_DECORATOR_URL: 'http://localhost:8100/dekoratoren',
    ENVIRONMENT: 'dev',
    SYKEFRAVAER_URL: 'http://localhost:2027',
    DITTNAV_URL: 'https://www.nav.no/person/dittnav',
    OPPLAERING: 'true',
    SYKMELDINGER_BACKEND_PROXY_ROOT: 'http://localhost:6998'
}`)
    }
)


server.use(`${basePath}`, express.static(buildPath, { index: false }))
server.get(`/internal/isAlive|isReady`, (req, res) =>
    res.sendStatus(200)
)

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
    getHtmlWithDecorator(`${buildPath}/index.html`)
        .then((html) => {
            res.send(html)
        })
        .catch((e) => {
            logger.error(e)
            res.status(500).send(e)
        })
)


const port = process.env.PORT || 8080
server.listen(port, () => logger.info(`App listening on port: ${port}`))
