import { test as base } from '@playwright/test'

import { validerAxe } from './uuvalidering'

export const test = base.extend({})

test.afterEach(async ({ page }, testInfo) => {
    await validerAxe(page, testInfo)
})
