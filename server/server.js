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
    res.send(`window._env_ = {
    MOCK_BACKEND: '${process.env.MOCK_BACKEND}',
    FLEX_GATEWAY_ROOT: '${process.env.FLEX_GATEWAY_ROOT}',
    LOGINSERVICE_URL: '${process.env.LOGINSERVICE_URL}',
    LOGINSERVICE_REDIRECT_URL: '${process.env.LOGINSERVICE_REDIRECT_URL}',
    AMPLITUDE_KEY: '${process.env.AMPLITUDE_KEY}',
    AMPLITUDE_ENABLED: '${process.env.AMPLITUDE_ENABLED}',
    ENVIRONMENT: '${process.env.ENVIRONMENT}',
    SYKEFRAVAER_URL: '${process.env.SYKEFRAVAER_URL}',
    DITTNAV_URL: '${process.env.DITTNAV_URL}',
    OPPLAERING: '${process.env.OPPLAERING}',
    SYKMELDINGER_BACKEND_PROXY_ROOT: '${process.env.SYKMELDINGER_BACKEND_PROXY_ROOT}'
}`)
})


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
