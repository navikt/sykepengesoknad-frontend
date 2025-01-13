/* eslint-disable no-console */
import { expect, Page, TestInfo } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

export async function validerAxe(page: Page, testInfo: TestInfo) {
    const results = await new AxeBuilder({ page }).analyze()

    const { violations } = results

    if (violations.length > 0) {
        console.log('==================\n')
        console.log(`${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} detected:`)
        console.log(`\nURL: ${page.url()}`)
        console.log(`Test file: ${testInfo.file.replace('/home/runner/work', '.')}`)
        console.log(`Test title: ${testInfo.title}`)
        console.log(`URL: ${page.url()}`)

        for (const violation of violations) {
            console.log(`\nViolation ID: ${violation.id}`)
            console.log(`Description: ${violation.description}`)
            console.log(`Impact: ${violation.impact}`)
            console.log(`Help: ${violation.help}`)
            console.log(`Help URL: ${violation.helpUrl}`)

            console.log('Affected Nodes:')
            violation.nodes.forEach(({ target }) => {
                console.log(`  - ${target.join(' ')}`)
            })
        }

        expect(violations.length, 'Accessibility violations found').toBe(0)
    }
}
