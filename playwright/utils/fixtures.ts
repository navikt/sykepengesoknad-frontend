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
    await page.addInitScript(() => {
        window.localStorage.setItem('devtools-hint', 'false')
    })
    await context.clearCookies()
    await fjernAnimasjoner(page)
})

test.afterEach(async ({ page, uuOptions, browserName }, testInfo) => {
    if (!uuOptions.skipUU) {
        await validerAxe(browserName, page, testInfo, uuOptions.disableRules, uuOptions.ignoreRules)
    }
})

export { expect }

export const testUtenUU = base.extend<{ uuOptions: UUOptions }>({
    uuOptions: [{ skipUU: true, disableRules: [] }, { option: true }],
})

export const testMedDisabledRules = (rules: string[]) =>
    base.extend<{ uuOptions: UUOptions }>({
        uuOptions: [{ skipUU: false, disableRules: rules }, { option: true }],
    })
