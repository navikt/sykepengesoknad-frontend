import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test'

type OptionsType = {
    baseURL: string
    timeout: number
    server: PlaywrightTestConfig['webServer'] | undefined
}

const createOptions = (): OptionsType => {
    const timeout = process.env.CI ? 30 * 1000 : 120 * 2 * 1000

    const baseURL = `http://localhost:3000`
    if (process.env.CI) {
        return {
            baseURL,
            timeout: 30 * 1000,
            server: undefined,
        }
    }

    if (process.env.FAST) {
        return {
            baseURL,
            timeout: 30 * 1000,
            server: {
                command: 'npm run start',
                port: 3000,
                timeout: 120 * 1000,
                reuseExistingServer: false,
                stderr: 'pipe',
                stdout: 'pipe',
            },
        }
    }

    // Local dev server
    return {
        baseURL,
        timeout,
        server: {
            command: 'npm run dev-ingen-dekorator',
            port: 3000,
            timeout: 120 * 1000, // Wait up to 2 minutes for the server to start
            reuseExistingServer: true,
        },
    }
}

const opts = createOptions()

const commonBrowserConfigs = [
    {
        name: 'Desktop Chromium',
        use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    {
        name: 'Mobile Chromium',
        use: { ...devices['Pixel 5'], viewport: { width: 375, height: 667 }, isMobile: true },
    },
    {
        name: 'Desktop Firefox',
        use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
    },
    {
        name: 'Mobile Firefox',
        use: { ...devices['Pixel 5'], viewport: { width: 375, height: 667 }, isMobile: true },
    },
    {
        name: 'Desktop WebKit',
        use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } },
    },
    {
        name: 'Mobile WebKit',
        use: { ...devices['iPhone 12'], viewport: { width: 375, height: 667 }, isMobile: true },
    },
]

export default defineConfig({
    testDir: './playwright',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'blob' : 'html',
    use: {
        baseURL: opts.baseURL,
        navigationTimeout: 60000,
        trace: 'on-first-retry',
    },
    projects: process.env.CI
        ? [
              {
                  name: 'CI Chromium',
                  use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
              },
              {
                  name: 'CI Firefox',
                  use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
              },
          ]
        : commonBrowserConfigs,

    webServer: opts.server,
})
