/* eslint-disable playwright/require-top-level-describe */
import { test as base, expect } from '@playwright/test'

import { IgnoreRule, validerAxe } from '../uuvalidering'

import { fjernAnimasjoner } from './utilities'

type UUOptions = {
    skipUU?: boolean
    disableRules?: string[]
    ignoreRules?: IgnoreRule[]
}

export const test = base.extend<{ uuOptions: UUOptions }>({
    uuOptions: [{ skipUU: false, disableRules: [] }, { option: true }],
})

test.beforeEach(async ({ context, page }) => {
    await context.clearCookies()

    // Skjul dev-tools hint så de ikke er i veien for visuelle tester.
    // Bruker context.addInitScript slik at scriptet kjøres på alle sider i konteksten,
    // ikke bare den første — nødvendig når test.use({ timezoneId }) oppretter ny kontekst.
    await context.addInitScript(() => {
        window.localStorage.setItem('devtools-hint', 'false')
    })
    await fjernAnimasjoner(page)
})

test.afterEach(async ({ page, uuOptions, browserName }, testInfo) => {
    if (!uuOptions.skipUU) {
        await validerAxe(browserName, page, testInfo, uuOptions.disableRules, uuOptions.ignoreRules)
    }
})

export { expect }
