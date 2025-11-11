import { defineConfig, PlaywrightTestConfig } from '@playwright/test'

import {
    commonBrowserConfigs,
    type NamedProject,
    Nettlesernavn,
    velgBrowserConfigs,
} from './playwright/config/browser-config'

type TestConfigWebServer = PlaywrightTestConfig['webServer']

type OptionsType = {
    baseURL: string
    timeout: number
    server: TestConfigWebServer
}

const createOptions = (medDekorator = false, port = 3000): OptionsType => {
    const timeout = process.env.CI ? 30 * 1000 : 120 * 2 * 1000
    const baseURL = `http://localhost:${port}`

    if (process.env.CI) {
        return { baseURL, timeout: 30 * 1000, server: undefined }
    }

    if (process.env.FAST) {
        return {
            baseURL,
            timeout: 30 * 1000,
            server: {
                command: 'npm run start',
                port,
                timeout: 120 * 1000,
                reuseExistingServer: false,
                stderr: 'pipe',
                stdout: 'pipe',
            },
        }
    }

    const serverEnv = {
        ...process.env,
        MOCK_BACKEND: 'true',
        ...(medDekorator ? {} : { NO_DECORATOR: 'true' }),
    }

    return {
        baseURL,
        timeout,
        server: {
            command: `next dev -p ${port}`,
            port,
            timeout: 120 * 1000,
            reuseExistingServer: false,
            env: serverEnv,
        },
    }
}

const opts = createOptions(false, 3000)
const servers = [opts.server].filter(Boolean) as TestConfigWebServer

const alleBrowserConfigs: NamedProject[] = commonBrowserConfigs(opts)

const ciBrowserConfigs = velgBrowserConfigs(
    alleBrowserConfigs,
    (config) =>
        config.name === Nettlesernavn.DESKTOP_CHROME ||
        config.name === Nettlesernavn.MOBILE_CHROME ||
        config.name === Nettlesernavn.MOBILE_WEBKIT,
)

export default defineConfig({
    testDir: './playwright',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 1,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? 'blob' : 'html',
    use: {
        baseURL: opts.baseURL,
        navigationTimeout: 60000,
        trace: 'on-first-retry',
        bypassCSP: true,
    },
    projects: process.env.CI ? ciBrowserConfigs : alleBrowserConfigs,
    webServer: servers,
})
