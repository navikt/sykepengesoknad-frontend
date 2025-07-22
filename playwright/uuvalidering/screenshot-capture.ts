import { Page, TestInfo } from '@playwright/test'
import { Result } from 'axe-core'

import { ScreenshotData } from './types'

const MAX_SCREENSHOTS_PER_VIOLATION = 3

export async function captureViolationScreenshots(
    page: Page,
    testInfo: TestInfo,
    violations: Result[],
): Promise<ScreenshotData[]> {
    const screenshots: ScreenshotData[] = []

    for (const violation of violations) {
        const nodesToCapture = violation.nodes.slice(0, MAX_SCREENSHOTS_PER_VIOLATION)

        for (let j = 0; j < nodesToCapture.length; j++) {
            const node = nodesToCapture[j]
            try {
                const selectorString = node.target.join(' ')
                const element = page.locator(selectorString).first()

                if (!(await element.isVisible())) continue
                await page.waitForTimeout(100)

                const elementScreenshot = await element.screenshot({ type: 'png' })
                await element.highlight()
                const fullScreenshot = await page.screenshot({ type: 'png', fullPage: false })

                screenshots.push({
                    violationId: violation.id,
                    nodeIndex: j,
                    highlighted: fullScreenshot,
                    element: elementScreenshot,
                })

                await Promise.all([
                    testInfo.attach(`violation-${violation.id}-highlighted-${j + 1}.png`, {
                        contentType: 'image/png',
                        body: fullScreenshot,
                    }),
                    testInfo.attach(`violation-${violation.id}-element-${j + 1}.png`, {
                        contentType: 'image/png',
                        body: elementScreenshot,
                    }),
                ])
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(`Kunne ikke ta screenshot av element: ${node.target.join(' ')}`)
            }
        }
    }

    return screenshots
}
