import { Page, TestInfo } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

import { ValidationOptions } from './types'

export async function runAxeAnalysis(page: Page, options: ValidationOptions) {
    const axeBuilder = new AxeBuilder({ page }).exclude('.ignore-axe')

    if (options.disableRules && options.disableRules.length > 0) {
        axeBuilder.disableRules(options.disableRules)
    }

    return await axeBuilder.analyze()
}

export async function addAnnotations(testInfo: TestInfo, violations: any[]) {
    violations.forEach((violation) => {
        testInfo.annotations.push({
            type: `🚨 UU-Violation: ${violation.id}`,
            description: `${violation.impact?.toUpperCase()}: ${violation.description}\n📍 ${violation.nodes.length} element(s) affected\n🔗 ${violation.helpUrl}`,
        })
    })
}

export async function attachHtmlReport(testInfo: TestInfo, htmlReport: string) {
    await testInfo.attach('uu-violations-report.html', {
        contentType: 'text/html',
        body: htmlReport,
    })
}
