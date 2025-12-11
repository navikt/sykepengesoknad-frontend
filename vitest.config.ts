import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        exclude: ['**/node_modules/**', '**/playwright/**'],
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.mts',
    },
})
