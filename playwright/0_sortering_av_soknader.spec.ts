import { test, expect } from '@playwright/test'

import { Soknad } from '../src/types/types'
import { rsToSoknad } from '../src/types/mapping'
import { soknaderIntegration } from '../src/data/mock/data/soknad/soknader-integration'

const articleTilSoknad = async (locators: any) => {
    const soknader: Soknad[] = []
    const count = await locators.count()

    for (let i = 0; i < count; i++) {
        const element = locators.nth(i)
        const dataCy = await element.getAttribute('data-cy')
        if (dataCy) {
            const id = dataCy.split('-listevisning-')[1]
            const rsSoknad = soknaderIntegration.find((s) => s.id === id)
            if (rsSoknad) soknader.push(rsToSoknad(rsSoknad))
        }
    }
    return soknader
}

const getFomFraSoknad = (soknad: Soknad): Date => {
    return soknad.fom! || soknad.opprettetDato
}

const senesteSendtDato = (soknad: Soknad) => {
    const arb = soknad.sendtTilArbeidsgiverDato?.getTime() || 0
    const nav = soknad.sendtTilNAVDato?.getTime() || 0
    return arb > nav ? arb : nav
}

test.describe('Tester sortering av søknader', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
    })

    test('Laster startside', async ({ page }) => {
        await expect(page.locator('.navds-heading--large')).toBeVisible()
        await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
    })

    test('Nye søknader sorteres etter tidligste tom dato', async ({ page }) => {
        const articles = page.locator('[data-cy="Nye søknader"] .navds-link-panel')
        const soknader = await articleTilSoknad(articles)

        let forrigeSoknad = soknader[0]
        for (const sok of soknader) {
            expect(getFomFraSoknad(forrigeSoknad).getTime()).toBeLessThanOrEqual(getFomFraSoknad(sok).getTime())
            forrigeSoknad = sok
        }
    })

    test('Sorter etter Status', async ({ page }) => {
        await page.locator('select').selectOption('Status')

        const articles = page.locator('[data-cy="Tidligere søknader"] .navds-link-panel')
        const soknader = await articleTilSoknad(articles)

        let forrigeSoknad = soknader[0]
        for (const sok of soknader) {
            expect(forrigeSoknad.status <= sok.status).toBe(true)
            forrigeSoknad = sok
        }
    })

    test('Sorter etter Dato', async ({ page }) => {
        await page.locator('select').selectOption('Dato')

        const articles = page.locator('[data-cy="Tidligere søknader"] .navds-link-panel')
        const soknader = await articleTilSoknad(articles)

        let forrigeSoknad = soknader[0]
        for (const sok of soknader) {
            expect(getFomFraSoknad(forrigeSoknad).getTime()).toBeGreaterThanOrEqual(getFomFraSoknad(sok).getTime())
            forrigeSoknad = sok
        }

        await expect(page.locator('select')).toHaveValue('Dato')
        await expect(page.locator('[data-cy="Tidligere søknader"] .navds-link-panel').nth(0)).toContainText(
            '27. mai – 11. juni 2020',
        )
        await expect(page.locator('[data-cy="Tidligere søknader"] .navds-link-panel').nth(1)).toContainText(
            '23. mai – 7. juni 2020',
        )
    })

    test('Sorter etter Sendt', async ({ page }) => {
        await page.locator('select').selectOption('Sendt')
        await expect(page.locator('select')).toHaveValue('Sendt')

        await expect(page.locator('[data-cy="Tidligere søknader"] .navds-link-panel').nth(0)).toContainText(
            '27. mai – 11. juni 2020',
        )
        await expect(page.locator('[data-cy="Tidligere søknader"] .navds-link-panel').nth(1)).toContainText(
            '25. – 27. mars 2020',
        )

        const articles = page.locator('[data-cy="Tidligere søknader"] .navds-link-panel')
        const soknader = await articleTilSoknad(articles)

        let forrigeSoknad = soknader[0]
        for (const sok of soknader) {
            expect(senesteSendtDato(forrigeSoknad)).toBeGreaterThanOrEqual(senesteSendtDato(sok))
            forrigeSoknad = sok
        }
    })
})
