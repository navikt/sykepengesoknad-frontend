import { test as base, expect } from '@playwright/test'

import { validerAxe } from './uuvalidering'

// Definer options for UU-validering
type UUOptions = {
    skipUU?: boolean
    disableRules?: string[]
}

// Utvid base test med UU-options
export const test = base.extend<{ uuOptions: UUOptions }>({
    uuOptions: [{ skipUU: false, disableRules: [] }, { option: true }],
})

// Automatisk UU-validering for ALLE tester (med mindre eksplisitt skrudd av)
test.afterEach(async ({ page, uuOptions }, testInfo) => {
    if (!uuOptions.skipUU) {
        await validerAxe(page, testInfo, uuOptions.disableRules)
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
