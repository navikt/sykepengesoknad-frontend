/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less')
const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')

const csp = {
    'default-src': ["'none'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://www.google-analytics.com',
        'https://nav.psplugin.com',
        'https://ta-survey-v2.herokuapp.com',
        'https://surveystats.hotjar.io',
    ],
    'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https://*.nav.no',
        'https://www.google-analytics.com',
        'https://script.hotjar.com',
    ],
    'font-src': ["'self'", 'data:', 'https://*.psplugin.com', 'https://script.hotjar.com'],
    'frame-src': ["'self'", 'data:', 'https://vars.hotjar.com'],
    'worker-src': ['blob:', '*.nais.io'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://*.nav.no'],
    'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://*.nav.no',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://static.hotjar.com',
        'https://script.hotjar.com',
        'https://in2.taskanalytics.com',
        'https://account.psplugin.com',
    ],
}

const cspString = Object.entries(csp)
    .map((entry) => `${entry[0]} ${entry[1].join(' ')}`)
    .join('; ')

const cspHeader = [
    {
        key: 'Content-Security-Policy',
        value: cspString,
    },
]

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
        async headers() {
            return [
                {
                    source: '/:path*',
                    headers: cspHeader,
                },
                {
                    source: '/api/:path*',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
                        },
                    ],
                },
            ]
        },
        basePath: '/syk/sykepengesoknad',
        lessLoaderOptions: {},
        pageExtensions: ['page.tsx', 'api.ts'],
        assetPrefix: process.env.ASSET_PREFIX || '',
        generateEtags: false, //Disabler etag i pages
        serverRuntimeConfig: {
            // Will only be available on the server side
            decoratorEnv: process.env.DECORATOR_ENV,
            noDecorator: process.env.NO_DECORATOR,
            loginServiceUrl: process.env.LOGINSERVICE_URL,
            loginServiceRedirectUrl: process.env.LOGINSERVICE_REDIRECT_URL,
            loginserviceIdportenDiscoveryUrl: process.env.LOGINSERVICE_IDPORTEN_DISCOVERY_URL,
            loginserviceIdportenAudience: process.env.LOGINSERVICE_IDPORTEN_AUDIENCE,
            tokenXWellKnownUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
            tokenXPrivateJwk: process.env.TOKEN_X_PRIVATE_JWK,
            tokenXClientId: process.env.TOKEN_X_CLIENT_ID,
            idportenClientId: process.env.IDPORTEN_CLIENT_ID,
            idportenWellKnownUrl: process.env.IDPORTEN_WELL_KNOWN_URL,
            sykmeldingerBackendClientId: process.env.SYKMELDINGER_BACKEND_CLIENT_ID,
            sykepengesoknadBackendClientId: process.env.SYKEPENGESOKNAD_BACKEND_CLIENT_ID,
            flexBucketUploaderClientId: process.env.FLEX_BUCKET_UPLOADER_CLIENT_ID,
        },
        publicRuntimeConfig: {
            // Will be available on both server and client
            mockBackend: process.env.MOCK_BACKEND,
            opplaering: process.env.OPPLAERING,
            sykefravaerUrl: process.env.SYKEFRAVAER_URL,
            sykmeldingerUrl: process.env.SYKMELDINGER_URL,
            minSideUrl: process.env.MINSIDE_URL,
            env: process.env.ENVIRONMENT,
            amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
            environment: process.env.ENVIRONMENT,
            vedlikehold: process.env.VEDLIKEHOLD,
        },
    }
)
