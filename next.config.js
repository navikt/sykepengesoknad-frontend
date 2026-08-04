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
        const csp = await buildCspHeader(appDirectives, { env: process.env.NEXT_PUBLIC_DECORATOR_ENV })

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
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
    generateEtags: false, //Disabler etag i pages
}

module.exports = nextConfig
