/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less')

module.exports = withLess({
    basePath: '/syk/sykepengesoknad',
    lessLoaderOptions: {},
    assetPrefix: process.env.ASSET_PREFIX || '',
    generateEtags: false, //Disabler etag i pages
    serverRuntimeConfig: {
        // Will only be available on the server side
        decoratorEnv: process.env.DECORATOR_ENV,
        decoratorUrl: process.env.DECORATOR_URL,
        noDecorator: process.env.NO_DECORATOR,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        loginServiceUrl: process.env.LOGINSERVICE_URL,
        loginServiceRedirectUrl: process.env.LOGINSERVICE_REDIRECT_URL,
        flexGatewayRoot: process.env.FLEX_GATEWAY_ROOT,
        mockBackend: process.env.MOCK_BACKEND,
        opplaering: process.env.OPPLAERING,
        sykefravaerUrl: process.env.SYKEFRAVAER_URL,
        dittNavUrl: process.env.DITTNAV_URL,
        amplitudeKey: process.env.AMPLITUDE_KEY,
        amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
        environment: process.env.ENVIRONMENT,
        sykmeldingerBackendProxyRoot:
            process.env.SYKMELDINGER_BACKEND_PROXY_ROOT,
        sendTilNavKnappDelaySeconds:
            process.env.SEND_TIL_NAV_KNAPP_DELAY_SECONDS,
        dineSakerUrl: process.env.DINESAKER_URL,
    },
})
