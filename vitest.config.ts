import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // Peker på en ikke-eksisterende katalog slik at ingen lokal .env-fil
    // (som kan sette TZ=... el.) utilsiktet påvirker tidssone-sensitive tester.
    envDir: '/tmp/vitest-env-dir',
    test: {
        exclude: ['**/node_modules/**', '**/playwright/**'],
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.mts',
        env: {
            NEXT_PUBLIC_RUNTIME_ENV: 'demo',
            NEXT_PUBLIC_MOCK_BACKEND: 'true',
            NEXT_PUBLIC_LOCAL_BACKEND: 'false',
            NEXT_PUBLIC_OPPLAERING: 'false',
            NEXT_PUBLIC_UMAMI_ENABLED: 'false',
            NEXT_PUBLIC_VEDLIKEHOLD: 'false',
            NEXT_PUBLIC_SYKEFRAVAER_URL: 'http://example.com/sykefravaer',
            NEXT_PUBLIC_SYKMELDINGER_URL: 'http://example.com/sykmeldinger',
            NEXT_PUBLIC_MINSIDE_URL: 'http://example.com/minside',
            NEXT_PUBLIC_SEND_INN_URL: 'http://example.com/sendinn',
            NEXT_PUBLIC_APP_NAME: 'sykepengesoknad',
            NEXT_PUBLIC_DECORATOR_ENV: 'dev',
        },
    },
})
