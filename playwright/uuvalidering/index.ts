/* eslint-disable no-console */
import { expect, Page, TestInfo } from '@playwright/test'

import { runAxeAnalysis, addAnnotations, attachHtmlReport } from './axe-runner'
import { filterAxeViolations, formatErrorMessage, DEFAULT_IGNORE_RULES } from './violation-filter'
import { captureViolationScreenshots } from './screenshot-capture'
import { generateHtmlReport } from './report-generator'
import { IgnoreRule, ValidationOptions } from './types'

export async function validerAxe(
    browserName: string,
    page: Page,
    testInfo: TestInfo,
    disableRules: string[] = [],
    ignoreRules: IgnoreRule[] = [],
) {
    const options: ValidationOptions = {
        browserName,
        disableRules,
        ignoreRules,
    }

    const results = await runAxeAnalysis(page, options)
    const violations = filterAxeViolations(results.violations, [...ignoreRules, ...DEFAULT_IGNORE_RULES])

    if (violations.length === 0) return

    await addAnnotations(testInfo, violations)

    const screenshots = await captureViolationScreenshots(page, testInfo, violations)

    const htmlReport = generateHtmlReport(violations, page.url(), screenshots)
    await attachHtmlReport(testInfo, htmlReport)

    const errorMessage = formatErrorMessage(violations)
    console.log(`${violations.length} UU-violation(s) detected - se attachments i Playwright GUI for detaljer`)

    expect(violations.length, `${violations.length} UU-violation(s) funnet:\n\n${errorMessage}`).toBe(0)
}

export * from './types'
