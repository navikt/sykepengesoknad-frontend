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
    },
})
