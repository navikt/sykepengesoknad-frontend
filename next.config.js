/* eslint-disable @typescript-eslint/no-var-requires */
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr')

const appDirectives = {
    'connect-src': ["'self'", 'https://*.uxsignals.com'],
    'font-src': ['https://fonts.gstatic.com'],
    'object-src': ['none'],
    'script-src': ['https://uxsignals-frontend.uxsignals.app.iterate.no', 'navtest.boost.ai'],
    'script-src-elem': ["'self'", 'navtest.boost.ai', 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'style-src-elem': ["'self'"],
    'img-src': ["'self'", 'data:', 'blob:'],
}

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
    async headers() {
        const csp = await buildCspHeader(appDirectives, { env: process.env.ENVIRONMENT })

        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: csp,
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer',
                    },
                ],
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
    pageExtensions: ['page.tsx', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX || undefined,
    generateEtags: false, //Disabler etag i pages
    serverRuntimeConfig: {
        // Will only be available on the server side
        decoratorEnv: process.env.DECORATOR_ENV,
        noDecorator: process.env.NO_DECORATOR,
        sykmeldingerBackendClientId: process.env.SYKMELDINGER_BACKEND_CLIENT_ID,
        flexjarBackendClientId: process.env.FLEXJAR_BACKEND_CLIENT_ID,
        sykepengesoknadBackendClientId: process.env.SYKEPENGESOKNAD_BACKEND_CLIENT_ID,
        sykepengesoknadKvitteringerClientId: process.env.SYKEPENGESOKNAD_KVITTERINGER_CLIENT_ID,
        sokosKontoregisterPersonClientId: process.env.SOKOS_KONTOREGISTER_PERSON_CLIENT_ID,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        basePath: '/syk/sykepengesoknad',
        mockBackend: process.env.MOCK_BACKEND,
        opplaering: process.env.OPPLAERING,
        sykefravaerUrl: process.env.SYKEFRAVAER_URL,
        sykmeldingerUrl: process.env.SYKMELDINGER_URL,
        minSideUrl: process.env.MINSIDE_URL,
        env: process.env.ENVIRONMENT,
        amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
        environment: process.env.ENVIRONMENT,
        vedlikehold: process.env.VEDLIKEHOLD,
        telemetryCollectorURL: process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
        naisAppImage: process.env.NAIS_APP_IMAGE,
        naisAppName: process.env.NAIS_APP_NAME,
        sendInnUrl: process.env.SEND_INN_URL,
    },
}

module.exports = nextConfig
