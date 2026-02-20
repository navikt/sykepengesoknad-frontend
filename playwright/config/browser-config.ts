import { devices, type Project } from '@playwright/test'

export enum Nettlesernavn {
    DESKTOP_CHROME = 'Desktop Chrome',
    DESKTOP_CHROME_MED_DEKORATOR = 'Desktop Chrome med dekorator',
    MOBILE_CHROME = 'Mobile Chrome',
    MOBILE_CHROMIUM_MED_DEKORATOR = 'Mobile Chromium med dekorator',
    DESKTOP_FIREFOX = 'Desktop Firefox',
    DESKTOP_FIREFOX_MED_DEKORATOR = 'Desktop Firefox med dekorator',
    FIREFOX_RESPONSIVE = 'Firefox (responsive)',
    MOBILE_FIREFOX_MED_DEKORATOR = 'Mobile Firefox med dekorator',
    DESKTOP_WEBKIT = 'Desktop WebKit',
    DESKTOP_WEBKIT_MED_DEKORATOR = 'Desktop WebKit med dekorator',
    MOBILE_WEBKIT = 'Mobile WebKit',
    MOBILE_WEBKIT_MED_DEKORATOR = 'Mobile WebKit med dekorator',
}

export type NamedProject = Project & { name: string }

export function commonBrowserConfigs(opts: { baseURL: string }, optsMedDekorator: { baseURL: string }): NamedProject[] {
    return [
        {
            name: Nettlesernavn.DESKTOP_CHROME,
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.DESKTOP_CHROME_MED_DEKORATOR,
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                baseURL: optsMedDekorator.baseURL,
            },
            testMatch: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.MOBILE_CHROME,
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.MOBILE_CHROMIUM_MED_DEKORATOR,
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: optsMedDekorator.baseURL,
            },
            testMatch: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.DESKTOP_FIREFOX,
            use: {
                ...devices['Desktop Firefox'],
                viewport: { width: 1920, height: 1080 },
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.DESKTOP_FIREFOX_MED_DEKORATOR,
            use: {
                ...devices['Desktop Firefox'],
                viewport: { width: 1920, height: 1080 },
                baseURL: optsMedDekorator.baseURL,
            },
            testMatch: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.FIREFOX_RESPONSIVE,
            use: {
                browserName: 'firefox',
                viewport: { width: 375, height: 667 },
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/40.0 Mobile/15E148 Safari/605.1.15',
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.MOBILE_FIREFOX_MED_DEKORATOR,
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: optsMedDekorator.baseURL,
            },
            testMatch: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.DESKTOP_WEBKIT,
            use: {
                ...devices['Desktop Safari'],
                viewport: { width: 1920, height: 1080 },
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.DESKTOP_WEBKIT_MED_DEKORATOR,
            use: {
                ...devices['Desktop Safari'],
                viewport: { width: 1920, height: 1080 },
                baseURL: optsMedDekorator.baseURL,
            },
            testMatch: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.MOBILE_WEBKIT,
            use: {
                ...devices['iPhone 12'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: Nettlesernavn.MOBILE_WEBKIT_MED_DEKORATOR,
            use: {
                ...devices['iPhone 12'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: optsMedDekorator.baseURL,
            },
            testMatch: '**/brodsmuler.spec.ts',
        },
    ]
}

export function velgBrowserConfigs(
    configs: NamedProject[],
    filterFn: (config: NamedProject) => boolean,
): NamedProject[] {
    return configs.filter(filterFn)
}
