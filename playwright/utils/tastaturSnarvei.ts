import { Page, Locator, expect } from '@playwright/test'

export async function tabUntilFocusedContainsText(
    browserName: string,
    page: Page,
    expectedText: string | RegExp,
    options?: { maxTabs?: number; checkParent?: boolean },
): Promise<Locator> {
    const maxTabs = options?.maxTabs ?? 10
    const checkParent = options?.checkParent ?? false

    let tabsAttempted = 0
    let focusedElement: Locator = page.locator(':focus')

    while (tabsAttempted < maxTabs) {
        if (browserName == 'webkit') {
            await page.keyboard.press('Alt+Tab')
        } else {
            await page.keyboard.press('Tab')
        }
        tabsAttempted++

        let currentFocused: Locator = page.locator(':focus')

        currentFocused = currentFocused.and(
            page.locator(':not(nextjs-portal):not([aria-label="Open Next.js Dev Tools"])'),
        )

        if ((await currentFocused.count()) === 0) {
            focusedElement = page.locator(':focus')
            continue
        }

        const elementToCheckTextOn = checkParent ? currentFocused.locator('..') : currentFocused

        const textContent = (await elementToCheckTextOn.textContent()) ?? ''

        const isMatch =
            typeof expectedText === 'string' ? textContent.includes(expectedText) : expectedText.test(textContent)

        if (isMatch) {
            await expect(currentFocused).toBeVisible()
            return currentFocused
        }

        focusedElement = currentFocused
    }

    const checkTargetDescription = checkParent ? 'parent' : 'itself'
    throw new Error(
        `Failed to find a focused element whose ${checkTargetDescription} contains text ` +
            `"${expectedText instanceof RegExp ? expectedText.source : expectedText}" ` +
            `after ${maxTabs} tabs. Last focused element (if any): ${
                (await focusedElement.count()) > 0
                    ? await focusedElement.evaluate((el: HTMLElement) => el.outerHTML)
                    : 'No relevant element focused on last check'
            }`,
    )
}
