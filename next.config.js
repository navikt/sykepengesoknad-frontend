/* eslint-disable @typescript-eslint/no-var-requires */
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr')

const appDirectives = {
    'connect-src': ["'self'", 'https://*.uxsignals.com'],
    'font-src': ['https://fonts.gstatic.com'],
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
    lessLoaderOptions: {},
    pageExtensions: ['page.tsx', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX || undefined,
    generateEtags: false, //Disabler etag i pages
    serverRuntimeConfig: {
        // Will only be available on the server side
        decoratorEnv: process.env.DECORATOR_ENV,
        noDecorator: process.env.NO_DECORATOR,
        tokenXWellKnownUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
        tokenXPrivateJwk: process.env.TOKEN_X_PRIVATE_JWK,
        tokenXClientId: process.env.TOKEN_X_CLIENT_ID,
        idportenClientId: process.env.IDPORTEN_CLIENT_ID,
        idportenWellKnownUrl: process.env.IDPORTEN_WELL_KNOWN_URL,
        sykmeldingerBackendClientId: process.env.SYKMELDINGER_BACKEND_CLIENT_ID,
        sykepengesoknadBackendClientId: process.env.SYKEPENGESOKNAD_BACKEND_CLIENT_ID,
        sykepengesoknadKvitteringerClientId: process.env.SYKEPENGESOKNAD_KVITTERINGER_CLIENT_ID,
        sokosKontoregisterPersonClientId: process.env.SOKOS_KONTOREGISTER_PERSON_CLIENT_ID,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        publicPath: '/syk/sykepengesoknad',
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

module.exports = nextConfig
