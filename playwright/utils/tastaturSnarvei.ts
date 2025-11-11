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

    throw new Error(
        `Failed to find a focused element whose ${checkParent ? 'parent' : 'itself'} contains text ` +
            `"${expectedText instanceof RegExp ? expectedText.source : expectedText}" ` +
            `after ${maxTabs} tabs. Last focused element (if any): ${
                (await focusedElement.count()) > 0
                    ? await focusedElement.evaluate((el: HTMLElement) => el.outerHTML)
                    : 'No relevant element focused on last check'
            }`,
    )
}

export async function tabUntilFocusedLocator(
    nettleserNavn: string,
    side: Page,
    forventetLocator: Locator,
    options?: { maxTabs?: number },
): Promise<Locator> {
    const maksAntallTab = options?.maxTabs ?? 10

    let antallTabForsok = 0
    let fokusertElement: Locator = side.locator(':focus')

    while (antallTabForsok < maksAntallTab) {
        if (nettleserNavn == 'webkit') {
            await side.keyboard.press('Alt+Tab')
        } else {
            await side.keyboard.press('Tab')
        }
        antallTabForsok++

        let gjeldendeFokusert: Locator = side.locator(':focus')
        gjeldendeFokusert = gjeldendeFokusert.and(
            side.locator(':not(nextjs-portal):not([aria-label="Open Next.js Dev Tools"])'),
        )

        if ((await gjeldendeFokusert.count()) === 0) {
            fokusertElement = side.locator(':focus')
            continue
        }

        // Sjekk om det fokuserte elementet er det samme som, eller et child av, forventetLocator
        const erSammeEllerChild = await gjeldendeFokusert.evaluate(
            (fokusertEl, forventetEl) => {
                if (!forventetEl) return false
                return fokusertEl === forventetEl || forventetEl.contains(fokusertEl)
            },
            await forventetLocator.elementHandle(),
        )
        if (erSammeEllerChild && (await forventetLocator.isVisible())) {
            await expect(forventetLocator).toBeVisible()
            return forventetLocator
        }

        fokusertElement = gjeldendeFokusert
    }

    throw new Error(
        `Fant ikke et fokusert element som matcher forventet locator etter ${maksAntallTab} tabs. Siste fokusert element: ` +
            ((await fokusertElement.count()) > 0
                ? await fokusertElement.evaluate((el: HTMLElement) => el.outerHTML)
                : 'Ingen relevant element fokusert ved siste sjekk'),
    )
}
