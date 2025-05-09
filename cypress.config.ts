import { defineConfig } from 'cypress'

export default defineConfig({
    chromeWebSecurity: false,
    video: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    numTestsKeptInMemory: 100,
    retries: 0,
    defaultCommandTimeout: 10000,
    e2e: {
        baseUrl: 'http://localhost:3000',
        testIsolation: false,
    },
})
