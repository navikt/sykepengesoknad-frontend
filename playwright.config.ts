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

    const serverEnv = {
        ...process.env,
        MOCK_BACKEND: 'true',
        ...(medDekorator ? {} : { NO_DECORATOR: 'true' }),
    }

    const serverCommand = process.env.BUILD ? 'next start' : 'next dev'

    return {
        baseURL,
        timeout,
        server: {
            command: `${serverCommand} -p ${port}`,
            timeout: 15 * 1000,
            reuseExistingServer: true,
            env: serverEnv,
            stdout: 'pipe',
            stderr: 'pipe',
        },
    }
}

const opts = createOptions(false, 3000)
const optsMedDekorator = createOptions(true, 3001)
const servers = [opts.server, optsMedDekorator.server].filter(Boolean) as TestConfigWebServer

const alleBrowserConfigs: NamedProject[] = commonBrowserConfigs(opts, optsMedDekorator)

const lokalBrowserConfig = velgBrowserConfigs(
    alleBrowserConfigs,
    (config) => config.name === Nettlesernavn.DESKTOP_CHROME,
)

const ciBrowserConfigs = velgBrowserConfigs(
    alleBrowserConfigs,
    (config) =>
        config.name === Nettlesernavn.DESKTOP_CHROME ||
        config.name === Nettlesernavn.DESKTOP_CHROME_MED_DEKORATOR ||
        config.name === Nettlesernavn.MOBILE_CHROME ||
        config.name === Nettlesernavn.MOBILE_CHROMIUM_MED_DEKORATOR ||
        config.name === Nettlesernavn.MOBILE_WEBKIT ||
        config.name === Nettlesernavn.MOBILE_WEBKIT_MED_DEKORATOR,
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
        timezoneId: 'Europe/Oslo',
        locale: 'nb-NO',
    },
    projects: process.env.CI ? ciBrowserConfigs : process.env.PLAYWRIGHT_ALL ? alleBrowserConfigs : lokalBrowserConfig,
    webServer: servers,
})
