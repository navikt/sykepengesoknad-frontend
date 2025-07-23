/* eslint-disable playwright/require-top-level-describe */
import { test as base, expect } from '@playwright/test'

import { IgnoreRule, validerAxe } from './uuvalidering'

// Definer options for UU-validering
type UUOptions = {
    skipUU?: boolean
    disableRules?: string[]
    ignoreRules?: IgnoreRule[]
}

// Utvid base test med UU-options
export const test = base.extend<{ uuOptions: UUOptions }>({
    uuOptions: [{ skipUU: false, disableRules: [] }, { option: true }],
})

test.beforeEach(async ({ context, page }) => {
    // Skjuler hint så den ikke ligger over andre elementer
    await page.addInitScript(() => {
        window.localStorage.setItem('devtools-hint', 'false')
    })
    // Resetter cookies før hver test
    await context.clearCookies()
})

// Automatisk UU-validering for ALLE tester (med mindre eksplisitt skrudd av)
test.afterEach(async ({ page, uuOptions, browserName }, testInfo) => {
    if (!uuOptions.skipUU) {
        await validerAxe(browserName, page, testInfo, uuOptions.disableRules, uuOptions.ignoreRules)
    }
})

// Eksporter også expect for enkelhets skyld
export { expect }

// Convenience functions for spesielle tilfeller
export const testUtenUU = base.extend<{ uuOptions: UUOptions }>({
    uuOptions: [{ skipUU: true, disableRules: [] }, { option: true }],
})

export const testMedDisabledRules = (rules: string[]) =>
    base.extend<{ uuOptions: UUOptions }>({
        uuOptions: [{ skipUU: false, disableRules: rules }, { option: true }],
    })
