/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less')
const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
    [
        [withLess],
        [
            (nextConfig) =>
                process.env.ENABLE_SENTRY
                    ? withSentryConfig(nextConfig, {
                          silent: true,
                      })
                    : nextConfig,
        ],
    ],
    {
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
            sykmeldingerUrl: process.env.SYKMELDINGER_URL,
            dittNavUrl: process.env.DITTNAV_URL,
            env: process.env.ENVIRONMENT,
            amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
            environment: process.env.ENVIRONMENT,
            sykmeldingerBackendRoot: process.env.SYKMELDINGER_BACKEND_ROOT,
            dineSakerUrl: process.env.DINESAKER_URL,
            backendApp: process.env.BACKEND_APP,
            vedlikehold: process.env.VEDLIKEHOLD,
            absoluttTvang: process.env.ABSOLUTT_TVANG,
        },
    }
)
